import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { ensureFirebaseApp, ensureSuperwallConfigured } from '@/config';
import { RootNavigator } from '@/navigation';

SplashScreen.preventAutoHideAsync().catch(() => {
  // noop
});

export function AppRoot() {
  useEffect(() => {
    ensureFirebaseApp();
    void ensureSuperwallConfigured().finally(() => {
      SplashScreen.hideAsync().catch(() => {
        // noop
      });
    });
  }, []);

  return (
    <>
      <RootNavigator />
      <StatusBar style="light" />
    </>
  );
}
