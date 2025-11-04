// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  return {
    useSharedValue: jest.fn,
    useAnimatedStyle: jest.fn,
    withTiming: jest.fn,
    withSpring: jest.fn,
    withDelay: jest.fn,
    withSequence: jest.fn,
    withRepeat: jest.fn,
    runOnJS: jest.fn(cb => cb),
    View: 'View',
    Text: 'Text',
    Image: 'Image',
    ScrollView: 'ScrollView',
    createAnimatedComponent: jest.fn(component => component),
    default: {
      call: jest.fn(),
    },
  };
});

// Mock expo modules
jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(),
}));

// Mock the Image component
jest.mock('react-native/Libraries/Image/Image', () => ({
  getSize: jest.fn((uri, success) => success(100, 100)),
  prefetch: jest.fn(() => Promise.resolve()),
}));

// Mock the require for image assets
jest.mock('@/assets/overlays/halo.png', () => 'halo-image-mock');
jest.mock('@/assets/backgrounds/nebula.png', () => 'nebula-image-mock');

// Mock the navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported
// Using a safer mock approach
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.StatusBarManager = { getHeight: jest.fn() };
  return reactNative;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
}));
