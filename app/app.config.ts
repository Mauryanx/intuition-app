// import { config as loadEnv } from 'dotenv';
import type { ExpoConfig, ConfigContext } from 'expo/config';

// loadEnv({ path: '.env' });

const defineFirebaseConfig = () => {
  // Using placeholder values since we don't have access to .env
  const configEntries = {
    apiKey: "placeholder",
    authDomain: "placeholder",
    projectId: "placeholder",
    storageBucket: "placeholder",
    messagingSenderId: "placeholder",
    appId: "placeholder",
    measurementId: "placeholder",
  };

  return configEntries;
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const firebaseConfig = defineFirebaseConfig();
  const appEnv = 'development';

  return {
    ...config,
    name: 'Intuition Trainer',
    slug: 'intuition-trainer',
    version: '1.0.0',
    orientation: 'portrait',
    newArchEnabled: true,
    scheme: 'intuitiontrainer',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#070708',
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.intuition.trainer',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#070708',
      },
      package: 'com.intuition.trainer',
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-build-properties',
        {
          ios: {
            newArchEnabled: true,
          },
          android: {
            newArchEnabled: true,
          },
        },
      ],
      'expo-localization',
      'expo-secure-store',
    ],
    extra: {
      appEnv,
      firebaseConfig,
      superwallApiKey: 'placeholder',
    },
    experiments: {
      typedRoutes: false,
    },
  };
};
