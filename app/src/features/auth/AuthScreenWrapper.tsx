import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { AuthScreen } from '@/features/onboarding/AuthScreen';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { signInWithApple, signInWithGoogle } from '@/services/auth/firebaseAuth';

export function AuthScreenWrapper() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithApple();
      if (result.user) {
        navigation.replace('Main');
      }
    } catch (error) {
      console.error('[Auth] Apple sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        navigation.replace('Main');
      }
    } catch (error) {
      console.error('[Auth] Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.replace('Main');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    );
  }

  return (
    <AuthScreen
      onAppleSignIn={handleAppleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onSkip={handleSkip}
    />
  );
}

