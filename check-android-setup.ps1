# PowerShell script to check Android development environment
Write-Host "🔍 Checking Android Development Environment..." -ForegroundColor Green

# Check if Android Studio is installed
$androidStudioPaths = @(
    "${env:ProgramFiles}\Android\Android Studio",
    "${env:ProgramFiles(x86)}\Android\Android Studio",
    "${env:LOCALAPPDATA}\Programs\Android Studio"
)

$androidStudioFound = $false
foreach ($path in $androidStudioPaths) {
    if (Test-Path $path) {
        Write-Host "✅ Android Studio found at: $path" -ForegroundColor Green
        $androidStudioFound = $true
        break
    }
}

if (-not $androidStudioFound) {
    Write-Host "❌ Android Studio not found. Please install from: https://developer.android.com/studio" -ForegroundColor Red
}

# Check Android SDK
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $sdkPath) {
    Write-Host "✅ Android SDK found at: $sdkPath" -ForegroundColor Green
} else {
    Write-Host "❌ Android SDK not found. Install via Android Studio" -ForegroundColor Red
}

# Check environment variables
if ($env:ANDROID_HOME) {
    Write-Host "✅ ANDROID_HOME set to: $env:ANDROID_HOME" -ForegroundColor Green
} else {
    Write-Host "❌ ANDROID_HOME not set" -ForegroundColor Red
    Write-Host "   Set to: $sdkPath" -ForegroundColor Yellow
}

# Check ADB
$adbCmd = Get-Command adb -ErrorAction SilentlyContinue
if ($adbCmd) {
    Write-Host "✅ ADB is accessible" -ForegroundColor Green
} else {
    Write-Host "❌ ADB not found in PATH" -ForegroundColor Red
}

# Check emulator
$emulatorCmd = Get-Command emulator -ErrorAction SilentlyContinue
if ($emulatorCmd) {
    Write-Host "✅ Emulator is accessible" -ForegroundColor Green
    
    # List available AVDs
    $avds = & emulator -list-avds 2>$null
    if ($avds) {
        Write-Host "📱 Available AVDs:" -ForegroundColor Cyan
        $avds | ForEach-Object { Write-Host "   - $_" -ForegroundColor White }
    } else {
        Write-Host "⚠️  No AVDs found. Create one in Android Studio" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Emulator not found in PATH" -ForegroundColor Red
}

Write-Host "`n🚀 Quick Start Commands:" -ForegroundColor Cyan
Write-Host "   npm start          # Start Expo dev server" -ForegroundColor White
Write-Host "   npm run android    # Run on Android emulator" -ForegroundColor White
Write-Host "   npm run web        # Run in web browser" -ForegroundColor White
