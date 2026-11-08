#Requires -Version 7.2
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$projectId = 'garbar-tech'
$account = 'tech.garbar@gmail.com'
$region = 'europe-southwest1'
$repository = 'garbar-web'
$sourceBucket = 'garbar-web-builds-440941551109'
$builder = "garbar-web-builder@$projectId.iam.gserviceaccount.com"

function Invoke-WebGcloud {
    param([Parameter(Mandatory)][string[]]$Arguments)
    & gcloud @Arguments "--project=$projectId" "--account=$account" --quiet
    if ($LASTEXITCODE -ne 0) { throw "gcloud failed: $($Arguments[0..1] -join ' ')" }
}

Invoke-WebGcloud -Arguments @('services', 'enable', 'run.googleapis.com', 'artifactregistry.googleapis.com', 'cloudbuild.googleapis.com', 'iam.googleapis.com')
$accounts = @(Invoke-WebGcloud -Arguments @('iam', 'service-accounts', 'list', '--format=value(email)'))
foreach ($name in @('garbar-web-runtime', 'garbar-web-builder')) {
    if ("$name@$projectId.iam.gserviceaccount.com" -notin $accounts) {
        Invoke-WebGcloud -Arguments @('iam', 'service-accounts', 'create', $name, "--display-name=$name", '--format=none')
    }
}
$repositories = @(Invoke-WebGcloud -Arguments @('artifacts', 'repositories', 'list', "--location=$region", '--format=value(name)'))
if (-not ($repositories -match "/$repository$")) {
    Invoke-WebGcloud -Arguments @('artifacts', 'repositories', 'create', $repository, '--repository-format=docker', "--location=$region", '--format=none')
}
$buckets = @(Invoke-WebGcloud -Arguments @('storage', 'buckets', 'list', '--format=value(name)'))
if (-not ($buckets -match "(^|/)$sourceBucket/?$")) {
    Invoke-WebGcloud -Arguments @('storage', 'buckets', 'create', "gs://$sourceBucket", "--location=$region", '--uniform-bucket-level-access', '--public-access-prevention')
}
Invoke-WebGcloud -Arguments @('artifacts', 'repositories', 'add-iam-policy-binding', $repository, "--location=$region", "--member=serviceAccount:$builder", '--role=roles/artifactregistry.writer', '--format=none')
Invoke-WebGcloud -Arguments @('storage', 'buckets', 'add-iam-policy-binding', "gs://$sourceBucket", "--member=serviceAccount:$builder", '--role=roles/storage.objectViewer', '--format=none')
Invoke-WebGcloud -Arguments @('projects', 'add-iam-policy-binding', $projectId, "--member=serviceAccount:$builder", '--role=roles/logging.logWriter', '--format=none')
Write-Output 'Cloud infrastructure ready. The runtime account has no project roles.'
