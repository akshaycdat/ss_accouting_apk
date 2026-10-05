const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * Uses Expo's metro config (which extends React Native's default config) so that
 * the project can be developed both with `npx expo start` and the RN CLI.
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

module.exports = config;
