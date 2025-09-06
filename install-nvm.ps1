# Install nvm-windows and Node.js 20.x LTS
Write-Host "🔧 Installing Node Version Manager (nvm-windows)..." -ForegroundColor Cyan

# Download nvm-windows installer
$nvmUrl = "https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe"
$nvmInstaller = "$env:TEMP\nvm-setup.exe"

Write-Host "📥 Downloading nvm-windows..." -ForegroundColor Green
Invoke-WebRequest -Uri $nvmUrl -OutFile $nvmInstaller

# Install nvm-windows silently
Write-Host "⚙️ Installing nvm-windows..." -ForegroundColor Green
Start-Process -FilePath $nvmInstaller -ArgumentList "/S" -Wait

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Wait for installation to complete
Start-Sleep -Seconds 5

Write-Host "✅ nvm-windows installed successfully!" -ForegroundColor Green
Write-Host ""

# Install Node.js 20.x LTS
Write-Host "📦 Installing Node.js 20.18.0 LTS..." -ForegroundColor Green
nvm install 20.18.0

if ($LASTEXITCODE -eq 0) {
    Write-Host "🔄 Switching to Node.js 20.18.0..." -ForegroundColor Green
    nvm use 20.18.0

    # Verify installation
    Write-Host ""
    Write-Host "✅ Node.js installation completed!" -ForegroundColor Green
    Write-Host "New Node.js version:" -ForegroundColor White
    node --version
    Write-Host "npm version:" -ForegroundColor White
    npm --version
} else {
    Write-Host "❌ Failed to install Node.js 20.18.0" -ForegroundColor Red
    Write-Host "Please try installing manually from https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Setup complete! You can now run your Hytopia server." -ForegroundColor Green
