# Verify the cockpit is live after deployment.
# Usage: .\scripts\verify-deployment.ps1 [-SiteUrl https://aielevate.xyz]

param(
    [string]$SiteUrl = 'https://aielevate.xyz'
)

$ErrorActionPreference = 'Stop'

$cockpitUrl = "$($SiteUrl.TrimEnd('/'))/ai-elevate-cockpit/"
Write-Host "Checking $cockpitUrl"

try {
    $response = Invoke-WebRequest -Uri $cockpitUrl -UseBasicParsing -MaximumRedirection 5
} catch {
    if ($_.Exception.Response) {
        $status = [int]$_.Exception.Response.StatusCode
        Write-Host "FAIL: HTTP $status"
        if ($status -eq 404) {
            Write-Host "Plugin route not found. Activate the plugin and go to Settings -> Permalinks -> Save."
        }
        exit 1
    }
    throw
}

$checks = @(
    @{ Name = 'HTTP 200'; Pass = ($response.StatusCode -eq 200) },
    @{ Name = 'AI Elevate title'; Pass = ($response.Content -match 'AI Elevate') },
    @{ Name = 'Cockpit script'; Pass = ($response.Content -match 'script\.js') },
    @{ Name = 'EDMP content'; Pass = ($response.Content -match 'EDMP|Enterprise Decision Memory') }
)

$failed = 0
foreach ($check in $checks) {
    $label = if ($check.Pass) { 'PASS' } else { 'FAIL' }
    Write-Host "$label - $($check.Name)"
    if (-not $check.Pass) { $failed++ }
}

if ($response.Content -match 'Private Site|Log in to WordPress\.com') {
    Write-Host 'WARN - Site appears private. Launch it in WP Admin -> Settings -> General.'
    $failed++
}

if ($failed -gt 0) {
    Write-Host "Verification finished with $failed issue(s)."
    exit 1
}

Write-Host 'Verification passed.'
