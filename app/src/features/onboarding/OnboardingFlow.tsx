import { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components';
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
  // 0: WhyView (Carousel)
  // 1: OnboardingQuiz (General Questions)
  // 2: GoalSelectView (Specific Goals)
  // 3: AnalysisView (Calculation + Graph)
  // 4: ReviewScreenView (Social Proof)
  // 5: FinalCalculateView (Letter)
  const [flowStep, setFlowStep] = useState(0);

  const handleWhyComplete = useCallback(() => {
    setFlowStep(1);
  }, []);

  const handleQuizComplete = useCallback(() => {
    setFlowStep(2);
  }, []);

  const handleGoalsComplete = useCallback(() => {
    setFlowStep(3);
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setFlowStep(4);
  }, []);

  const handleReviewsComplete = useCallback(() => {
    setFlowStep(5);
  }, []);

  const handleFinalComplete = useCallback(() => {
    // End of CalAI flow -> Paywall
    // For now, assume Paywall is handled by navigation to 'Paywall' or 'Main'
    navigation.replace('Paywall'); // Or 'Main' if no paywall logic yet
  }, [navigation]);

  return (
    <View style={styles.container}>
      {flowStep === 0 && (
        <WhyView onComplete={handleWhyComplete} />
      )}
      
      {flowStep === 1 && (
        <OnboardingQuiz onComplete={handleQuizComplete} />
      )}

      {flowStep === 2 && (
        <GoalSelectView onComplete={handleGoalsComplete} />
      )}

      {flowStep === 3 && (
        <AnalysisView onComplete={handleAnalysisComplete} />
      )}

      {flowStep === 4 && (
        <ReviewScreenView onComplete={handleReviewsComplete} />
      )}

      {flowStep === 5 && (
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
