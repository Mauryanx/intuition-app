import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { useTheme } from '@/theme';

const { width, height } = Dimensions.get('window');

type AuthScreenProps = {
  onAppleSignIn: () => void;
  onGoogleSignIn: () => void;
  onSkip?: () => void; // Optional skip function
};

export function AuthScreen({ onAppleSignIn, onGoogleSignIn, onSkip }: AuthScreenProps) {
  const theme = useTheme();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1A202C', '#2D3748']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 800,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            style={styles.headerContainer}
          >
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Login
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
              Sign in to save your progress and access your personalized training plan
            </Text>
          </MotiView>
          
          <View style={styles.buttonContainer}>
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 600,
                delay: 300,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              }}
              style={styles.buttonWrapper}
            >
              <BlurView intensity={15} tint="dark" style={styles.blurContainer}>
                <TouchableOpacity 
                  style={styles.signInButton}
                  onPress={onAppleSignIn}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconContainer}>
                    {/* Apple logo placeholder */}
                    <View style={[styles.icon, { backgroundColor: 'white' }]}>
                      {/* Replace with actual Apple logo */}
                    </View>
                  </View>
                  <Text style={styles.buttonText}>Sign in with Apple</Text>
                </TouchableOpacity>
              </BlurView>
            </MotiView>
            
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 600,
                delay: 450,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              }}
              style={styles.buttonWrapper}
            >
              <BlurView intensity={15} tint="dark" style={styles.blurContainer}>
                <TouchableOpacity 
                  style={styles.signInButton}
                  onPress={onGoogleSignIn}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconContainer}>
                    {/* Google logo placeholder */}
                    <View style={[styles.icon, { backgroundColor: 'white' }]}>
                      {/* Replace with actual Google logo */}
                    </View>
                  </View>
                  <Text style={styles.buttonText}>Sign in with Google</Text>
                </TouchableOpacity>
              </BlurView>
            </MotiView>
          </View>
          
          {onSkip && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'timing',
                duration: 600,
                delay: 600,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              }}
              style={styles.skipContainer}
            >
              <TouchableOpacity 
                onPress={onSkip}
                activeOpacity={0.7}
                style={styles.skipButton}
              >
                <Text style={[styles.skipText, { color: theme.colors.text.secondary }]}>
                  Continue without signing in
                </Text>
              </TouchableOpacity>
            </MotiView>
          )}
          
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 750,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            style={styles.privacyContainer}
          >
            <Text style={[styles.privacyText, { color: theme.colors.text.secondary }]}>
              By signing in, you agree to our Terms of Service and Privacy Policy
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.8,
    maxWidth: '80%',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  buttonWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  blurContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  skipContainer: {
    marginBottom: 20,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    opacity: 0.7,
  },
  privacyContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
    paddingHorizontal: 40,
  },
});
