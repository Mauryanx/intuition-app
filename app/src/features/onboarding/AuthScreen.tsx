import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export function formatAuthTitle(name?: string): string {
  if (name && name.trim().length > 0) {
    return `Welcome back, ${name.trim()}`;
  }
  return 'Welcome Back';
}

type AuthScreenProps = {
  onAppleSignIn: () => void;
  onGoogleSignIn: () => void;
  onSkip?: () => void;
};

export function AuthScreen({ onAppleSignIn, onGoogleSignIn, onSkip }: AuthScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Decorative background elements */}
        <View style={styles.decorativeContainer}>
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ type: 'timing', duration: 2000, loop: true, repeatReverse: true }}
            style={[styles.decorativeCircle, { top: 50, right: -50 }]}
          />
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ type: 'timing', duration: 2500, delay: 500, loop: true, repeatReverse: true }}
            style={[styles.decorativeCircle, { bottom: 100, left: -30 }]}
          />
        </View>

        <View style={styles.content}>
          {/* Logo/Icon Section */}
          <MotiView
            from={{ opacity: 0, scale: 0.5, rotate: '-10deg' }}
            animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 150,
            }}
            style={styles.logoContainer}
          >
            <View style={styles.logoCircle}>
              <Ionicons name="flash" size={40} color="#EF4444" />
            </View>
          </MotiView>

          {/* Header */}
          <MotiView
            from={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 800,
              easing: Easing.out(Easing.cubic),
            }}
            style={styles.headerContainer}
          >
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to sync your progress across devices and unlock your full training potential
            </Text>
          </MotiView>

          {/* Sign In Buttons */}
          <View style={styles.buttonContainer}>
            <MotiView
              from={{ opacity: 0, translateY: 30, scale: 0.9 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 200,
                delay: 200,
              }}
              style={styles.buttonWrapper}
            >
              <TouchableOpacity
                style={styles.appleButton}
                onPress={onAppleSignIn}
                activeOpacity={0.85}
              >
                <BlurView intensity={20} tint="dark" style={styles.buttonBlur}>
                  <View style={styles.buttonContent}>
                    <Ionicons name="logo-apple" size={22} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Continue with Apple</Text>
                  </View>
                </BlurView>
              </TouchableOpacity>
            </MotiView>

            <MotiView
              from={{ opacity: 0, translateY: 30, scale: 0.9 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 200,
                delay: 350,
              }}
              style={styles.buttonWrapper}
            >
              <TouchableOpacity
                style={styles.googleButton}
                onPress={onGoogleSignIn}
                activeOpacity={0.85}
              >
                <BlurView intensity={20} tint="light" style={styles.buttonBlur}>
                  <View style={styles.buttonContent}>
                    <Ionicons name="logo-google" size={22} color="#4285F4" />
                    <Text style={[styles.buttonText, styles.googleButtonText]}>
                      Continue with Google
                    </Text>
                  </View>
                </BlurView>
              </TouchableOpacity>
            </MotiView>
          </View>

          {/* Divider */}
          {onSkip && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 600, delay: 500 }}
              style={styles.dividerContainer}
            >
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </MotiView>
          )}

          {/* Skip Button */}
          {onSkip && (
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 600, delay: 600 }}
              style={styles.skipContainer}
            >
              <TouchableOpacity onPress={onSkip} activeOpacity={0.7} style={styles.skipButton}>
                <Text style={styles.skipText}>Continue as Guest</Text>
              </TouchableOpacity>
            </MotiView>
          )}

          {/* Privacy Footer */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 600, delay: 750 }}
            style={styles.privacyContainer}
          >
            <Text style={styles.privacyText}>
              By continuing, you agree to our{' '}
              <Text style={styles.privacyLink}>Terms of Service</Text> and{' '}
              <Text style={styles.privacyLink}>Privacy Policy</Text>
            </Text>
          </MotiView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  decorativeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#EF4444',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
    maxWidth: width * 0.85,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
    gap: 16,
  },
  buttonWrapper: {
    width: '100%',
  },
  appleButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  googleButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  googleButtonText: {
    color: '#1F2937',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '500',
  },
  skipContainer: {
    width: '100%',
    marginBottom: 32,
  },
  skipButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  privacyContainer: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 18,
  },
  privacyLink: {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
