module.exports = {
  name: 'Suyash Accounting',
  slug: 'suyash-accounting',
  version: '1.2.1',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    resizeMode: 'contain',
  },
  android: {
    package: 'com.suyash.member',
    versionCode: 4,
    permissions: [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'ACCESS_BACKGROUND_LOCATION',
      'INTERNET',
      'ACCESS_NETWORK_STATE',
      'FOREGROUND_SERVICE',
      'FOREGROUND_SERVICE_LOCATION',
      'POST_NOTIFICATIONS',
      'RECEIVE_BOOT_COMPLETED',
      'WAKE_LOCK',
    ],
  },
  ios: {
    bundleIdentifier: 'com.suyash.member',
    buildNumber: '1.2.1',
    supportsTablet: false,
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Suyash Accounting needs your location to record attendance.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'Suyash Accounting tracks your location during work hours for attendance compliance.',
      NSLocationAlwaysUsageDescription:
        'Suyash Accounting tracks your location during work hours for attendance compliance.',
      UIBackgroundModes: ['location', 'fetch', 'processing'],
    },
  },
  extra: {
    apiBaseUrl: 'https://api.saams.co.in',
  },
};