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
  