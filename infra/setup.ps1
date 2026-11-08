#Requires -Version 7.2
<#
.SYNOPSIS
    Sets up everything GitHub Actions needs to deploy the website to Cloud Run. Run it once.

.DESCRIPTION
    Safe to run again at any time: every step checks what exists and only adds what is missing.

    1. Installs the gcloud and gh command-line tools with winget when they are missing.
    2. Signs in to Google Cloud and GitHub in the browser, only when not signed in already.
    3. Google Cloud (project garbar-tech): enables the APIs; creates the image repository with
       a cleanup policy, the build bucket and three service accounts (runtime, builder,
       deployer); makes sure the Cloud Run service exists, is public and scales to zero; and sets
       up Workload Identity Federation so only this repository's deploy workflow, on main, can
       deploy. No service-account key is created.
    4. GitHub: saves the ids from step 3 as repository variables (no secrets are needed), makes
       dev the default branch, and protects dev and main so they only change through PRs with
       green checks.

.EXAMPLE
    pwsh -File infra/setup.ps1
#>
[CmdletBinding()]
param(
    [string]$ProjectId = 'garbar-tech',
    [string]$Account = 'tech.garbar@gmail.com',
    [string]$Region = 'europe-southwest1',
    [string]$Service = 'garbar-web',
    [string]$GitHubRepository = 'Mikigb77/GarBar-Tech_web',
    [switch]$SkipBranchProtection
)
$ErrorActionPreference = 'Stop'

$artifactRepository = 'garbar-web'
$pool = 'github-actions'
$provider = 'garbar-web-main'
$runtime = "garbar-web-runtime@$ProjectId.iam.gserviceaccount.com"
$builder = "garbar-web-builder@$ProjectId.iam.gserviceaccount.com"
$deployer = "garbar-web-deployer@$ProjectId.iam.gserviceaccount.com"
$requiredChecks = @('Website checks', 'Container image')

function Write-Step([string]$Message) { Write-Host "`n==> $Message" -ForegroundColor Cyan }
function Write-Done([string]$Message) { Write-Host "    $Message" -ForegroundColor DarkGray }

# Runs gcloud for this project and account without changing the active gcloud configuration.
function Invoke-Gcloud {
    param([Parameter(Mandatory)][string[]]$Arguments)
    $output = & gcloud @Arguments "--project=$ProjectId" "--account=$Account" --quiet
    if ($LASTEXITCODE -ne 0) { throw "gcloud $($Arguments[0..2] -join ' ') failed (see above)." }
    $output
}

# True when a gcloud read succeeds, for checking whether something exists.
function Test-Gcloud {
    param([Parameter(Mandatory)][string[]]$Arguments)
    & gcloud @Arguments "--project=$ProjectId" "--account=$Account" --quiet --verbosity=none *> $null
    $LASTEXITCODE -eq 0
}

function Invoke-Gh {
    param([Parameter(Mandatory)][string[]]$Arguments)
    $output = & gh @Arguments
    if ($LASTEXITCODE -ne 0) { throw "gh $($Arguments[0..1] -join ' ') failed (see above)." }
    $output
}

function Install-Tool([string]$Command, [string]$WingetId, [string]$Url) {
    if (Get-Command $Command -ErrorAction SilentlyContinue) { return }
    if ($IsWindows -and (Get-Command winget -ErrorAction SilentlyContinue)) {
        Write-Done "Installing $Command with winget..."
        & winget install --id $WingetId --exact --silent --accept-package-agreements --accept-source-agreements
        $env:Path = @(
            [Environment]::GetEnvironmentVariable('Path', 'Machine'),
            [Environment]::GetEnvironmentVariable('Path', 'User'),
            "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin"
        ) -join ';'
    }
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
        throw "Install $Command from $Url, open a new terminal and run this script again."
    }
}

# ---------------------------------------------------------------------------------------------
Write-Step 'Tools'
Install-Tool 'gcloud' 'Google.CloudSDK' 'https://cloud.google.com/sdk/docs/install'
Install-Tool 'gh' 'GitHub.cli' 'https://cli.github.com'
Write-Done 'gcloud and gh are installed.'

Write-Step "Google Cloud sign-in ($Account)"
& gcloud auth print-access-token "--account=$Account" --quiet --verbosity=none *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Done 'Opening the browser to sign in...'
    & gcloud auth login $Account --brief
    if ($LASTEXITCODE -ne 0) { throw 'Google Cloud sign-in did not finish.' }
}
$projectNumber = (Invoke-Gcloud @('projects', 'describe', $ProjectId, '--format=value(projectNumber)') | Out-String).Trim()
if ($projectNumber -notmatch '^\d+$') { throw "$Account cannot read the project $ProjectId." }
Write-Done "Signed in. Project $ProjectId is number $projectNumber."

Write-Step 'GitHub sign-in'
& gh auth status --hostname github.com *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Done 'Opening the browser to sign in (the one-time code is copied to the clipboard)...'
    & gh auth login --hostname github.com --web --clipboard --git-protocol https --scopes 'repo,workflow'
    if ($LASTEXITCODE -ne 0) {
        & gh auth login --hostname github.com --web --git-protocol https --scopes 'repo,workflow'
    }
    if ($LASTEXITCODE -ne 0) { throw 'GitHub sign-in did not finish.' }
}
$repo = Invoke-Gh @('api', "repos/$GitHubRepository") | ConvertFrom-Json
if (-not $repo.permissions.admin) { throw "The signed-in GitHub user is not an admin of $GitHubRepository." }
$fullName = $repo.full_name
Write-Done "Signed in. $fullName is repository $($repo.id), owner $($repo.owner.id)."

# ---------------------------------------------------------------------------------------------
Write-Step 'Google Cloud APIs'
Invoke-Gcloud @('services', 'enable', 'run.googleapis.com', 'artifactregistry.googleapis.com',
    'cloudbuild.googleapis.com', 'iam.googleapis.com', 'iamcredentials.googleapis.com',
    'sts.googleapis.com', 'cloudresourcemanager.googleapis.com') | Out-Null
Write-Done 'Enabled.'

Write-Step 'Service accounts'
foreach ($entry in @(
        @{ Email = $runtime; Name = 'GarBar website (Cloud Run runtime)' },
        @{ Email = $builder; Name = 'GarBar website (manual Cloud Build)' },
        @{ Email = $deployer; Name = 'GarBar website (GitHub Actions deployer)' })) {
    if (Test-Gcloud @('iam', 'service-accounts', 'describe', $entry.Email)) {
        Write-Done "$($entry.Email) exists."
    } else {
        Invoke-Gcloud @('iam', 'service-accounts', 'create', $entry.Email.Split('@')[0], "--display-name=$($entry.Name)", '--format=none') | Out-Null
        Write-Done "Created $($entry.Email)."
    }
}

Write-Step 'Image repository'
if (-not (Test-Gcloud @('artifacts', 'repositories', 'describe', $artifactRepository, "--location=$Region"))) {
    Invoke-Gcloud @('artifacts', 'repositories', 'create', $artifactRepository, '--repository-format=docker', "--location=$Region", '--format=none') | Out-Null
    Write-Done "Created $artifactRepository."
}
# Keep the 10 newest images and anything under 30 days old, so storage stays small.
$policyFile = Join-Path ([IO.Path]::GetTempPath()) "garbar-cleanup-$([Guid]::NewGuid()).json"
try {
    @(
        @{ name = 'keep-newest'; action = @{ type = 'Keep' }; mostRecentVersions = @{ keepCount = 10 } },
        @{ name = 'delete-old'; action = @{ type = 'Delete' }; condition = @{ tagState = 'any'; olderThan = '30d' } }
    ) | ConvertTo-Json -Depth 5 -AsArray | Set-Content -LiteralPath $policyFile -Encoding utf8NoBOM
    Invoke-Gcloud @('artifacts', 'repositories', 'set-cleanup-policies', $artifactRepository, "--location=$Region", "--policy=$policyFile", '--no-dry-run', '--format=none') | Out-Null
} finally {
    Remove-Item -LiteralPath $policyFile -ErrorAction SilentlyContinue
}
Invoke-Gcloud @('artifacts', 'repositories', 'add-iam-policy-binding', $artifactRepository, "--location=$Region", "--member=serviceAccount:$builder", '--role=roles/artifactregistry.writer', '--format=none') | Out-Null
Invoke-Gcloud @('artifacts', 'repositories', 'add-iam-policy-binding', $artifactRepository, "--location=$Region", "--member=serviceAccount:$deployer", '--role=roles/artifactregistry.writer', '--format=none') | Out-Null
Write-Done "$Region-docker.pkg.dev/$ProjectId/$artifactRepository keeps the newest 10 images; the deployer and builder can push."

Write-Step 'Build bucket for manual deploys (infra/deploy-cloud.ps1)'
$sourceBucket = "gs://garbar-web-builds-$projectNumber"
if (-not (Test-Gcloud @('storage', 'buckets', 'describe', $sourceBucket))) {
    Invoke-Gcloud @('storage', 'buckets', 'create', $sourceBucket, "--location=$Region", '--uniform-bucket-level-access', '--public-access-prevention') | Out-Null
}
Invoke-Gcloud @('storage', 'buckets', 'add-iam-policy-binding', $sourceBucket, "--member=serviceAccount:$builder", '--role=roles/storage.objectViewer', '--format=none') | Out-Null
Invoke-Gcloud @('projects', 'add-iam-policy-binding', $ProjectId, "--member=serviceAccount:$builder", '--role=roles/logging.logWriter', '--condition=None', '--format=none') | Out-Null
Write-Done "$sourceBucket is ready."

Write-Step "Cloud Run service $Service"
if (Test-Gcloud @('run', 'services', 'describe', $Service, "--region=$Region")) {
    Write-Done 'Exists. The next deploy from main replaces its image.'
} else {
    # A placeholder so the deployer can be given access to this one service. The first deploy
    # from GitHub Actions replaces it with the website.
    Invoke-Gcloud @('run', 'deploy', $Service, '--image=us-docker.pkg.dev/cloudrun/container/hello',
        "--region=$Region", "--service-account=$runtime", '--port=8080', '--cpu=1', '--memory=256Mi',
        '--cpu-throttling', '--scaling=auto', '--min=0', '--max=3', '--allow-unauthenticated',
        '--format=none') | Out-Null
    Write-Done 'Created with a placeholder page. If Cloudflare still points at an older service URL, update edge/worker.js.'
}
Invoke-Gcloud @('run', 'services', 'update', $Service, "--region=$Region", '--scaling=auto', '--min=0', '--max=3', '--format=none') | Out-Null
Invoke-Gcloud @('run', 'services', 'add-iam-policy-binding', $Service, "--region=$Region", '--member=allUsers', '--role=roles/run.invoker', '--format=none') | Out-Null
Invoke-Gcloud @('run', 'services', 'add-iam-policy-binding', $Service, "--region=$Region", "--member=serviceAccount:$deployer", '--role=roles/run.developer', '--format=none') | Out-Null
Invoke-Gcloud @('iam', 'service-accounts', 'add-iam-policy-binding', $runtime, "--member=serviceAccount:$deployer", '--role=roles/iam.serviceAccountUser', '--format=none') | Out-Null
$origin = (Invoke-Gcloud @('run', 'services', 'describe', $Service, "--region=$Region", '--format=value(status.url)') | Out-String).Trim()
Write-Done "Public, scales to zero (0 to 3 instances): $origin"

Write-Step 'Workload Identity Federation (GitHub Actions sign-in without keys)'
$poolState = (& gcloud iam workload-identity-pools describe $pool --location=global '--format=value(state)' "--project=$ProjectId" "--account=$Account" --quiet --verbosity=none 2>$null | Out-String).Trim()
if ($poolState -eq 'DELETED') {
    Invoke-Gcloud @('iam', 'workload-identity-pools', 'undelete', $pool, '--location=global', '--format=none') | Out-Null
} elseif (-not $poolState) {
    Invoke-Gcloud @('iam', 'workload-identity-pools', 'create', $pool, '--location=global', '--display-name=GitHub Actions', '--format=none') | Out-Null
}
# Commas, not gcloud's ^;^ delimiter: on Windows gcloud is a .cmd file, and cmd.exe eats carets.
$mapping = @(
    'google.subject=assertion.sub',
    'attribute.repository_id=assertion.repository_id',
    'attribute.repository_owner_id=assertion.repository_owner_id',
    'attribute.ref=assertion.ref',
    'attribute.workflow_ref=assertion.workflow_ref',
    'attribute.event_name=assertion.event_name'
) -join ','
$workflowRef = "$fullName/.github/workflows/deploy.yml@refs/heads/main"
$condition = "assertion.repository_id == '$($repo.id)' && assertion.repository_owner_id == '$($repo.owner.id)' && assertion.ref == 'refs/heads/main' && assertion.event_name == 'push' && assertion.workflow_ref == '$workflowRef'"
$providerState = (& gcloud iam workload-identity-pools providers describe $provider --location=global "--workload-identity-pool=$pool" '--format=value(state)' "--project=$ProjectId" "--account=$Account" --quiet --verbosity=none 2>$null | Out-String).Trim()
if ($providerState -eq 'DELETED') {
    Invoke-Gcloud @('iam', 'workload-identity-pools', 'providers', 'undelete', $provider, '--location=global', "--workload-identity-pool=$pool", '--format=none') | Out-Null
}
$operation = if ($providerState) { 'update-oidc' } else { 'create-oidc' }
Invoke-Gcloud @('iam', 'workload-identity-pools', 'providers', $operation, $provider, '--location=global',
    "--workload-identity-pool=$pool", '--issuer-uri=https://token.actions.githubusercontent.com',
    "--attribute-mapping=$mapping", "--attribute-condition=$condition", '--format=none') | Out-Null
$poolName = "projects/$projectNumber/locations/global/workloadIdentityPools/$pool"
Invoke-Gcloud @('iam', 'service-accounts', 'add-iam-policy-binding', $deployer,
    "--member=principalSet://iam.googleapis.com/$poolName/attribute.repository_id/$($repo.id)",
    '--role=roles/iam.workloadIdentityUser', '--format=none') | Out-Null
$providerName = "$poolName/providers/$provider"
Write-Done "Only $workflowRef (push) can act as $deployer."

# ---------------------------------------------------------------------------------------------
Write-Step "GitHub repository variables ($fullName)"
$variables = [ordered]@{
    GCP_PROJECT_ID                 = $ProjectId
    GCP_REGION                     = $Region
    GCP_WORKLOAD_IDENTITY_PROVIDER = $providerName
    GCP_DEPLOY_SERVICE_ACCOUNT     = $deployer
    GCP_RUNTIME_SERVICE_ACCOUNT    = $runtime
    GCP_ARTIFACT_REPOSITORY        = "$Region-docker.pkg.dev/$ProjectId/$artifactRepository"
    CLOUD_RUN_SERVICE              = $Service
}
foreach ($name in $variables.Keys) {
    Invoke-Gh @('variable', 'set', $name, '--repo', $fullName, '--body', $variables[$name]) | Out-Null
    Write-Done "$name = $($variables[$name])"
}

Write-Step 'GitHub repository settings'
& gh api "repos/$fullName/branches/dev" --silent *> $null
if ($LASTEXITCODE -eq 0) {
    Invoke-Gh @('repo', 'edit', $fullName, '--default-branch', 'dev') | Out-Null
    Write-Done 'dev is the default branch.'
}
Invoke-Gh @('repo', 'edit', $fullName, '--enable-squash-merge', '--enable-merge-commit', '--delete-branch-on-merge') | Out-Null
Write-Done 'Squash and merge commits allowed; merged feature branches are deleted.'

if ($SkipBranchProtection) {
    Write-Done 'Branch protection skipped (-SkipBranchProtection).'
} else {
    foreach ($branch in @('dev', 'main')) {
        $payload = @{
            # dev PRs must be up to date with dev; the release PR into main is checked again after merging.
            required_status_checks           = @{ strict = ($branch -eq 'dev'); contexts = $requiredChecks }
            enforce_admins                   = $true
            required_pull_request_reviews    = @{ dismiss_stale_reviews = $true; require_code_owner_reviews = $false; required_approving_review_count = 0 }
            restrictions                     = $null
            required_conversation_resolution = $true
            allow_force_pushes               = $false
            allow_deletions                  = $false
        }
        $payloadFile = Join-Path ([IO.Path]::GetTempPath()) "garbar-protection-$([Guid]::NewGuid()).json"
        try {
            $payload | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $payloadFile -Encoding utf8NoBOM
            Invoke-Gh @('api', '--method', 'PUT', "repos/$fullName/branches/$branch/protection", '--input', $payloadFile, '--silent') | Out-Null
        } finally {
            Remove-Item -LiteralPath $payloadFile -ErrorAction SilentlyContinue
        }
        Write-Done "$branch only changes through PRs with green '$($requiredChecks -join "' and '")'."
    }
}

# ---------------------------------------------------------------------------------------------
Write-Host "`nAll set. Nothing else to configure." -ForegroundColor Green
Write-Host 'Merging a dev -> main PR now builds the container and deploys it to Cloud Run.'
Write-Host "Service: $origin (public site: https://garbar.tech)"
