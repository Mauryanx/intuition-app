import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/theme';
import { personaCopy, type PersonaKey } from '../content';
import { Button } from '@/components';

const { width } = Dimensions.get('window');

type QuizResultsScreenProps = {
  persona: PersonaKey;
  onContinue: () => void;
};

export function QuizResultsScreen({ persona, onContinue }: QuizResultsScreenProps) {
  const theme = useTheme();
  const personaData = personaCopy[persona];
  
  // Define gradient colors based on persona
  const gradientColors = {
    seer: ['#2D3748', '#4A5568'],
    strategist: ['#2C5282', '#2B6CB0'],
    navigator: ['#2D3748', '#553C9A'],
  };

  // Define animation file based on persona
  const animationFile = {
    seer: require('@/assets/animations/insight.json'),
    strategist: require('@/assets/animations/strategy.json'),
    navigator: require('@/assets/animations/compass.json'),
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={gradientColors[persona]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 800,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            style={styles.animationContainer}
          >
            <LottieView
              source={animationFile[persona]}
              autoPlay
              loop
              style={styles.animation}
            />
          </MotiView>
          
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 400,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
          >
            <Text style={[styles.resultTitle, { color: theme.colors.text.primary }]}>
              Your Intuition Type
            </Text>
          </MotiView>
          
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 600,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
          >
            <BlurView intensity={15} tint="dark" style={styles.resultCard}>
              <Text style={[styles.personaTitle, { color: theme.colors.accent.primary }]}>
                {personaData.title}
              </Text>
              
              <Text style={[styles.personaSubtitle, { color: theme.colors.text.primary }]}>
                {personaData.subtitle}
              </Text>
              
              <View style={styles.divider} />
              
              <Text style={[styles.focusTitle, { color: theme.colors.text.secondary }]}>
                Your Training Focus
              </Text>
              
              {personaData.focus.map((item, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, translateX: -10 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: 'timing',
                    duration: 400,
                    delay: 800 + index * 200,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  }}
                  style={styles.focusItem}
                >
                  <View style={styles.bulletPoint} />
                  <Text style={[styles.focusText, { color: theme.colors.text.primary }]}>
                    {item}
                  </Text>
                </MotiView>
              ))}
            </BlurView>
          </MotiView>
          
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 1400,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            style={styles.description}
          >
            <Text style={[styles.descriptionText, { color: theme.colors.text.secondary }]}>
              Your intuition profile will help us customize your training experience.
              You'll receive exercises tailored to your specific intuitive strengths.
            </Text>
          </MotiView>
        </ScrollView>
        
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 600,
            delay: 1600,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }}
          style={styles.footer}
        >
          <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
            <Button
              label="Continue to Training Plan"
              onPress={onContinue}
            />
          </BlurView>
        </MotiView>
      </LinearGradient>
    </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 100,
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  animation: {
    width: width * 0.5,
    height: width * 0.5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resultCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  personaTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  personaSubtitle: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
  },
  focusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    opacity: 0.8,
  },
  focusItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    marginRight: 12,
  },
  focusText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  description: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.8,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  buttonBlur: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
  },
});
