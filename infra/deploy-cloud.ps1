#Requires -Version 7.2
[CmdletBinding()]
param([switch]$Bootstrap)
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$projectId = 'garbar-tech'
$account = 'tech.garbar@gmail.com'
$region = 'europe-southwest1'
$service = 'garbar-web'
$builder = "garbar-web-builder@$projectId.iam.gserviceaccount.com"
$runtime = "garbar-web-runtime@$projectId.iam.gserviceaccount.com"

function Invoke-WebGcloud {
    param([Parameter(Mandatory)][string[]]$Arguments)
    & gcloud @Arguments "--project=$projectId" "--account=$account" --quiet
    if ($LASTEXITCODE -ne 0) { throw "gcloud failed: $($Arguments[0..1] -join ' ')" }
}

Push-Location -LiteralPath $repo
try {
    if ($Bootstrap) { & (Join-Path $PSScriptRoot 'setup.ps1') }
    if (git status --porcelain) { throw 'Commit the intended website source before deploying.' }
    $revision = (git rev-parse HEAD).Trim()
    $image = "$region-docker.pkg.dev/$projectId/garbar-web/web:$revision"
    Invoke-WebGcloud -Arguments @('builds', 'submit', '.', '--config=cloudbuild.yaml', "--region=$region", "--substitutions=_IMAGE=$image", "--service-account=projects/$projectId/serviceAccounts/$builder", '--gcs-source-staging-dir=gs://garbar-web-builds-440941551109/source')
    $imageDescription = Invoke-WebGcloud -Arguments @('artifacts', 'docker', 'images', 'describe', $image, '--format=value(image_summary.fully_qualified_digest)')
    $imageDigest = ($imageDescription | Out-String).Trim()
    if ($imageDigest -notmatch '@sha256:[a-f0-9]{64}$') { throw 'The image digest could not be verified.' }
    Invoke-WebGcloud -Arguments @('run', 'deploy', $service, "--image=$imageDigest", "--region=$region", "--service-account=$runtime", '--port=8080', '--cpu=1', '--memory=256Mi', '--concurrency=80', '--timeout=30s', '--cpu-throttling', '--scaling=auto', '--min=0', '--max=3', '--allow-unauthenticated', '--ingress=all', "--labels=app=garbar-web,source-commit=$revision")
    $origin = Invoke-WebGcloud -Arguments @('run', 'services', 'describe', $service, "--region=$region", '--format=value(status.url)')
    $response = Invoke-WebRequest -Uri "$($origin.Trim())/en/" -TimeoutSec 60
    if ($response.StatusCode -ne 200 -or $response.Content -notmatch 'GarBar') { throw 'Cloud Run smoke check failed.' }
    Write-Output "Cloud Run origin: $($origin.Trim())"
    Write-Output 'Automatic scaling: minimum 0, maximum 3 instances.'
} finally {
    Pop-Location
}
