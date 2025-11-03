import Constants from 'expo-constants';

let isConfigured = false;

// Mock Superwall implementation
export const SuperwallMock = {
  register: async ({ feature }: { feature: () => void }) => {
    // Just execute the feature function directly without showing a paywall
    feature();
    return true;
  },
  shared: {
    register: async ({ feature }: { feature: () => void }) => {
      // Just execute the feature function directly without showing a paywall
      feature();
      return true;
    }
  }
};

export async function ensureSuperwallConfigured(): Promise<void> {
  if (isConfigured) {
    return;
  }

  console.log('[SuperwallMock] Using mock implementation');
  isConfigured = true;
  return;
}