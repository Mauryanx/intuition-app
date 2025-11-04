import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue } from 'react-native';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';

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
