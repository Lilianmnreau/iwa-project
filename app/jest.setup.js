jest.mock('expo-constants', () => ({
    manifest: {
      name: 'TestApp',
    },
    platform: {
      ios: {},
      android: {},
    },
  }));
  
  jest.mock('expo-font', () => ({
    loadAsync: jest.fn(),
  }));
  
  jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
    MaterialCommunityIcons: 'MaterialCommunityIcons',
  }));
  jest.mock('react-native-calendars', () => ({
    Calendar: jest.fn(() => null),
  }));
  
  jest.mock('react-native-swipe-gestures', () => ({
    GestureRecognizer: jest.fn(() => null),
  }));
  
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // Mock des animations
  