import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue } from 'react-native';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';

import { Button } from '@/components';
import { useTheme } from '@/theme';

const { width } = Dimensions.get('window');

type IntroScreenProps = {
  headline: string;
  subheadline: string;
  body: string;
  imageSource: any;
  onContinue: () => void;
  onSkip?: () => void;
  gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

export function IntroScreen({
  headline,
  subheadline,
  body,
  imageSource,
  onContinue,
  onSkip,
  gradientColors = ['#151B3D', '#2442A3'] as readonly [ColorValue, ColorValue],
}: IntroScreenProps) {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      >
        {/* Subtle pattern overlay */}
        <View style={styles.patternOverlay} />
        
        <View style={styles.contentContainer}>
          {/* Top accent line */}
          <View style={styles.accentLine} />
          
          <View style={styles.textContainer}>
            <Text style={[styles.kicker, { color: theme.colors.accent.primary }]}>
              INTUITION TRAINER
            </Text>
            <Text style={[styles.headline, { color: theme.colors.text.primary }]}>
              {headline}
            </Text>
            <View style={styles.divider} />
            <Text style={[styles.subheadline, { color: theme.colors.accent.primary }]}>
              {subheadline}
            </Text>
            <Text style={[styles.body, { color: theme.colors.text.secondary }]}>
              {body}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
              <Button 
                label="Continue" 
                onPress={onContinue}
              />
              {onSkip && (
                <Button 
                  label="Skip" 
                  variant="ghost" 
                  onPress={onSkip}
                />
              )}
            </BlurView>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// Content for each intro screen
export const introScreens = [
  {
    id: 'intuition-power',
    headline: 'The Last Leap That Changes Everything',
    subheadline: 'Behind every world-changing innovation lies an intuitive spark logic couldn\'t predict',
    body: 'Einstein visualized riding on a beam of light before writing relativity. Jobs knew what people wanted before they did. Intuition bridges the gap between what we know and what we discover.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#151B3D', '#2442A3'] as readonly [ColorValue, ColorValue],
  },
  {
    id: 'intuition-ai',
    headline: 'Your Uniquely Human Edge',
    subheadline: 'In an age of artificial intelligence, intuition remains our most powerful differentiator',
    body: 'AI excels at pattern recognition, but only humans make intuitive leaps that connect seemingly unrelated dots. This creative instinct—the ability to know without knowing how—is what sets us apart.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#11152B', '#421D57'] as readonly [ColorValue, ColorValue],
  },
  {
    id: 'intuition-training',
    headline: 'Sharpen What Machines Can\'t Replicate',
    subheadline: 'Your intuition is a muscle that grows stronger with the right training',
    body: 'Elite performers across fields share one trait: finely-tuned intuition. Through targeted exercises, you can calibrate your gut instincts to make faster, more accurate decisions when it matters most.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#061824', '#104061'] as readonly [ColorValue, ColorValue],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  },
  contentContainer: {
    flex: 1,
    padding: 32,
    justifyContent: 'space-between',
  },
  accentLine: {
    width: 60,
    height: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  kicker: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 16,
    opacity: 0.7,
  },
  headline: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 16,
    letterSpacing: 0.5,
    lineHeight: 44,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
    marginBottom: 24,
  },
  subheadline: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
    letterSpacing: 0.2,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'left',
    opacity: 0.8,
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 40,
    alignSelf: 'stretch',
  },
  buttonBlur: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
  },
});
