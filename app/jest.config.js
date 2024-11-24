module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|expo-constants|expo-font|expo-asset|expo-modules-core|expo|@expo|react-native-gesture-handler|react-redux|@expo/vector-icons|expo-status-bar|react-native-calendars|react-native-swipe-gestures|react-native-maps|@kolking/react-native-rating)/)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Transforme les fichiers JS/TS avec Babel
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
