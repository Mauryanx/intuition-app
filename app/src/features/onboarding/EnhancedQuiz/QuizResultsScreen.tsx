import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/theme';
import { personaCopy, type PersonaKey } from '../content';
import { Button } from '@/components';

const { width, height } = Dimensions.get('window');

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={gradientColors[persona]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 800,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
          >
            <Text style={[styles.resultTitle, { color: theme.colors.text.primary }]}>
              Your Intuition Type
            </Text>
          </MotiView>
        </View>
        
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
              delay: 600,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
          >
            <BlurView intensity={20} tint="dark" style={styles.resultCard}>
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
          
          {/* Continue button moved inside the scroll view */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 1600,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            style={styles.buttonContainer}
          >
            <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
              <Button
                label="Continue to Training Plan"
                onPress={onContinue}
              />
            </BlurView>
          </MotiView>
        </ScrollView>
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
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  animation: {
    width: width * 0.4,
    height: width * 0.4,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.95,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  resultCard: {
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  personaTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  personaSubtitle: {
    fontSize: 19,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.9,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 28,
    width: '60%',
    alignSelf: 'center',
  },
  focusTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 20,
    opacity: 0.85,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  focusItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    marginRight: 14,
  },
  focusText: {
    fontSize: 17,
    lineHeight: 26,
    flex: 1,
    fontWeight: '500',
  },
  description: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    opacity: 0.85,
    fontWeight: '500',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  buttonBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
});
