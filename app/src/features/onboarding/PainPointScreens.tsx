import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue } from 'react-native';

import { Button } from '@/components';
import { useTheme } from '@/theme';

const { width } = Dimensions.get('window');

type PainPointScreenProps = {
  headline: string;
  subheadline: string;
  body: string;
  imageSource: any;
  onContinue: () => void;
  onSkip?: () => void;
  gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

export function PainPointScreen({
  headline,
  subheadline,
  body,
  imageSource,
  onContinue,
  onSkip,
  gradientColors = ['#3D1515', '#A32424'] as readonly [ColorValue, ColorValue],
}: PainPointScreenProps) {
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
            <Button 
              label="Continue" 
              onPress={onContinue} 
              // Remove style prop as it's not supported
            />
            {onSkip && (
              <Button 
                label="Skip" 
                variant="ghost" 
                onPress={onSkip} 
                // Remove style prop as it's not supported
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export const painPointScreens = [
  {
    id: 'bad-decisions',
    headline: 'When Intuition Leads You Astray',
    subheadline: 'Bad decisions often stem from untrained intuition',
    body: 'We\'ve all experienced that sinking feeling after making a decision that felt right in the moment, but proved disastrous. Untrained intuition can be hijacked by biases, fears, and incomplete information—leading to choices we later regret.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#3D1515', '#A32424'] as readonly [ColorValue, ColorValue],
  },
  {
    id: 'anxiety-judgment',
    headline: 'Anxiety Clouds Your Inner Compass',
    subheadline: 'When fear speaks louder than intuition, clarity disappears',
    body: 'Anxiety and stress create mental noise that drowns out your intuitive signals. In critical moments, this interference can prevent you from accessing your most valuable insights, leaving you second-guessing even simple decisions.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#2B1F3D', '#5D2A7E'] as readonly [ColorValue, ColorValue],
  },
  {
    id: 'imagination-vs-clarity',
    headline: 'Imagination Masquerading as Insight',
    subheadline: 'The dangerous gap between wishful thinking and true intuition',
    body: 'Many confuse imagination or wishful thinking with genuine intuition. This dangerous misinterpretation leads to decisions based on what we want to be true rather than what our deeper wisdom is actually telling us.',
    imageSource: require('@/assets/overlays/halo.png'),
    gradientColors: ['#242C3D', '#2A4E7E'] as readonly [ColorValue, ColorValue],
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
    marginVertical: 40,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    maxWidth: 250,
    maxHeight: 250,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
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
});
