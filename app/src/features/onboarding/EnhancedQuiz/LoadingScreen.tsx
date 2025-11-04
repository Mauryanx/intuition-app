import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { useTheme } from '@/theme';

const { width, height } = Dimensions.get('window');

type LoadingScreenProps = {
  onComplete: () => void;
  loadingTime?: number; // Time in ms before auto-completing
};

export function LoadingScreen({ onComplete, loadingTime = 3500 }: LoadingScreenProps) {
  const theme = useTheme();
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  
  const loadingTexts = [
    "Analyzing your responses...",
    "Identifying your intuition patterns...",
    "Personalizing your experience...",
    "Creating your intuition profile...",
    "Tailoring your training plan..."
  ];
  
  // Cycle through loading texts
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Auto-complete after loadingTime
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, loadingTime);
    
    return () => clearTimeout(timer);
  }, [onComplete, loadingTime]);
  
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
          {/* Pulsing circle animation */}
          <MotiView
            from={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 1000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              loop: true,
              repeatReverse: true,
            }}
            style={styles.circleContainer}
          >
            <View style={styles.circle} />
          </MotiView>
          
          {/* Brain wave animation */}
          <MotiView
            from={{ width: width * 0.3 }}
            animate={{ width: width * 0.7 }}
            transition={{
              type: 'timing',
              duration: 2000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              loop: true,
              repeatReverse: true,
            }}
            style={[styles.brainWave, { backgroundColor: theme.colors.accent.primary }]}
          />
          
          {/* Loading text with fade transition */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 500,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            key={loadingTextIndex}
            style={styles.textContainer}
          >
            <Text style={[styles.loadingText, { color: theme.colors.text.primary }]}>
              {loadingTexts[loadingTextIndex]}
            </Text>
          </MotiView>
          
          {/* Progress dots */}
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((dot) => (
              <MotiView
                key={dot}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: 'timing',
                  duration: 600,
                  delay: dot * 300,
                  loop: true,
                  repeatReverse: false,
                }}
                style={[styles.dot, { backgroundColor: theme.colors.text.primary }]}
              />
            ))}
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 24,
  },
  circleContainer: {
    marginBottom: 40,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  brainWave: {
    height: 3,
    marginBottom: 50,
    borderRadius: 2,
  },
  textContainer: {
    marginBottom: 30,
    height: 30, // Fixed height to prevent layout shifts
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    opacity: 0.7,
  },
});
