#Requires -Version 7.2
# GitHub Pro (or equivalent private-repository branch protection) is required.
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$repository = 'Mikigb77/GarBar-Tech_web'
foreach ($branch in @('dev', 'main')) {
    $payload = @{
        required_status_checks = @{ strict = ($branch -eq 'dev'); contexts = @('Website checks') }
        enforce_admins = $true
        required_pull_request_reviews = @{
            dismiss_stale_reviews = $true
            require_code_owner_reviews = $false
            required_approving_review_count = 0
        }
        restrictions = $null
        required_conversation_resolution = $true
        allow_force_pushes = $false
        allow_deletions = $false
    }
    $temporaryPayload = Join-Path ([IO.Path]::GetTempPath()) "garbar-protection-$([Guid]::NewGuid()).json"
    try {
        $payload | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $temporaryPayload -Encoding utf8NoBOM
        & gh api --method PUT "repos/$repository/branches/$branch/protection" --input $temporaryPayload --silent
        if ($LASTEXITCODE -ne 0) { throw "GitHub could not protect $branch. Check the repository plan and admin access." }
    } finally {
        if (Test-Path -LiteralPath $temporaryPayload) { Remove-Item -LiteralPath $temporaryPayload }
    }
}
