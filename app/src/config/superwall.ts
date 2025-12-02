import Constants from 'expo-constants';

let isConfigured = false;

type RegisterOptions = {
  feature: () => void;
  placement?: string;
};

// Mock Superwall implementation
export const SuperwallMock = {
  register: async ({ feature, placement }: RegisterOptions) => {
    console.log('[superwall mock] placement', placement ?? 'default');
    feature();
    return true;
  },
  shared: {
    register: async ({ feature, placement }: RegisterOptions) => {
      console.log('[superwall mock] placement', placement ?? 'default');
      feature();
      return true;
    },
  },
};

export async function ensureSuperwallConfigured(): Promise<void> {
  if (isConfigured) {
    return;
  }

  console.log('[SuperwallMock] Using mock implementation');
  isConfigured = true;
  return;
}