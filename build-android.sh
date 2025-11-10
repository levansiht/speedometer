#!/bin/bash

# Build script for SpeedometerAppRN (React Native 0.76)
# Fixed version with disabled New Architecture

echo "🔧 Setting Java 17..."
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home

echo "📌 Current Java version:"
java -version

echo ""
echo "🧹 Cleaning build..."
cd android
./gradlew clean

echo ""
echo "🏗️  Building Debug APK..."
./gradlew assembleDebug

echo ""
echo "✅ Build complete!"
echo "📦 APK location: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📱 To install on device:"
echo "   adb install android/app/build/outputs/apk/debug/app-debug.apk"
