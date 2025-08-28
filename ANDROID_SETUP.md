# Android Development Setup Guide

## Prerequisites

1. Install Android Studio: https://developer.android.com/studio
2. Install Java JDK 11 or higher
3. Set up environment variables

## Environment Variables (Windows)

Add these to your system PATH:

```
ANDROID_HOME = C:\Users\%USERNAME%\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT = C:\Users\%USERNAME%\AppData\Local\Android\Sdk
```

Add to PATH:

```
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%ANDROID_HOME%\platform-tools
```

## Creating an AVD (Android Virtual Device)

1. Open Android Studio
2. Click "More Actions" > "AVD Manager"
3. Click "Create Virtual Device"
4. Select "Phone" > "Pixel 7" (or any modern device)
5. Select "Tiramisu" (API 33) or newer
6. Click "Next" > "Finish"

## Running the App

1. Start the emulator:

   ```bash
   # Option 1: From Android Studio AVD Manager
   # Click the play button next to your virtual device

   # Option 2: From command line
   emulator -avd Your_AVD_Name
   ```

2. Start your React Native app:

   ```bash
   npm start
   ```

3. Press 'a' in the terminal to run on Android

## Alternative: Run directly on Android

```bash
npm run android
```

## Troubleshooting

- Make sure Android SDK is installed
- Check that environment variables are set correctly
- Restart VS Code after setting environment variables
- Enable "Intel HAXM" for faster emulation (Intel processors)
- Enable "Hyper-V" for AMD processors

## Quick Test Commands

```bash
# Check if Android SDK is accessible
adb devices

# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_7_API_33
```
