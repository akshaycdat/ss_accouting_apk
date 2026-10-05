# Suyash Accounting Mobile Application - Architecture Document

## Overview

Suyash Accounting Mobile is an enterprise member attendance and task management portal built with **React Native**, **TypeScript**, and native targets for both **iOS (iPhone iOS 15+)** and **Android (API 24+)**. Both platforms share the exact same ASP.NET Core backend at `https://api.saams.co.in`, using unified data models, business logic, and UI design language.

```
================================================================================
                                BUILD PIPELINE
================================================================================

                    ┌──────────────────────────────────────┐
                    │     Shared React Native / TS Core    │
                    │   (APIs, Models, Hooks, Services)    │
                    └──────────────────┬───────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────┐                             ┌───────────────────────┐
│     Android Target    │                             │       iOS Target      │
│  (Gradle / Compose)   │                             │  (Xcode / CocoaPods)  │
└───────────┬───────────┘                             └───────────┬───────────┘
            │                                                     │
     ┌──────┴──────┐                                              ▼
     ▼             ▼                                    ┌───────────────────┐
┌─────────┐   ┌─────────┐                               │    iOS .ipa /     │
│   APK   │   │   AAB   │                               │ TestFlight / App  │
│ (v1.2.1)│   │ (v1.2.1)│                               │   Store (v1.2.1)  │
└─────────┘   └─────────┘                               └───────────────────┘
```

---

## 1. Technical Stack

- **Runtime & Framework:** React Native 0.74.x
- **Language:** TypeScript 5.4.x (Strict Type Checking)
- **iOS Target:** iOS 15.0+ (Universal iPhone, arm64)
- **Android Target:** Android SDK 34/36 (minSdk 24)
- **Navigation:** React Navigation 6 (Native Stack, Safe Area Context)
- **Networking:** Axios 1.6+ (Centralized Interceptors, Bearer JWT, 401 Session Clear)
- **Storage:** React Native AsyncStorage (Session Persistence & Offline Location Queue)
- **Styling:** Design System (Navy `#1A237E`, Primary `#0288D1`, Surface `#FFFFFF`, 16pt card radius)

---

## 2. Directory Structure

```
SuyashAccountingMobile/
│
├── android/                         # Android native wrapper
├── app/                             # Native Android module (Kotlin / Jetpack Compose)
│
├── ios/                             # iOS native project
│   ├── SuyashAccountingMobile.xcodeproj/ # Xcode project configuration (PBXProject)
│   ├── SuyashAccountingMobile/      # Native iOS source files
│   │   ├── AppDelegate.h            # Application delegate header
│   │   ├── AppDelegate.mm           # Application delegate implementation
│   │   ├── Info.plist               # iOS permissions & background modes
│   │   ├── LaunchScreen.storyboard  # iOS native launch storyboard
│   │   ├── main.m                   # Objective-C entrypoint
│   │   ├── main.jsbundle            # Precompiled production JavaScript bundle
│   │   └── Images.xcassets/         # App icon & asset catalogs
│   └── Podfile                      # CocoaPods configuration (iOS 15.0+)
│
├── src/                             # Shared TypeScript source code (iOS + Web)
│   ├── api/                         # Centralized API endpoints
│   │   ├── apiClient.ts             # Axios instance & token interceptors
│   │   ├── authApi.ts               # Login API (/api/auth/login)
│   │   ├── attendanceApi.ts         # Today, Check In, Check Out, History
│   │   ├── leaveApi.ts              # Balance & Apply Leave
│   │   ├── tasksApi.ts              # My Tasks, self-assign, update
│   │   ├── recurringTasksApi.ts     # Recurring tasks & recurrence types
│   │   ├── notificationApi.ts       # In-app notifications & read status
│   │   ├── locationTrackingApi.ts   # Batch location upload
│   │   └── memberApi.ts             # Profile retrieval & update
│   │
│   ├── models/                      # Shared data contracts
│   │   ├── auth.ts                  # UserSession & Login requests
│   │   ├── attendance.ts            # AttendanceRecord & punch types
│   │   ├── leave.ts                 # Leave balances & applications
│   │   ├── task.ts                  # TaskAssignment & priorities
│   │   ├── recurringTask.ts         # RecurringTask & schedules
│   │   ├── notification.ts          # AppNotification
│   │   └── locationTracking.ts      # LocationTrackingPoint
│   │
│   ├── services/                    # Business workflows
│   │   ├── locationTrackingService.ts # 15-min tracking cycle & anti-duplicate
│   │   └── iosLocationPermission.ts  # iOS "When In Use" -> "Always" flow
│   │
│   ├── screens/                     # UI Screen implementations
│   │   ├── auth/LoginScreen.tsx
│   │   └── member/
│   │       ├── DashboardScreen.tsx  # Centered profile, attendance, duty card
│   │       ├── AttendanceScreen.tsx # Check in / Check out punch screen
│   │       ├── AttendanceHistoryScreen.tsx # History records
│   │       ├── LeaveScreen.tsx      # Balances & leave applications
│   │       ├── MyTasksScreen.tsx    # List & Kanban task views
│   │       ├── RecurringTasksScreen.tsx # Filtered recurring compliance tasks
│   │       ├── NotificationsScreen.tsx  # In-app alerts & notifications
│   │       └── ProfileScreen.tsx    # Member profile details
│   │
│   └── navigation/AppNavigator.tsx  # Root navigation container & stack
│
└── publish/
    ├── ios/                         # iOS release binaries
    │   ├── SuyashAccounting-v1.2.1.ipa # TestFlight / Distribution IPA
    │   └── SuyashAccountingMobile.ipa # IPA alias
    ├── suyash-member-v1.2.1.apk     # Android Signed Release APK
    ├── suyash-member-v1.2.1-debug.apk # Android Debug APK
    └── CHANGELOG.md                 # Complete release history
```

---

## 3. Shared API Architecture & Contracts

Both iOS and Android call identical endpoints on `https://api.saams.co.in`:

| Feature | Method | Endpoint | Description |
|---|---|---|---|
| Login | `POST` | `/api/auth/login` | Mobile number & password validation |
| Today Attendance | `GET` | `/api/attendance/today?userId={id}` | Status & last location capture |
| Check In | `POST` | `/api/attendance/checkin` | Shift check-in punch |
| Check Out | `POST` | `/api/attendance/checkout` | Shift check-out punch |
| Attendance History | `GET` | `/api/attendance/history/me` | Historical punch records |
| Leave Applications | `GET` | `/api/leaves/me` | User's leave history |
| Apply Leave | `POST` | `/api/leaves/apply/me` | Submits new leave request |
| Leave Balance | `GET` | `/api/leaves/balance/me` | Casual, Sick, Earned balances |
| My Tasks | `GET` | `/api/taskassignments/my-tasks` | Assigned client tasks |
| Update Task | `PATCH` | `/api/taskassignments/{id}` | Status & progress update |
| Self Assign Task | `POST` | `/api/taskassignments/assign-multiple` | Self-assigned task rows |
| Recurring Tasks | `GET` | `/api/taskassignments/recurring-tasks` | Filterable periodic tasks |
| Recurrence Types | `GET` | `/api/taskassignments/recurring-task-types`| Frequency types |
| Location Batch | `POST` | `/api/memberlocation/save-batch` | Periodic 15-minute GPS batch |
| Member Profile | `GET` | `/api/profile/me` | Profile details |
| Update Profile | `PUT` | `/api/profile/me` | Profile updates |
| Notifications | `GET` | `/api/notifications` | In-app alerts list |
| Mark Read | `PUT` | `/api/notifications/{id}/read` | Mark alert as read |

---

## 4. Background Location Tracking on iOS

iOS enforces strict location security and battery guidelines:

1. **Permission Sequence:**
   - On first shift Check-In, the app requests `When In Use` authorization (`NSLocationWhenInUseUsageDescription`).
   - Immediately following, it requests `Always` authorization (`NSLocationAlwaysAndWhenInUseUsageDescription`).
   - If the user selects "Allow Once", the app gracefully informs the user that continuous duty monitoring requires "Always Allow" and provides a deep link directly to iOS Settings via `Linking.openSettings()`.
2. **Background Modes in Info.plist:**
   - `location` (continuous background location updates)
   - `fetch` (periodic background refresh)
   - `processing` (background queue sync)
3. **15-Minute Intelligent Interval:**
   - Reads `todaylast_locationCapture` from `GET /api/attendance/today`.
   - If less than 15 minutes elapsed, defers immediate acquisition to avoid duplicate points.
4. **Anti-Duplicate Queue:**
   - Rejects identical coordinates within `0.0001°` tolerance (~11 meters).
   - Rejects readings captured less than 13 minutes apart.
   - Automatically halts tracking and purges the pending queue on shift Check-Out.

---

## 5. How to Run the iOS App

### A. On iOS Simulator (macOS)
```bash
# 1. Install pods
cd ios && pod install && cd ..

# 2. Run on iPhone Simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### B. On a Physical iPhone
1. Connect iPhone via USB and trust your Mac.
2. Open `ios/SuyashAccountingMobile.xcodeproj` (or `.xcworkspace`) in Xcode.
3. In Xcode, navigate to **Signing & Capabilities** → select your **Apple Development Team**.
4. Select your connected iPhone from the device target menu.
5. Click **Product > Run** (`Cmd + R`).

### C. On TestFlight
1. In Xcode, select **Any iOS Device (arm64)** as build target.
2. Choose **Product > Archive**.
3. Once archiving completes in the Xcode Organizer, click **Distribute App** → **App Store Connect** → **Upload**.
4. Your build will appear in TestFlight within 10-15 minutes for internal/external beta testers.
