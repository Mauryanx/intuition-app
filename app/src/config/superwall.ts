import Superwall from '@superwall/react-native-superwall';
import Constants from 'expo-constants';

type SuperwallConfig = {
  apiKey: string;
};

let isConfigured = false;

const getSuperwallConfig = (): SuperwallConfig | null => {
  const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra;
  const apiKey = extra?.superwallApiKey as string | undefined;

  if (!apiKey) {
    return null;
  }

  return { apiKey };
};

export async function ensureSuperwallConfigured(): Promise<void> {
  if (isConfigured) {
    return;
  }

  const config = getSuperwallConfig();
  if (!config) {
    console.warn('[Superwall] Missing API key; initialization skipped.');
    return;
  }

  try {
    await Superwall.configure({ apiKey: config.apiKey });
    isConfigured = true;
  } catch (error) {
    console.error('[Superwall] Failed to configure SDK', error);
  }
}
