# Deploy plugin to WordPress.com via SFTP.
# Usage: .\scripts\deploy-sftp.ps1
# Requires deploy.env (copy from deploy.env.example).
# Installs Posh-SSH module on first run if needed.

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $repoRoot 'deploy.env'

if (-not (Test-Path $envFile)) {
    throw "Missing deploy.env. Copy deploy.env.example to deploy.env and add your SFTP credentials."
}

Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
    $name, $value = $_ -split '=', 2
    Set-Item -Path "Env:$name" -Value $value.Trim()
}

$required = @('WP_SFTP_HOST', 'WP_SFTP_PORT', 'WP_SFTP_USER', 'WP_SFTP_PASSWORD', 'WP_REMOTE_PLUGIN_PATH', 'WP_PLUGIN_SOURCE')
foreach ($key in $required) {
    if (-not (Get-Item -Path "Env:$key" -ErrorAction SilentlyContinue)) {
        throw "Missing $key in deploy.env"
    }
}

$sourceDir = Join-Path $repoRoot $Env:WP_PLUGIN_SOURCE
if (-not (Test-Path $sourceDir)) {
    throw "Plugin source not found: $sourceDir"
}

if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
    Write-Host 'Installing Posh-SSH module (one-time)...'
    Install-Module -Name Posh-SSH -Scope CurrentUser -Force -AllowClobber
}

Import-Module Posh-SSH

$stagingDir = Join-Path $repoRoot 'dist\sftp-staging\ai-elevate-cockpit-standalone'
if (Test-Path $stagingDir) {
    Remove-Item -Recurse -Force $stagingDir
}
New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null

$excludePatterns = @('*.bak', '.idea', '.DS_Store', 'Thumbs.db')
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

$securePassword = ConvertTo-SecureString $Env:WP_SFTP_PASSWORD -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($Env:WP_SFTP_USER, $securePassword)
$remotePath = $Env:WP_REMOTE_PLUGIN_PATH.TrimEnd('/')

Write-Host "Connecting to $($Env:WP_SFTP_HOST):$($Env:WP_SFTP_PORT)"
$session = New-SFTPSession -ComputerName $Env:WP_SFTP_HOST -Port ([int]$Env:WP_SFTP_PORT) -Credential $credential -AcceptKey

try {
    $null = Invoke-SSHCommand -SessionId $session.SessionId -Command "mkdir -p `"$remotePath`"" -TimeOut 60

  Write-Host "Uploading plugin to $remotePath"
    Set-SFTPItem -SessionId $session.SessionId -Path $stagingDir -Destination $remotePath -Force
} finally {
    Remove-SFTPSession -SessionId $session.SessionId | Out-Null
}

Write-Host 'SFTP deploy complete.'
if ($Env:WP_SITE_URL) {
    Write-Host "Next: activate plugin in WP Admin, flush permalinks, open $($Env:WP_SITE_URL)/ai-elevate-cockpit/"
}
