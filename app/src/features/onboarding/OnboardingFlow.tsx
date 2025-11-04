import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
// Removed Superwall import

import { Button, Card, ProgressDots, Screen } from '@/components';
import { IntroScreen, introScreens } from './IntroScreens';
import { PainPointScreen, painPointScreens } from './PainPointScreens';
import { useTheme } from '@/theme';
import { t } from '@/localization';
import { trackEvent } from '@/services/analytics';
import {
  derivePersona,
  personaCopy,
  quizQuestions,
  reflectionOptions,
  scienceCards,
  type PersonaKey,
} from './content';
import { useProfileStore } from '@/state/profile';
import type { RootStackParamList } from '@/navigation/RootNavigator';

const ONBOARDING_STEPS = [
  { id: 'welcome' },
  { id: 'intro1' },
  { id: 'intro2' },
  { id: 'intro3' },
  { id: 'pain1' },
  { id: 'pain2' },
  { id: 'pain3' },
  { id: 'science' },
  { id: 'reflection' },
  { id: 'quiz' },
  { id: 'plan' },
  { id: 'paywall' },
] as const;

type OnboardingStep = (typeof ONBOARDING_STEPS)[number]['id'];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingFlow({ navigation }: Props) {
  const theme = useTheme();
  const [stepIndex, setStepIndex] = useState(0);
  const [reflectionId, setReflectionId] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelections, setQuizSelections] = useState<Record<string, PersonaKey>>({});
  const [isPaywallLoading, setIsPaywallLoading] = useState(false);
  const { setPersonaData } = useProfileStore();

  const activeStep: OnboardingStep = ONBOARDING_STEPS[stepIndex]?.id ?? 'welcome';
  const totalSteps = ONBOARDING_STEPS.length;
  const quizQuestion = quizQuestions[quizIndex];
  const hasQuizCompleted = Object.keys(quizSelections).length === quizQuestions.length;

  const persona = useMemo(() => {
    if (!hasQuizCompleted) {
      return null;
    }

    return derivePersona(reflectionId, quizSelections);
  }, [hasQuizCompleted, quizSelections, reflectionId]);

  useEffect(() => {
    trackEvent({ name: 'onboarding_step_view', params: { step: activeStep } });
  }, [activeStep]);

  useEffect(() => {
    if (persona) {
      setPersonaData({ persona, reflectionId, quizSelections });
    }
  }, [persona, quizSelections, reflectionId, setPersonaData]);

  const goToNextStep = useCallback(() => {
    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const goToPreviousStep = useCallback(() => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleHeroContinue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'welcome' } });
    goToNextStep();
  }, [goToNextStep]);
  
  const handleIntro1Continue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'intro1' } });
    goToNextStep();
  }, [goToNextStep]);
  
  const handleIntro2Continue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'intro2' } });
    goToNextStep();
  }, [goToNextStep]);
  
  const handleIntro3Continue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'intro3' } });
    goToNextStep();
  }, [goToNextStep]);
  
  const handleSkipIntro = useCallback(() => {
    trackEvent({ name: 'onboarding_skip', params: { step: 'intro' } });
    setStepIndex(ONBOARDING_STEPS.findIndex(step => step.id === 'pain1'));
  }, []);
  
  const handlePain1Continue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'pain1' } });
    goToNextStep();
  }, [goToNextStep]);
  
  const handlePain2Continue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'pain2' } });
    goToNextStep();
  }, [goToNextStep]);
  
  const handlePain3Continue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'pain3' } });
    goToNextStep();
  }, [goToNextStep]);
  
  const handleSkipPain = useCallback(() => {
    trackEvent({ name: 'onboarding_skip', params: { step: 'pain' } });
    setStepIndex(ONBOARDING_STEPS.findIndex(step => step.id === 'science'));
  }, []);

  const handleScienceContinue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'science' } });
    goToNextStep();
  }, [goToNextStep]);

  const handleReflectionSelect = useCallback((id: string) => {
    Haptics.selectionAsync().catch(() => undefined);
    setReflectionId(id);
  }, []);

  const handleReflectionContinue = useCallback(() => {
    if (!reflectionId) {
      return;
    }
    trackEvent({
      name: 'onboarding_continue',
      params: { step: 'reflection', reflectionId },
    });
    goToNextStep();
  }, [goToNextStep, reflectionId]);

  const handleQuizChoice = useCallback(
    (personaKey: PersonaKey) => {
      if (!quizQuestion) {
        return;
      }
      Haptics.selectionAsync().catch(() => undefined);
      setQuizSelections((prev) => ({ ...prev, [quizQuestion.id]: personaKey }));
    },
    [quizQuestion],
  );

  const handleQuizContinue = useCallback(() => {
    if (!quizQuestion) {
      return;
    }
    const answeredPersona = quizSelections[quizQuestion.id];
    if (!answeredPersona) {
      return;
    }

    trackEvent({
      name: 'onboarding_continue',
      params: { step: 'quiz', questionId: quizQuestion.id, persona: answeredPersona },
    });

    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      return;
    }

    goToNextStep();
  }, [goToNextStep, quizIndex, quizQuestion, quizSelections]);

  const handlePlanContinue = useCallback(() => {
    trackEvent({ name: 'onboarding_continue', params: { step: 'plan', persona } });
    goToNextStep();
  }, [goToNextStep, persona]);

  const handleComplete = useCallback(() => {
    trackEvent({ name: 'onboarding_complete' });
    navigation.replace('Main');
  }, [navigation]);

  const handleTriggerPaywall = useCallback(() => {
    trackEvent({ name: 'paywall_trigger', params: { placement: 'end_of_funnel' } });
    // Simply proceed to the main app, skipping the paywall
    handleComplete();
  }, [handleComplete]);

  const handleSkipPaywall = useCallback(() => {
    trackEvent({ name: 'paywall_skipped' });
    handleComplete();
  }, [handleComplete]);

  return (
    <Screen>
      {activeStep === 'welcome' ? (
        <HeroStep onContinue={handleHeroContinue} />
      ) : activeStep === 'intro1' ? (
        <IntroScreen 
          {...introScreens[0]}
          onContinue={handleIntro1Continue}
          onSkip={handleSkipIntro}
        />
      ) : activeStep === 'intro2' ? (
        <IntroScreen 
          {...introScreens[1]}
          onContinue={handleIntro2Continue}
          onSkip={handleSkipIntro}
        />
      ) : activeStep === 'intro3' ? (
        <IntroScreen 
          {...introScreens[2]}
          onContinue={handleIntro3Continue}
        />
      ) : activeStep === 'pain1' ? (
        <PainPointScreen 
          {...painPointScreens[0]}
          onContinue={handlePain1Continue}
          onSkip={handleSkipPain}
        />
      ) : activeStep === 'pain2' ? (
        <PainPointScreen 
          {...painPointScreens[1]}
          onContinue={handlePain2Continue}
          onSkip={handleSkipPain}
        />
      ) : activeStep === 'pain3' ? (
        <PainPointScreen 
          {...painPointScreens[2]}
          onContinue={handlePain3Continue}
        />
      ) : (
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { padding: theme.spacing.lg }]}
          style={{ backgroundColor: theme.colors.background.primary }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progressWrapper}>
            <ProgressDots total={totalSteps} activeIndex={stepIndex} />
          </View>
          {activeStep === 'science' ? (
            <ScienceStep onContinue={handleScienceContinue} />
          ) : null}
          {activeStep === 'reflection' ? (
            <ReflectionStep
              activeId={reflectionId}
              onSelect={handleReflectionSelect}
              onBack={goToPreviousStep}
              onContinue={handleReflectionContinue}
            />
          ) : null}
          {activeStep === 'quiz' && quizQuestion ? (
            <QuizStep
              questionIndex={quizIndex}
              questionCount={quizQuestions.length}
              question={quizQuestion}
              selectedPersona={quizSelections[quizQuestion.id]}
              onSelect={handleQuizChoice}
              onBack={() => {
                if (quizIndex === 0) {
                  goToPreviousStep();
                  return;
                }
                setQuizIndex((prev) => Math.max(prev - 1, 0));
              }}
              onContinue={handleQuizContinue}
            />
          ) : null}
          {activeStep === 'plan' ? (
            <PlanStep
              persona={persona}
              onBack={goToPreviousStep}
              onContinue={handlePlanContinue}
            />
          ) : null}
          {activeStep === 'paywall' ? (
            <PaywallStep
              persona={persona}
              isLoading={isPaywallLoading}
              onTrigger={handleTriggerPaywall}
              onSkip={handleSkipPaywall}
              onBack={goToPreviousStep}
            />
          ) : null}
        </ScrollView>
      )}
    </Screen>
  );
}

type HeroStepProps = {
  onContinue: () => void;
};

function HeroStep({ onContinue }: HeroStepProps) {
  const theme = useTheme();
  return (
    <View style={styles.heroContainer}>
      {/* Background Image */}
      <Image 
        source={require('@/assets/backgrounds/nebula.png')} 
        style={styles.heroBackground} 
        resizeMode="cover"
      />
      
      {/* Overlay for better text readability */}
      <View style={styles.heroOverlay} />
      
      {/* Content */}
      <View style={styles.heroContent}>
        <View style={styles.heroHeader}>
          <Text style={[styles.kicker, { color: theme.colors.accent.primary }]}>
            Welcome to
          </Text>
          <Text
            style={[
              styles.heroTitle,
              { color: theme.colors.text.primary },
            ]}
          >
            Intuition Trainer
          </Text>
        </View>
        
        <View style={styles.heroBody}>
          <Text
            style={[
              styles.heroTagline,
              { color: theme.colors.text.primary },
            ]}
          >
            {t('onboarding.heroTitle')}
          </Text>
          <Text
            style={[
              styles.bodyLarge,
              { color: theme.colors.text.secondary, marginTop: theme.spacing.md },
            ]}
          >
            {t('onboarding.heroBody')}
          </Text>
        </View>
        
        {/* Visual element */}
        <Image 
          source={require('@/assets/overlays/halo.png')} 
          style={styles.heroDecoration} 
          resizeMode="contain"
        />
        
        <View style={styles.heroActions}>
          <Button 
            label={t('onboarding.heroCta')} 
            onPress={onContinue}
            // Remove style prop as it's not supported by Button component
          />
        </View>
      </View>
    </View>
  );
}

type ScienceStepProps = {
  onContinue: () => void;
};

function ScienceStep({ onContinue }: ScienceStepProps) {
  const theme = useTheme();
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        {t('onboarding.scienceTitle')}
      </Text>
      <Text
        style={[
          styles.bodyLarge,
          { color: theme.colors.text.secondary, marginBottom: theme.spacing.lg },
        ]}
      >
        {t('onboarding.scienceLead')}
      </Text>
      <View style={styles.cardStack}>
        {scienceCards.map((card) => (
          <Card key={card.id} style={styles.infoCard}>
            <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
              {card.title}
            </Text>
            <Text style={[styles.cardBody, { color: theme.colors.text.secondary }]}>
              {card.body}
            </Text>
          </Card>
        ))}
      </View>
      <View style={{ marginTop: theme.spacing.xl }}>
        <Button label={t('common.continue')} onPress={onContinue} />
      </View>
    </View>
  );
}

type ReflectionStepProps = {
  activeId: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

function ReflectionStep({ activeId, onSelect, onBack, onContinue }: ReflectionStepProps) {
  const theme = useTheme();
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        {t('onboarding.reflectionTitle')}
      </Text>
      <Text
        style={[
          styles.bodyLarge,
          { color: theme.colors.text.secondary, marginBottom: theme.spacing.lg },
        ]}
      >
        {t('onboarding.reflectionLead')}
      </Text>
      <View style={styles.cardStack}>
        {reflectionOptions.map((option) => {
          const isActive = option.id === activeId;
          return (
            <Card
              key={option.id}
              style={[
                styles.selectCard,
                isActive ? { borderColor: theme.colors.accent.primary } : null,
              ]}
              onPress={() => onSelect(option.id)}
            >
              <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
                {option.label}
              </Text>
              <Text style={[styles.cardBody, { color: theme.colors.text.secondary }]}>
                {' '}
                {option.description}{' '}
              </Text>
            </Card>
          );
        })}
      </View>
      <View style={styles.stepActions}>
        <Button label={t('common.back')} variant="ghost" onPress={onBack} />
        <Button label={t('common.continue')} onPress={onContinue} disabled={!activeId} />
      </View>
    </View>
  );
}

type QuizStepProps = {
  questionIndex: number;
  questionCount: number;
  question: (typeof quizQuestions)[number];
  selectedPersona?: PersonaKey;
  onSelect: (persona: PersonaKey) => void;
  onBack: () => void;
  onContinue: () => void;
};

function QuizStep({
  questionIndex,
  questionCount,
  question,
  selectedPersona,
  onSelect,
  onBack,
  onContinue,
}: QuizStepProps) {
  const theme = useTheme();
  const isLast = questionIndex === questionCount - 1;
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        {t('onboarding.quizTitle')}
      </Text>
      <Text style={[styles.quizCounter, { color: theme.colors.text.muted }]}>
        {`Question ${questionIndex + 1} of ${questionCount}`}
      </Text>
      <Text
        style={[
          styles.bodyLarge,
          { color: theme.colors.text.primary, marginBottom: theme.spacing.md },
        ]}
      >
        {question.prompt}
      </Text>
      <View style={styles.cardStack}>
        {question.choices.map((choice) => {
          const isActive = choice.persona === selectedPersona;
          return (
            <Card
              key={choice.id}
              style={[
                styles.selectCard,
                isActive ? { borderColor: theme.colors.accent.secondary } : null,
              ]}
              onPress={() => onSelect(choice.persona)}
            >
              <Text style={[styles.cardBody, { color: theme.colors.text.primary }]}>
                {choice.label}
              </Text>
            </Card>
          );
        })}
      </View>
      <View style={styles.stepActions}>
        <Button label={t('common.back')} variant="ghost" onPress={onBack} />
        <Button
          label={isLast ? t('onboarding.quizReveal') : t('onboarding.quizNext')}
          onPress={onContinue}
          disabled={!selectedPersona}
        />
      </View>
    </View>
  );
}

type PlanStepProps = {
  persona: PersonaKey | null;
  onBack: () => void;
  onContinue: () => void;
};

function PlanStep({ persona, onBack, onContinue }: PlanStepProps) {
  const theme = useTheme();
  if (!persona) {
    return (
      <View style={styles.stepContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          {t('onboarding.planIncompleteTitle')}
        </Text>
        <Text
          style={[
            styles.bodyLarge,
            { color: theme.colors.text.secondary, marginBottom: theme.spacing.lg },
          ]}
        >
          {t('onboarding.planIncompleteBody')}
        </Text>
        <Button label={t('common.back')} variant="ghost" onPress={onBack} />
      </View>
    );
  }

  const personaData = personaCopy[persona];

  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        {t('onboarding.planTitle')}
      </Text>
      <Text
        style={[
          styles.bodyLarge,
          { color: theme.colors.text.secondary, marginBottom: theme.spacing.md },
        ]}
      >
        {personaData.subtitle}
      </Text>
      <Card style={styles.planCard}>
        <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
          {personaData.title}
        </Text>
        <View style={{ marginTop: theme.spacing.md, gap: theme.spacing.sm }}>
          {personaData.focus.map((item) => (
            <View key={item} style={styles.focusRow}>
              <Text style={[styles.focusBullet, { color: theme.colors.accent.primary }]}>
                •
              </Text>
              <Text
                style={[
                  styles.cardBody,
                  styles.focusText,
                  { color: theme.colors.text.secondary },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </Card>
      <View style={styles.stepActions}>
        <Button label={t('common.back')} variant="ghost" onPress={onBack} />
        <Button label={t('onboarding.planCta')} onPress={onContinue} />
      </View>
    </View>
  );
}

type PaywallStepProps = {
  persona: PersonaKey | null;
  isLoading: boolean;
  onTrigger: () => void;
  onSkip: () => void;
  onBack: () => void;
};

function PaywallStep({
  persona,
  isLoading,
  onTrigger,
  onSkip,
  onBack,
}: PaywallStepProps) {
  const theme = useTheme();
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        {t('onboarding.paywallTitle')}
      </Text>
      <Text
        style={[
          styles.bodyLarge,
          { color: theme.colors.text.secondary, marginBottom: theme.spacing.lg },
        ]}
      >
        {persona
          ? t('onboarding.paywallDescription', {
              personaTitle: personaCopy[persona].title,
            })
          : t('onboarding.paywallDescriptionFallback')}
      </Text>
      <View style={styles.planHighlights}>
        <Text style={[styles.highlight, { color: theme.colors.text.primary }]}>
          {t('onboarding.paywallHighlightA')}
        </Text>
        <Text style={[styles.highlight, { color: theme.colors.text.primary }]}>
          {t('onboarding.paywallHighlightB')}
        </Text>
        <Text style={[styles.highlight, { color: theme.colors.text.primary }]}>
          {t('onboarding.paywallHighlightC')}
        </Text>
      </View>
      <View style={styles.stepActions}>
        <Button label={t('common.back')} variant="ghost" onPress={onBack} />
        <Button
          label={isLoading ? 'Connecting…' : t('onboarding.paywallPrimaryCta')}
          onPress={onTrigger}
          disabled={isLoading}
        />
      </View>
      <View style={[styles.secondaryAction, { marginTop: theme.spacing.md }]}>
        <Button
          label={t('onboarding.paywallSecondaryCta')}
          variant="ghost"
          onPress={onSkip}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 64,
  },
  progressWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepContainer: {
    gap: 16,
  },
  // New Hero styles
  heroContainer: {
    flex: 1,
    height: '100%',
    position: 'relative',
    minHeight: 600,
  },
  heroBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  heroOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  heroHeader: {
    marginTop: 40,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 8,
  },
  heroBody: {
    marginTop: 40,
  },
  heroTagline: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  heroDecoration: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    opacity: 0.8,
    marginVertical: 20,
  },
  heroActions: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  heroButton: {
    paddingVertical: 16,
  },
  kicker: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  bodyLarge: {
    fontSize: 17,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  cardStack: {
    gap: 16,
  },
  infoCard: {
    gap: 8,
  },
  planCard: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
  },
  selectCard: {
    gap: 8,
  },
  stepActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quizCounter: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  focusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  focusBullet: {
    fontSize: 18,
  },
  focusText: {
    flex: 1,
  },
  planHighlights: {
    gap: 8,
  },
  highlight: {
    fontSize: 15,
  },
  secondaryAction: {
    alignSelf: 'stretch',
  },
});
