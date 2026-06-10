# Verify the static site is live at aielevate.xyz
# Usage: .\scripts\verify-static.ps1 [-SiteUrl https://aielevate.xyz]

param(
    [string]$SiteUrl = 'https://aielevate.xyz'
)

$ErrorActionPreference = 'Stop'

$url = $SiteUrl.TrimEnd('/')
Write-Host "Checking $url"

try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -MaximumRedirection 5
} catch {
    if ($_.Exception.Response) {
        $status = [int]$_.Exception.Response.StatusCode
        Write-Host "FAIL: HTTP $status"
        if ($status -eq 404) {
            Write-Host "Site not found. Check GitHub Actions deploy and DNS A records."
        }
        exit 1
    }
    throw
}

$checks = @(
    @{ Name = 'HTTP 200'; Pass = ($response.StatusCode -eq 200) },
    @{ Name = 'AI Elevate title'; Pass = ($response.Content -match 'AI Elevate') },
    @{ Name = 'Cockpit stylesheet'; Pass = ($response.Content -match 'styles\.css') },
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
    Write-Host 'WARN - Still showing WordPress private page. DNS may not have propagated yet.'
    $failed++
}

if ($failed -gt 0) {
    Write-Host "Verification finished with $failed issue(s)."
    exit 1
}

Write-Host 'Verification passed — cockpit is live.'
