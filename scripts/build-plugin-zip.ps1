# Builds ai-elevate-cockpit-wordpress-plugin-v4-standalone.zip for manual upload.
# Usage: .\scripts\build-plugin-zip.ps1

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $repoRoot 'ai-elevate-cockpit-plugin-v4-standalone'
$distDir = Join-Path $repoRoot 'dist'
$stagingDir = Join-Path $distDir 'ai-elevate-cockpit-standalone'
$zipPath = Join-Path $distDir 'ai-elevate-cockpit-wordpress-plugin-v4-standalone.zip'

if (-not (Test-Path $sourceDir)) {
    throw "Plugin source not found: $sourceDir"
}

$excludePatterns = @('*.bak', '.idea', '.DS_Store', 'Thumbs.db')

if (Test-Path $stagingDir) {
    Remove-Item -Recurse -Force $stagingDir
}
New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null

Get-ChildItem -Path $sourceDir -Force | ForEach-Object {
    $skip = $false
    foreach ($pattern in $excludePatterns) {
        if ($_.Name -like $pattern) {
            $skip = $true
            break
        }
    }
    if (-not $skip) {
        Copy-Item -Path $_.FullName -Destination $stagingDir -Recurse -Force
    }
}

if (Test-Path $zipPath) {
    Remove-Item -Force $zipPath
}

Compress-Archive -Path (Join-Path $stagingDir '*') -DestinationPath $zipPath -CompressionLevel Optimal

Write-Host "Built: $zipPath"
Write-Host "Upload via WordPress Admin -> Plugins -> Add New -> Upload Plugin"
