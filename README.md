# Suyash Accounting Mobile Application

A cross-platform mobile application for **SUYASH Accounting & Management** built using **React Native**, **TypeScript**, and the **React Native Community CLI** supporting both **Android** and **iOS**.

---

## Architecture Paradigm

```
================================================================================
                    SOURCE PROJECT vs. COMPILED ARTIFACTS
================================================================================

              React Native + TypeScript Source Project
            (src/, App.tsx, package.json, android/, ios/)
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
      Android Native Build               iOS Native Build
        (Gradle / NDK)                  (Xcode / CocoaPods)
                 │                               │
        ┌────────┴────────┐                      ▼
        ▼                 ▼              iOS Application (.ipa)
Android APK          Android AAB           (App Store /
(Direct Device       (Google Play           TestFlight)
 Installation)         Release)
```

> **CRITICAL NOTE:** The APK file is a compiled binary output for Android installation. The source code in this repository is the complete React Native project that produces both Android (APK & AAB) and iOS applications.

---

## Features

- **Member Authentication:** Secure login using registered mobile number and password, with role verification (`Member`).
- **Session Management:** Secure JWT token storage and automated token validation.
- **Attendance Management:**
  - Today's attendance tracking.
  - One-tap punch-in with location selection (Office, Remote, Client Site) and remarks.
  - One-tap punch-out with confirmation.
  - Accurate punch-in, punch-out, and total hour duration calculations.
- **Attendance History:** Paginated list of historical punches, late entries, and duration records.
- **Member Profile:** Personal, employment, contact, and emergency contact details.
- **Design System:** Clean corporate styling with Suyash Navy (`#1A237E`), Primary Blue (`#0288D1`), high-contrast light surfaces, and touch targets meeting accessibility standards.

---

## Ready-to-Install Android APK Files

If you wish to immediately install the application on an Android device, pre-built and signed APK binaries are provided in the repository:

1. **`public/suyash-member-v1.0.0.apk`**
2. **`public/suyash-member-app.apk`**
3. **`public/suyash-member.apk`**
4. **`app/apk/suyash-member-v1.0.0.apk`**
5. **`app/apk/suyash-member.apk`**

### Installation Steps on Android:
1. Copy or download **`public/suyash-member-v1.0.0.apk`** to your phone.
2. Tap the APK file to initiate installation.
3. If prompted by Android, enable **Allow from this source** (Install Unknown Apps).
4. Launch **Suyash Accounting** and log in with your registered mobile credentials.

---

## Development Setup (VS Code / CLI)

### 1. Prerequisites
- **Node.js:** v18 or v20+ LTS
- **JDK:** OpenJDK 17 or 21
- **Android Studio:** Android SDK Platform 34+, Android SDK Build-Tools 34.0.0
- **Xcode (macOS only):** Xcode 15+ with Command Line Tools and CocoaPods

### 2. Install Dependencies
```bash
npm install
```

### 3. Running in Development
```bash
# Start Metro bundler
npm start

# In a separate terminal, launch Android
npm run android

# On macOS, launch iOS
cd ios && pod install && cd ..
npm run ios
```

---

## Generating Builds

### Android APK (Direct Device Distribution)
```bash
cd android
./gradlew assembleRelease
# Output located at: android/app/build/outputs/apk/release/app-release.apk
```

### Android AAB (Google Play Store Release)
```bash
cd android
./gradlew bundleRelease
# Output located at: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS Application (.ipa)
1. Open `ios/SuyashAccountingMobile.xcworkspace` in Xcode.
2. Configure your Apple Developer Team in **Signing & Capabilities**.
3. Select **Product > Archive** to build the iOS bundle for App Store or TestFlight distribution.

---

## Project Structure

For full architectural details, API specifications, and instructions for adding future modules, see [PROJECT-ARCHITECTURE.md](PROJECT-ARCHITECTURE.md).
