import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getRemoteConfig, fetchAndActivate } from 'firebase/remote-config';
import Constants from 'expo-constants';

export type FirebaseConfig = {
  apiKey: string;
  authDomain?: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
};

export function getFirebaseConfig(): FirebaseConfig | null {
  const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra;
  const config = extra?.firebaseConfig as FirebaseConfig | undefined;

  if (!config?.apiKey || !config?.projectId || !config?.appId) {
    return null;
  }

  return config;
}

let firebaseApp: FirebaseApp | null = null;

export function ensureFirebaseApp(): FirebaseApp | null {
  if (firebaseApp) {
    return firebaseApp;
  }

  const existing = getApps();
  if (existing.length) {
    firebaseApp = existing[0]!;
    return firebaseApp;
  }

  const config = getFirebaseConfig();
  if (!config) {
    console.warn('[Firebase] Missing configuration; skipping initialization.');
    return null;
  }

  firebaseApp = initializeApp(config);
  initialiseRemoteConfig(firebaseApp);
  return firebaseApp;
}

function initialiseRemoteConfig(app: FirebaseApp) {
  try {
    const remoteConfig = getRemoteConfig(app);
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 60_000,
      fetchTimeoutMillis: 30_000,
    };
    remoteConfig.defaultConfig = {
      paywall_placement: 'end_of_funnel',
    };
    fetchAndActivate(remoteConfig).catch((error) =>
      console.warn('[RemoteConfig] fetch failed', error),
    );
  } catch (error) {
    console.warn('[RemoteConfig] unavailable', error);
  }
}

export function ensureAuth() {
  const app = ensureFirebaseApp();
  if (!app) {
    throw new Error('Firebase app not initialised');
  }
  return getAuth(app);
}
