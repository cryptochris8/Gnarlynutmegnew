# PowerShell script to fix Node.js compatibility issues
# Run this script to automatically install and switch to Node.js 20.x

Write-Host "🔧 Hytopia Soccer - Node.js Compatibility Fix" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Yellow
Write-Host ""

# Check current Node.js version
Write-Host "📋 Checking current Node.js version..." -ForegroundColor Green
$currentVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Current Node.js: $currentVersion" -ForegroundColor White

    $majorVersion = [int]($currentVersion -replace '^v', '' -split '\.')[0]

    if ($majorVersion -ge 24) {
        Write-Host "❌ Node.js v$majorVersion.x is incompatible with Hytopia" -ForegroundColor Red
        Write-Host "💡 Need to downgrade to Node.js 20.x LTS" -ForegroundColor Yellow
        Write-Host ""
    } elseif ($majorVersion -ge 22) {
        Write-Host "⚠️ Node.js v$majorVersion.x may have some issues" -ForegroundColor Yellow
        Write-Host "💡 Node.js 20.x LTS is recommended" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "✅ Node.js v$majorVersion.x should work fine" -ForegroundColor Green
        Write-Host ""
        exit 0
    }
} else {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
}

# Check if nvm is available
Write-Host "🔍 Checking for Node Version Manager (nvm)..." -ForegroundColor Green
$nvmAvailable = Get-Command nvm -ErrorAction SilentlyContinue

if (-not $nvmAvailable) {
    Write-Host "❌ nvm not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 Please install nvm-windows first:" -ForegroundColor Yellow
    Write-Host "   1. Download from: https://github.com/coreybutler/nvm-windows/releases" -ForegroundColor White
    Write-Host "   2. Install nvm-setup.exe" -ForegroundColor White
    Write-Host "   3. Restart PowerShell and run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 Alternative: Download Node.js 20.x directly from https://nodejs.org/" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ nvm found" -ForegroundColor Green
Write-Host ""

# Install Node.js 20.x
Write-Host "📦 Installing Node.js 20.18.0 LTS..." -ForegroundColor Green
nvm install 20.18.0

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Node.js 20.18.0" -ForegroundColor Red
    exit 1
}

Write-Host "🔄 Switching to Node.js 20.18.0..." -ForegroundColor Green
nvm use 20.18.0

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to switch to Node.js 20.18.0" -ForegroundColor Red
    exit 1
}

# Verify the change
Write-Host ""
Write-Host "✅ Verifying Node.js version..." -ForegroundColor Green
$newVersion = node --version
Write-Host "New Node.js version: $newVersion" -ForegroundColor White

# Test npm
$npmVersion = npm --version
Write-Host "npm version: $npmVersion" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Node.js compatibility fix completed!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 You can now run your Hytopia server:" -ForegroundColor Cyan
Write-Host "   cd 'F:\Hytopia-games\Gnarly-new'" -ForegroundColor White
Write-Host "   npm run start" -ForegroundColor White
Write-Host ""
Write-Host "📖 For more information, see: NODEJS_FIX_README.md" -ForegroundColor Yellow
