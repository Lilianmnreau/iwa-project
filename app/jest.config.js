module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)',
    ],
  };