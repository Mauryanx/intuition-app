import { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components';
import { CinematicIntro } from './CinematicIntro';
import { WhyView } from './CalAI/WhyView';
import { OnboardingQuiz } from './CalAI/OnboardingQuiz';
import { AnalysisView } from './CalAI/AnalysisView';
import { GoalSelectView } from './CalAI/GoalSelectView';
import { ReviewScreenView } from './CalAI/ReviewScreenView';
import { FinalCalculateView } from './CalAI/FinalCalculateView';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingFlow({ navigation }: Props) {
  // New Flow State:
  // 0: CinematicIntro (Visual Hook)
  // 1: WhyView (Carousel)
  // 2: OnboardingQuiz (General Questions)
  // 3: GoalSelectView (Specific Goals)
  // 4: AnalysisView (Calculation + Graph)
  // 5: ReviewScreenView (Social Proof)
  // 6: FinalCalculateView (Letter)
  const [flowStep, setFlowStep] = useState(0);

  const handleCinematicComplete = useCallback(() => {
    console.log('OnboardingFlow handleCinematicComplete called, setting flowStep to 1');
    setFlowStep(1);
  }, []);

  const handleWhyComplete = useCallback(() => {
    setFlowStep(2);
  }, []);

  const handleQuizComplete = useCallback(() => {
    setFlowStep(3);
  }, []);

  const handleGoalsComplete = useCallback(() => {
    setFlowStep(4);
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setFlowStep(5);
  }, []);

  const handleReviewsComplete = useCallback(() => {
    setFlowStep(6);
  }, []);

  const handleFinalComplete = useCallback(() => {
    // End of CalAI flow -> Paywall
    // For now, assume Paywall is handled by navigation to 'Paywall' or 'Main'
    navigation.replace('Paywall'); // Or 'Main' if no paywall logic yet
  }, [navigation]);

  return (
    <View style={styles.container}>
      {flowStep === 0 && (
        <CinematicIntro onComplete={handleCinematicComplete} />
      )}

      {flowStep === 1 && (
        <WhyView onComplete={handleWhyComplete} />
      )}
      
      {flowStep === 2 && (
        <OnboardingQuiz onComplete={handleQuizComplete} />
      )}

      {flowStep === 3 && (
        <GoalSelectView onComplete={handleGoalsComplete} />
      )}

      {flowStep === 4 && (
        <AnalysisView onComplete={handleAnalysisComplete} />
      )}

      {flowStep === 5 && (
        <ReviewScreenView onComplete={handleReviewsComplete} />
      )}

      {flowStep === 6 && (
        <FinalCalculateView onComplete={handleFinalComplete} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
