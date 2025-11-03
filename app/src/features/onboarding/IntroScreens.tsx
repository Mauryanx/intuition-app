import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
  gradientColors?: string[];
};

export function IntroScreen({
  headline,
  subheadline,
  body,
  imageSource,
  onContinue,
  onSkip,
  gradientColors = ['#151B3D', '#2442A3'],
}: IntroScreenProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.headline, { color: theme.colors.text.primary }]}>
              {headline}
            </Text>
            <Text style={[styles.subheadline, { color: theme.colors.accent.primary }]}>
              {subheadline}
            </Text>
            <Text style={[styles.body, { color: theme.colors.text.secondary }]}>
              {body}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button label="Continue" onPress={onContinue} style={styles.continueButton} />
            {onSkip && (
              <Button label="Skip" variant="ghost" onPress={onSkip} style={styles.skipButton} />
            )}
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
    gradientColors: ['#151B3D', '#2442A3'],
  },
  {
    id: 'intuition-ai',
    headline: 'Your Uniquely Human Edge',
    subheadline: 'In an age of artificial intelligence, intuition remains our most powerful differentiator',
    body: 'AI excels at pattern recognition, but only humans make intuitive leaps that connect seemingly unrelated dots. This creative instinct—the ability to know without knowing how—is what sets us apart.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#11152B', '#421D57'],
  },
  {
    id: 'intuition-training',
    headline: 'Sharpen What Machines Can\'t Replicate',
    subheadline: 'Your intuition is a muscle that grows stronger with the right training',
    body: 'Elite performers across fields share one trait: finely-tuned intuition. Through targeted exercises, you can calibrate your gut instincts to make faster, more accurate decisions when it matters most.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#061824', '#104061'],
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
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    opacity: 0.9,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  headline: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  subheadline: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    letterSpacing: 0.2,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  continueButton: {
    marginBottom: 12,
    paddingVertical: 16,
  },
  skipButton: {
    paddingVertical: 12,
  },
});
