# One-command deploy helper.
# Usage:
#   .\scripts\deploy.ps1 -Method push      # commit + push to GitHub (triggers Pages deploy)
#   .\scripts\deploy.ps1 -Method verify      # check live static site
#   .\scripts\deploy.ps1 -Method zip         # build zip for manual WP upload (needs Business)
#   .\scripts\deploy.ps1 -Method sftp        # push via SFTP (needs Business + deploy.env)

param(
    [ValidateSet('push', 'verify', 'zip', 'sftp', 'verify-wp')]
    [string]$Method = 'push',
    [string]$Message = 'Update AI Elevate site'
)

$ErrorActionPreference = 'Stop'
$scriptDir = $PSScriptRoot

$repoRoot = Split-Path -Parent $scriptDir

switch ($Method) {
    'push' {
        Push-Location $repoRoot
        try {
            git add -A
            $status = git status --porcelain
            if (-not $status) {
                Write-Host 'No changes to deploy.'
                return
            }
            git commit -m $Message
            git push
            Write-Host 'Pushed. GitHub Actions will deploy to https://aielevate.xyz'
        } finally {
            Pop-Location
        }
    }
    'verify' {
        & (Join-Path $scriptDir 'verify-static.ps1')
    }
    'zip' {
        & (Join-Path $scriptDir 'build-plugin-zip.ps1')
    }
    'sftp' {
        & (Join-Path $scriptDir 'deploy-sftp.ps1')
        & (Join-Path $scriptDir 'verify-deployment.ps1')
    }
    'verify-wp' {
        & (Join-Path $scriptDir 'verify-deployment.ps1')
    }
}
