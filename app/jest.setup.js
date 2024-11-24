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
  
  jest.mock('react-native/Libraries/Settings/Settings', () => ({
    get: jest.fn(),
    set: jest.fn(),
  }));
  
  jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
  }));
  
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
  jest.mock('@react-native-community/progress-bar-android', () => 'ProgressBarAndroid');
jest.mock('@react-native-clipboard/clipboard', () => ({
  getString: jest.fn(),
  setString: jest.fn(),
}));
jest.mock('@react-native-community/push-notification-ios', () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
//jest.spyOn(console, 'warn').mockImplementation(() => {});
//jest.spyOn(console, 'error').mockImplementation(() => {});

// Mock des modules non transformables
jest.mock('react-native-reanimated', () =>
    require('react-native-reanimated/mock')
  );
  jest.mock('react-native-maps', () => {
    const React = require('react');
    const { View } = require('react-native');
  
    const MockMapView = React.forwardRef((props, ref) => {
      const { children } = props;
      React.useImperativeHandle(ref, () => ({
        animateToRegion: jest.fn(),
      }));
      return <View {...props}>{children}</View>;
    });
  
    const MockMarker = ({ children, ...props }) => <View {...props}>{children}</View>;
    const MockCallout = ({ children, ...props }) => <View {...props}>{children}</View>;
  
    return {
      __esModule: true,
      default: MockMapView,
      Marker: MockMarker,
      Callout: MockCallout,
    };
  });

  jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getCurrentPositionAsync: jest.fn(() => Promise.resolve({
      coords: { latitude: 43.6, longitude: 3.8833 },
    })),
  }));
  
  
  
  
  
  jest.mock('react-native-toast-message', () => {
    const React = require('react');
    const Toast = React.forwardRef((props, ref) => null); // Return null or a simple view
    Toast.show = jest.fn();
    Toast.hide = jest.fn();
    Toast.setRef = jest.fn();
    return {
      __esModule: true,
      default: Toast,
    };
  });
  
  
  