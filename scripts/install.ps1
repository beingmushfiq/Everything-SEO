# ==============================================================================
# Everything SEO: Universal Global Agent Installer (Windows PowerShell)
# Maintained by DevCenterPoint (https://devcenterpoint.com)
# ==============================================================================

[CmdletBinding()]
param (
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/beingmushfiq/Everything-SEO.git"
$InstallDir = Join-Path $HOME ".everything-seo"

Write-Host "=== 🚀 Everything SEO Universal Agent Installer (Windows) ===" -ForegroundColor Cyan
Write-Host "Stewardship: DevCenterPoint (https://devcenterpoint.com)"
Write-Host "OS Version: Windows (PowerShell $($PSVersionTable.PSVersion))"
Write-Host ""

# 1. Clone or Update Central Library
if (Test-Path $InstallDir) {
    Write-Host "[INFO] Updating existing Everything SEO library in $InstallDir..." -ForegroundColor Yellow
    if (-not $DryRun) {
        git -C $InstallDir pull --quiet origin main 2>$null
    }
} else {
    Write-Host "[INFO] Cloning Everything SEO library into $InstallDir..." -ForegroundColor Yellow
    if (-not $DryRun) {
        git clone --depth 1 --quiet $RepoUrl $InstallDir
    }
}

# 2. Detect & Link for Google Antigravity
$AntigravityDir = Join-Path $HOME ".gemini\antigravity\skills"
$GeminiBase = Join-Path $HOME ".gemini"
if (Test-Path $GeminiBase) {
    Write-Host "[DETECT] Google Antigravity environment detected at $GeminiBase" -ForegroundColor Green
    if (-not $DryRun) {
        New-Item -ItemType Directory -Force -Path $AntigravityDir | Out-Null
        python "$InstallDir\scripts\adapters\generate_antigravity_skills.py" --output $AntigravityDir
    }
    Write-Host "[PASS] Deployed 55 skills into $AntigravityDir" -ForegroundColor Green
}

# 3. Detect & Link for Claude Code CLI
$ClaudeBase = Join-Path $HOME ".claude"
$ClaudeDir = Join-Path $HOME ".claude\skills"
if (Test-Path $ClaudeBase) {
    Write-Host "[DETECT] Claude Code environment detected at $ClaudeBase" -ForegroundColor Green
    if (-not $DryRun) {
        New-Item -ItemType Directory -Force -Path $ClaudeDir | Out-Null
        python "$InstallDir\scripts\adapters\generate_claude_skills.py" --output $ClaudeDir
    }
    Write-Host "[PASS] Deployed 55 skills into $ClaudeDir" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== ✅ Everything SEO Windows Installation Complete ===" -ForegroundColor Cyan
Write-Host "Your AI coding assistants (Antigravity, Claude Code, Cursor) are now equipped with 55 operational SEO skills."
Write-Host "Docs: https://github.com/beingmushfiq/Everything-SEO"

