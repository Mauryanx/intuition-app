import { OAuthProvider, signInWithCredential, type User } from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';

import { ensureAuth } from '@/config/firebase';
import { trackEvent } from '@/services/analytics';

// Complete the auth session properly
WebBrowser.maybeCompleteAuthSession();

type AuthResult = {
  user: User;
  error: null;
} | {
  user: null;
  error: Error;
};

export async function signInWithApple(): Promise<AuthResult> {
  try {
    trackEvent({ name: 'auth_apple_signin_start' });
    const auth = ensureAuth();

    // Apple Sign In requires expo-apple-authentication for native implementation
    // For now, we'll use OAuth flow via expo-auth-session
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'intuitiontrainer',
      path: 'auth',
    });

    const request = new AuthSession.AuthRequest({
      clientId: 'com.intuition.trainer',
      scopes: ['name', 'email'],
      responseType: AuthSession.ResponseType.IdToken,
      redirectUri,
      state: AuthSession.AuthRequest.makeRandomState(),
    });

    const discovery = {
      authorizationEndpoint: 'https://appleid.apple.com/auth/authorize',
      tokenEndpoint: 'https://appleid.apple.com/auth/token',
    };

    const result = await AuthSession.startAsync({
      authUrl: request.makeAuthUrl(discovery),
      returnUrl: redirectUri,
    });

    if (result.type === 'success' && result.params.id_token) {
      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: result.params.id_token,
        rawNonce: request.state,
      });

      const userCredential = await signInWithCredential(auth, credential);
      trackEvent({ name: 'auth_apple_signin_success' });
      
      return {
        user: userCredential.user,
        error: null,
      };
    }

    throw new Error('Apple sign-in was cancelled');
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    trackEvent({ name: 'auth_apple_signin_error', params: { error: err.message } });
    
    if (err.message !== 'Apple sign-in was cancelled') {
      Alert.alert('Sign In Error', err.message);
    }
    
    return {
      user: null,
      error: err,
    };
  }
}

export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    trackEvent({ name: 'auth_google_signin_start' });
    const auth = ensureAuth();

    // Get Google OAuth client ID from environment or Firebase config
    const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 
      'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'intuitiontrainer',
      path: 'auth',
    });

    const request = new AuthSession.AuthRequest({
      clientId: googleClientId,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.IdToken,
      redirectUri,
      state: AuthSession.AuthRequest.makeRandomState(),
    });

    const discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    };

    const result = await AuthSession.startAsync({
      authUrl: request.makeAuthUrl(discovery),
      returnUrl: redirectUri,
    });

    if (result.type === 'success' && result.params.id_token) {
      const provider = new OAuthProvider('google.com');
      const credential = provider.credential(result.params.id_token);
      
      const userCredential = await signInWithCredential(auth, credential);
      trackEvent({ name: 'auth_google_signin_success' });
      
      return {
        user: userCredential.user,
        error: null,
      };
    }

    throw new Error('Google sign-in was cancelled');
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    trackEvent({ name: 'auth_google_signin_error', params: { error: err.message } });
    
    if (err.message !== 'Google sign-in was cancelled') {
      Alert.alert('Sign In Error', err.message);
    }
    
    return {
      user: null,
      error: err,
    };
  }
}
