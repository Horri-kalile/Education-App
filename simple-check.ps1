Write-Host "🔍 Checking Android Development Environment..." -ForegroundColor Green

# Check if Android Studio is installed
if (Test-Path "${env:ProgramFiles}\Android\Android Studio") {
    Write-Host "✅ Android Studio found" -ForegroundColor Green
} elseif (Test-Path "${env:LOCALAPPDATA}\Programs\Android Studio") {
    Write-Host "✅ Android Studio found" -ForegroundColor Green
} else {
    Write-Host "❌ Android Studio not found" -ForegroundColor Red
    Write-Host "   Download from: https://developer.android.com/studio" -ForegroundColor Yellow
}

# Check Android SDK
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $sdkPath) {
    Write-Host "✅ Android SDK found" -ForegroundColor Green
} else {
    Write-Host "❌ Android SDK not found" -ForegroundColor Red
}

# Check environment variables
if ($env:ANDROID_HOME) {
    Write-Host "✅ ANDROID_HOME is set" -ForegroundColor Green
} else {
    Write-Host "❌ ANDROID_HOME not set" -ForegroundColor Red
}

Write-Host "`n📱 Recommended Setup Steps:" -ForegroundColor Cyan
Write-Host "1. Install Android Studio" -ForegroundColor White
Write-Host "2. Open AVD Manager and create a virtual device" -ForegroundColor White
Write-Host "3. Start the emulator" -ForegroundColor White
Write-Host "4. Run: npm start" -ForegroundColor White
Write-Host "5. Press 'a' to run on Android" -ForegroundColor White

Write-Host "`n🚀 Alternative: Use Expo Go app on any Android device!" -ForegroundColor Green
