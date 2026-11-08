#Requires -Version 7.2
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$projectId = 'garbar-tech'
$account = 'tech.garbar@gmail.com'
$region = 'europe-southwest1'
$pool = 'github-actions'
$provider = 'garbar-web-main'
$deployer = "garbar-web-deployer@$projectId.iam.gserviceaccount.com"
$runtime = "garbar-web-runtime@$projectId.iam.gserviceaccount.com"
$repositoryId = '1450505157'
$ownerId = '112938189'
$workflowRef = 'Mikigb77/GarBar-Tech_web/.github/workflows/deploy.yml@refs/heads/main'

function Invoke-GarbarGcloud {
    param([Parameter(Mandatory)][string[]]$Arguments)
    & gcloud @Arguments "--project=$projectId" "--account=$account" --quiet
    if ($LASTEXITCODE -ne 0) { throw "gcloud failed: $($Arguments[0..1] -join ' ')" }
}

Invoke-GarbarGcloud -Arguments @('services', 'enable', 'iamcredentials.googleapis.com', 'sts.googleapis.com')
$accounts = @(Invoke-GarbarGcloud -Arguments @('iam', 'service-accounts', 'list', '--format=value(email)'))
if ($deployer -notin $accounts) {
    Invoke-GarbarGcloud -Arguments @('iam', 'service-accounts', 'create', 'garbar-web-deployer', '--display-name=GarBar GitHub Actions deployer', '--format=none')
}
$pools = @(Invoke-GarbarGcloud -Arguments @('iam', 'workload-identity-pools', 'list', '--location=global', '--format=value(name)'))
if (-not ($pools -match "/$pool$")) {
    Invoke-GarbarGcloud -Arguments @('iam', 'workload-identity-pools', 'create', $pool, '--location=global', '--display-name=GitHub Actions', '--format=none')
}
$mapping = '^;^google.subject=assertion.sub;attribute.repository_id=assertion.repository_id;attribute.repository_owner_id=assertion.repository_owner_id;attribute.ref=assertion.ref;attribute.workflow_ref=assertion.workflow_ref;attribute.event_name=assertion.event_name'
$condition = "assertion.repository_id == '$repositoryId' && assertion.repository_owner_id == '$ownerId' && assertion.ref == 'refs/heads/main' && assertion.event_name == 'push' && assertion.workflow_ref == '$workflowRef'"
$providers = @(Invoke-GarbarGcloud -Arguments @('iam', 'workload-identity-pools', 'providers', 'list', '--location=global', "--workload-identity-pool=$pool", '--format=value(name)'))
$operation = if ($providers -match "/$provider$") { 'update-oidc' } else { 'create-oidc' }
Invoke-GarbarGcloud -Arguments @('iam', 'workload-identity-pools', 'providers', $operation, $provider, '--location=global', "--workload-identity-pool=$pool", '--issuer-uri=https://token.actions.githubusercontent.com', "--attribute-mapping=$mapping", "--attribute-condition=$condition", '--format=none')
$member = "principalSet://iam.googleapis.com/projects/440941551109/locations/global/workloadIdentityPools/$pool/attribute.repository_id/$repositoryId"
Invoke-GarbarGcloud -Arguments @('iam', 'service-accounts', 'add-iam-policy-binding', $deployer, "--member=$member", '--role=roles/iam.workloadIdentityUser', '--format=none')
Invoke-GarbarGcloud -Arguments @('iam', 'service-accounts', 'add-iam-policy-binding', $runtime, "--member=serviceAccount:$deployer", '--role=roles/iam.serviceAccountUser', '--format=none')
Invoke-GarbarGcloud -Arguments @('artifacts', 'repositories', 'add-iam-policy-binding', 'garbar-web', "--location=$region", "--member=serviceAccount:$deployer", '--role=roles/artifactregistry.writer', '--format=none')
Invoke-GarbarGcloud -Arguments @('run', 'services', 'add-iam-policy-binding', 'garbar-web', "--region=$region", "--member=serviceAccount:$deployer", '--role=roles/run.developer', '--format=none')
Write-Output 'GitHub OIDC ready: this repository, main pushes, and deploy.yml only. No keys or project-wide deployer roles.'
