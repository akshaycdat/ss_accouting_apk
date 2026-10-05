module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
  // Expo is used as an ADDITIVE tooling layer (VS Code development, `npx expo start`).
  // The app itself is a bare React Native app and does not use Expo native modules at
  // runtime, so we keep Expo's native modules out of the RN autolinking to preserve the
  // existing RN CLI Android/iOS build exactly as before.
  dependencies: {
    'expo': { platforms: { android: null, ios: null } },
    'expo-asset': { platforms: { android: null, ios: null } },
    'expo-constants': { platforms: { android: null, ios: null } },
    'expo-file-system': { platforms: { android: null, ios: null } },
    'expo-font': { platforms: { android: null, ios: null } },
    'expo-keep-awake': { platforms: { android: null, ios: null } },
    'expo-modules-core': { platforms: { android: null, ios: null } },
  },
};
