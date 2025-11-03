import { config as loadEnv } from 'dotenv';
import type { ExpoConfig, ConfigContext } from 'expo/config';

loadEnv({ path: '.env' });

const defineFirebaseConfig = () => {
  const configEntries = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  return Object.fromEntries(
    Object.entries(configEntries).filter(
      ([, value]) => value !== undefined && value !== '',
    ),
  );
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const firebaseConfig = defineFirebaseConfig();
  const appEnv = process.env.APP_ENV ?? 'development';

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
      superwallApiKey: process.env.SUPERWALL_API_KEY ?? '',
    },
    experiments: {
      typedRoutes: false,
    },
  };
};
