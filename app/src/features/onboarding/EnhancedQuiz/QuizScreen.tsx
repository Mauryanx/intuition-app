import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Easing as MotiEasing } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { quizQuestions, type PersonaKey } from '../content';
import { Button } from '@/components';

const { width, height } = Dimensions.get('window');

type QuizScreenProps = {
  onComplete: (selections: Record<string, PersonaKey>) => void;
  onBack?: () => void;
};

export function QuizScreen({ onComplete, onBack }: QuizScreenProps) {
  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, PersonaKey>>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedPersona = currentQuestion ? selections[currentQuestion.id] : undefined;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  
  // Update progress bar animation
  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: (currentQuestionIndex + 1) / quizQuestions.length,
      duration: 600,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);
  
  const handleSelect = (persona: PersonaKey) => {
    if (isTransitioning) return;
    
    setSelections((prev) => ({
      ...prev,
      [currentQuestion.id]: persona,
    }));
  };
  
  const handleNext = () => {
    if (isTransitioning || !selectedPersona) return;
    
    if (isLastQuestion) {
      onComplete(selections);
      return;
    }
    
    setIsTransitioning(true);
    setDirection('forward');
    
    // Fade out current question
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Change question
      setCurrentQuestionIndex((prev) => prev + 1);
      
      // Fade in new question
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
      });
    });
  };
  
  const handleBack = () => {
    if (isTransitioning || currentQuestionIndex === 0) {
      if (onBack) onBack();
      return;
    }
    
    setIsTransitioning(true);
    setDirection('backward');
    
    // Fade out current question
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Change question
      setCurrentQuestionIndex((prev) => prev - 1);
      
      // Fade in new question
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
      });
    });
  };
  
  // Gradient colors for the background
  const gradientColors = ['#0F172A', '#1E293B'];
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              { 
                width: progressAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: theme.colors.accent.primary,
              },
            ]}
          />
        </View>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={[styles.backButtonText, { color: theme.colors.text.secondary }]}>
              ← Back
            </Text>
          </TouchableOpacity>
          
          <Text style={[styles.questionCounter, { color: theme.colors.text.secondary }]}>
            {`${currentQuestionIndex + 1} of ${quizQuestions.length}`}
          </Text>
        </View>
        
        <Animated.View 
          style={[
            styles.contentContainer,
            { opacity: fadeAnim }
          ]}
        >
          {currentQuestion && (
            <>
              <MotiView
                from={{ 
                  opacity: 0,
                  transform: [{ translateX: direction === 'forward' ? 50 : -50 }]
                }}
                animate={{ 
                  opacity: 1,
                  transform: [{ translateX: 0 }]
                }}
                transition={{
                  type: 'timing',
                  duration: 500,
                  easing: MotiEasing.bezier(0.25, 0.1, 0.25, 1),
                }}
                style={styles.questionContainer}
              >
                <Text style={[styles.questionText, { color: theme.colors.text.primary }]}>
                  {currentQuestion.prompt}
                </Text>
              </MotiView>
              
              <View style={styles.choicesContainer}>
                {currentQuestion.choices.map((choice, index) => {
                  const isSelected = choice.persona === selectedPersona;
                  
                  return (
                    <MotiView
                      key={choice.id}
                      from={{ 
                        opacity: 0,
                        transform: [{ translateY: 30 }]
                      }}
                      animate={{ 
                        opacity: 1,
                        transform: [{ translateY: 0 }]
                      }}
                      transition={{
                        type: 'timing',
                        duration: 400,
                        delay: 100 + index * 100,
                        easing: MotiEasing.bezier(0.25, 0.1, 0.25, 1),
                      }}
                      style={styles.choiceWrapper}
                    >
                      <TouchableOpacity
                        style={[
                          styles.choiceButton,
                          isSelected && { 
                            borderColor: theme.colors.accent.primary,
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          },
                        ]}
                        onPress={() => handleSelect(choice.persona)}
                        activeOpacity={0.8}
                      >
                        <BlurView intensity={15} tint="dark" style={styles.choiceBlur}>
                          <Text 
                            style={[
                              styles.choiceText, 
                              { color: theme.colors.text.primary },
                              isSelected && { color: theme.colors.accent.primary }
                            ]}
                          >
                            {choice.label}
                          </Text>
                        </BlurView>
                      </TouchableOpacity>
                    </MotiView>
                  );
                })}
              </View>
            </>
          )}
        </Animated.View>
        
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: selectedPersona ? 1 : 0.5, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 300,
            easing: MotiEasing.bezier(0.25, 0.1, 0.25, 1),
          }}
          style={styles.footer}
        >
          <BlurView intensity={30} tint="dark" style={styles.buttonBlur}>
            <Button
              label={isLastQuestion ? "See My Results" : "Continue"}
              onPress={handleNext}
              disabled={!selectedPersona}
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
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  questionContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  questionText: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: 0.3,
  },
  choicesContainer: {
    marginBottom: 20,
  },
  choiceWrapper: {
    marginBottom: 16,
  },
  choiceButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  choiceBlur: {
    padding: 20,
  },
  choiceText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
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
