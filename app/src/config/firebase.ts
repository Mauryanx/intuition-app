import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
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
  return firebaseApp;
}
