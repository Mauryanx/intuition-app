// Mock the React Native modules that might cause issues in tests
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
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
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
}));
