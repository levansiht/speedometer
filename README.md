# 🚗 SpeedometerApp - React NativeThis is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

High-performance GPS speedometer app với real-time tracking, trip management, và voice announcements.# Getting Started

## 📋 Mục lục>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

- [Features](#-features)## Step 1: Start the Metro Server

- [Tech Stack](#-tech-stack)

- [Prerequisites](#-prerequisites)First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

- [Installation](#-installation)

- [Build Instructions](#-build-instructions)To start Metro, run the following command from the _root_ of your React Native project:

- [Configuration](#-configuration)

- [Project Structure](#-project-structure)```bash

- [Troubleshooting](#-troubleshooting)# using npm

npm start

---

# OR using Yarn

## ✨ Featuresyarn start

````

### Core Features

- ⚡ **Real-time GPS tracking** - 100ms update interval (10x/giây)## Step 2: Start your Application

- 🎯 **High accuracy positioning** - GPS + Network + Cell towers

- 📊 **Trip management** - Record, save, và analyze tripsLet Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

- 🗺️ **Route mapping** - Visual route display với React Native Maps

- 🔊 **Voice announcements** - Vietnamese TTS cho speed alerts### For Android

- 💾 **SQLite persistence** - Local database cho trip history

- 📤 **Export functionality** - GPX và JSON export```bash

- 🧭 **Compass heading** - Real-time direction indicator# using npm

- 🌓 **Dark/Light theme** - Customizable UI themesnpm run android



### Performance# OR using Yarn

- Zero distance filter = Continuous updatesyarn android

- Platform-specific optimizations```

- Native GPS modules (không dùng Expo)

- Optimized for navigation use cases### For iOS



---```bash

# using npm

## 🛠 Tech Stacknpm run ios



### Core# OR using Yarn

- **React Native** 0.76.0 (LTS)yarn ios

- **TypeScript** 5.8.3```

- **React** 19.1.1

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

### Navigation

- React Navigation 7.xThis is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

- Stack Navigator

- Bottom Tab Navigator## Step 3: Modifying your App



### Native ModulesNow that you have successfully run the app, let's modify it.

- `react-native-geolocation-service` - High-performance GPS

- `react-native-maps` - Map display1. Open `App.tsx` in your text editor of choice and edit some lines.

- `react-native-tts` - Text-to-Speech2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

- `react-native-sqlite-storage` - Database

- `react-native-sensors` - Magnetometer/Compass   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

- `react-native-fs` - File system

- `react-native-share` - File sharing## Congratulations! :tada:



### State ManagementYou've successfully run and modified your React Native App. :partying_face:

- React Context API

- Custom Hooks### Now what?



---- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).

- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

## 📦 Prerequisites

# Troubleshooting

### System Requirements

- **macOS** (for iOS development)If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

- **Node.js** 20+

- **Java** 17 (required for Android build)# Learn More

- **Android SDK**

- **Xcode** 15+ (for iOS)To learn more about React Native, take a look at the following resources:



### Install Java 17- [React Native Website](https://reactnative.dev) - learn more about React Native.

- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.

```bash- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.

# Install Java 17 via Homebrew- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.

brew install openjdk@17- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


# Add to PATH (add to ~/.zshrc)
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
export PATH="$JAVA_HOME/bin:$PATH"

# Verify installation
java -version
# Should output: openjdk version "17.0.x"
````

### Install Android SDK

```bash
# Via Android Studio
# Download from: https://developer.android.com/studio

# Or via Homebrew
brew install --cask android-studio
```

### Environment Variables

Add to `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
cd /Users/levansiht/Project/PSCD/SpeedometerAppRN076
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your settings
nano .env
```

### 4. Android Setup

```bash
# No additional setup required
# All native modules are auto-linked
```

### 5. iOS Setup (Optional)

```bash
cd ios
pod install
cd ..
```

---

## 🏗 Build Instructions

### Quick Build (Recommended)

```bash
# Use the build script
./build-android.sh
```

### Manual Build

#### Android Debug APK

```bash
# Set Java 17
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home

# Clean build
cd android
./gradlew clean

# Build debug APK
./gradlew assembleDebug

# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

#### Android Release APK

```bash
# Generate signing key (first time only)
keytool -genkeypair -v -storetype PKCS12 \
  -keystore speedometer-release-key.keystore \
  -alias speedometer-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000

# Move keystore to android/app
mv speedometer-release-key.keystore android/app/

# Edit android/gradle.properties and add:
# MYAPP_RELEASE_STORE_FILE=speedometer-release-key.keystore
# MYAPP_RELEASE_KEY_ALIAS=speedometer-key-alias
# MYAPP_RELEASE_STORE_PASSWORD=your_password
# MYAPP_RELEASE_KEY_PASSWORD=your_password

# Build release APK
cd android
./gradlew assembleRelease

# Output: android/app/build/outputs/apk/release/app-release.apk
```

#### iOS Build

```bash
# Open in Xcode
open ios/SpeedometerAppRN076.xcworkspace

# Or via CLI
npx react-native run-ios

# Release build
npx react-native run-ios --configuration Release
```

---

## ⚙️ Configuration

### Android Permissions

All permissions are configured in `android/app/src/main/AndroidManifest.xml`:

```xml
<!-- GPS - High Accuracy -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />

<!-- Network -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Storage -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<!-- Keep Awake -->
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

### GPS Configuration

High-performance GPS settings in `src/services/GPSService.ts`:

```typescript
const HIGH_PERFORMANCE_CONFIG = {
  accuracy: {
    android: 'high', // GPS + Network + Cell
    ios: 'bestForNavigation',
  },
  distanceFilter: 0, // Continuous updates
  interval: 100, // 100ms = 10 updates/giây
  fastestInterval: 50, // Max 20 updates/giây
  enableHighAccuracy: true,
  useSignificantChanges: false, // FALSE = continuous
};
```

### Environment Variables (.env)

See `.env.example` for all available options.

---

## 📁 Project Structure

```
SpeedometerAppRN076/
├── android/                    # Android native code
│   ├── app/
│   │   ├── src/main/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── build.gradle           # Project-level Gradle config
│   └── gradle.properties      # Gradle properties (newArchEnabled=false)
├── ios/                       # iOS native code
├── src/
│   ├── components/           # React components
│   │   ├── SpeedometerScreen.tsx
│   │   ├── TripHistoryScreen.tsx
│   │   ├── MapScreen.tsx
│   │   └── ...
│   ├── services/            # Business logic services
│   │   ├── GPSService.ts         # High-performance GPS
│   │   ├── DatabaseService.ts    # SQLite operations
│   │   ├── VoiceService.ts       # TTS
│   │   ├── ExportService.ts      # File export
│   │   └── CompassService.ts     # Magnetometer
│   ├── hooks/               # Custom React hooks
│   │   └── useLocation.ts
│   ├── contexts/            # React Context providers
│   │   ├── TripContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── SpeedAlertContext.tsx
│   ├── navigation/          # Navigation setup
│   │   ├── BottomTabNavigator.tsx
│   │   └── CustomTabBar.tsx
│   ├── utils/               # Utility functions
│   ├── constants/           # App constants
│   └── types/               # TypeScript types
├── App.tsx                  # Root component
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── .env                    # Environment variables
├── .env.example            # Environment template
├── build-android.sh        # Build script
└── README.md               # This file
```

---

## 🔧 Development

### Run Development Server

```bash
# Start Metro bundler
npm start

# Or
npx react-native start
```

### Run on Device/Emulator

```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

### Install APK on Device

```bash
# Via ADB
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Check connected devices
adb devices
```

### Debug

```bash
# Android logs
npx react-native log-android

# iOS logs
npx react-native log-ios
```

---

## 🐛 Troubleshooting

### Build Errors

#### "Gradle version mismatch"

```bash
cd android
./gradlew --version  # Check current version
```

Ensure `gradle-wrapper.properties` uses Gradle 8.10+

#### "Java version incompatible"

```bash
# Check Java version
java -version

# Should be Java 17
# If not, set JAVA_HOME:
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
```

#### "compileSdk version too high"

Edit `android/build.gradle`:

```gradle
compileSdkVersion = 36  // Should match dependencies
```

#### "New Architecture compilation error"

Ensure `android/gradle.properties` has:

```properties
newArchEnabled=false
```

### Runtime Errors

#### GPS not working

1. Check permissions granted
2. Enable Location Services on device
3. Test outdoors (better GPS signal)

#### "Module not found"

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Android
cd android && ./gradlew clean
```

#### Maps not showing

1. Get Google Maps API key
2. Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_API_KEY"/>
```

---

## 📝 Build Configuration

### Current Setup

- **React Native:** 0.76.0 (LTS)
- **Gradle:** 8.10.2
- **Java:** 17
- **Kotlin:** 1.9.24
- **New Architecture:** Disabled
- **Hermes:** Enabled
- **compileSdk:** 36
- **targetSdk:** 34
- **minSdk:** 24

### Why React Native 0.76?

React Native 0.82 có issue với New Architecture không thể disable, gây lỗi C++ compilation. RN 0.76 (LTS) stable và cho phép disable New Architecture, phù hợp với production.

---

## 🚀 Deployment

### Google Play Store

1. Generate signed APK (see Build Instructions)
2. Create Google Play Developer account
3. Create app listing
4. Upload APK
5. Complete store listing
6. Submit for review

### Over-The-Air Updates

Consider using:

- CodePush (Microsoft)
- Expo Updates (if migrating to Expo)

---

## 📄 License

Private project - All rights reserved

---

## 👤 Author

**Le Van Si**

- Project: PSCD
- Date: November 2025

---

## 🙏 Acknowledgments

- React Native community
- Native module maintainers
- Open source contributors

---

## 📞 Support

For issues or questions:

1. Check Troubleshooting section
2. Review GitHub issues of native modules
3. Check React Native documentation

---

**Last Updated:** November 7, 2025  
**Build Status:** ✅ Passing  
**Version:** 1.0.0
