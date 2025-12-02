import React from 'react';
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
import { useTheme } from '@/theme';
import { personaCopy, type PersonaKey } from '../content';
import { Button } from '@/components';

const { width, height } = Dimensions.get('window');

type TrainingFocusScreenProps = {
  persona: PersonaKey;
  onContinue: () => void;
};

export function TrainingFocusScreen({ persona, onContinue }: TrainingFocusScreenProps) {
  const theme = useTheme();
  const personaData = personaCopy[persona];
  
  // Define gradient colors based on persona
  const gradientColors = {
    seer: ['#2D3748', '#4A5568'],
    strategist: ['#2C5282', '#2B6CB0'],
    navigator: ['#2D3748', '#553C9A'],
  };

  // Define training descriptions based on persona
  const trainingDescriptions = {
    seer: [
      "Pattern recognition exercises to enhance your ability to spot connections others miss.",
      "Creative association drills to strengthen your ability to make intuitive leaps.",
      "Signal detection training to help you identify meaningful patterns in noise."
    ],
    strategist: [
      "Decision-making simulations to improve your ability to make quick, effective choices.",
      "Scenario planning exercises to help you anticipate outcomes and adapt strategies.",
      "Trade-off analysis training to enhance your ability to weigh options under pressure."
    ],
    navigator: [
      "Emotional intelligence exercises to sharpen your ability to read people and situations.",
      "Timing calibration drills to help you know when to act and when to wait.",
      "Contextual awareness training to enhance your ability to adapt to changing environments."
    ]
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
              Your Training Plan
            </Text>
          </MotiView>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
            <BlurView intensity={20} tint="dark" style={styles.focusCard}>
              <Text style={[styles.focusTitle, { color: theme.colors.accent.primary }]}>
                Training Focus for {personaData.title}
              </Text>
              
              <View style={styles.divider} />
              
              {personaData.focus.map((item, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, translateX: -10 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: 'timing',
                    duration: 400,
                    delay: 600 + index * 200,
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
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 800,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
          >
            <BlurView intensity={15} tint="dark" style={styles.trainingCard}>
              <Text style={[styles.trainingTitle, { color: theme.colors.text.secondary }]}>
                Your Personalized Training
              </Text>
              
              {trainingDescriptions[persona].map((item, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'timing',
                    duration: 400,
                    delay: 1000 + index * 200,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  }}
                  style={styles.trainingItem}
                >
                  <View style={styles.numberCircle}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.trainingText, { color: theme.colors.text.primary }]}>
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
              delay: 1600,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            style={styles.description}
          >
            <Text style={[styles.descriptionText, { color: theme.colors.text.secondary }]}>
              Your intuition profile will help us customize your training experience.
              You'll receive exercises tailored to your specific intuitive strengths.
            </Text>
          </MotiView>
          
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 1800,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
            style={styles.buttonContainer}
          >
            <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
              <Button
                label="Continue to Training"
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
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.95,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  focusCard: {
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  focusTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 28,
    width: '60%',
    alignSelf: 'center',
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
  trainingCard: {
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  trainingTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 24,
    opacity: 0.85,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  trainingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  numberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  trainingText: {
    fontSize: 16,
    lineHeight: 24,
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


