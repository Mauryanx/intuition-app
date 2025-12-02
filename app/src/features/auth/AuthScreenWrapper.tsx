import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthScreen } from '@/features/onboarding/AuthScreen';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { trackEvent } from '@/services/analytics';

export function AuthScreenWrapper() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAppleSignIn = () => {
    trackEvent({ name: 'auth_apple_signin_attempt' });
    // TODO: Implement Apple Sign In
    navigation.replace('Main');
  };

  const handleGoogleSignIn = () => {
    trackEvent({ name: 'auth_google_signin_attempt' });
    // TODO: Implement Google Sign In
    navigation.replace('Main');
  };

  const handleSkip = () => {
    trackEvent({ name: 'auth_skipped' });
    navigation.replace('Main');
  };

  return (
    <AuthScreen
      onAppleSignIn={handleAppleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onSkip={handleSkip}
    />
  );
}

