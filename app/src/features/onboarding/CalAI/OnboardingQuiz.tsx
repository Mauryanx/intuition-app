import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Animated as RNAnimated,
  Easing,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView, AnimatePresence } from 'moti';
import { useProfileStore } from '@/state/profile';
// For now, I'll build a custom simple slider using View to avoid deps if possible, or assume basic slider usage.

const { width } = Dimensions.get('window');

// --- Types ---

type QuestionType = 'singleChoice' | 'slider' | 'text';

interface Question {
  id: number;
  title: string;
  subtitle?: string;
  kind: QuestionType;
  options?: string[]; // For singleChoice
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    labels?: Record<number, string>;
  };
  placeholder?: string; // For text
}

interface OnboardingQuizProps {
  onComplete: () => void;
}

// --- Data ---

const QUESTIONS: Question[] = [
  {
    id: 0,
    title: "Welcome to Intuition Trainer 👋",
    subtitle: "I’ll tailor this to your brain's wiring. Sound good?",
    kind: 'singleChoice',
    options: ["Let’s do it", "I'm ready, let's go!"],
  },
  {
    id: 1,
    title: "What's your current decision style?",
    subtitle: "Be honest—this helps me find your baseline.",
    kind: 'singleChoice',
    options: ["Purely Logical (Data driven)", "Mostly Logical but check gut", "Balanced", "Purely Instinctual"],
  },
  {
    id: 2,
    title: "What trips you up most?",
    subtitle: "We'll target your weakest link first.",
    kind: 'singleChoice',
    options: ["Overthinking / Analysis Paralysis", "Second-guessing after deciding", "Impulsivity / Rushing", "Freezing under pressure"],
  },
  {
    id: 3,
    title: "How often do you regret a choice?",
    subtitle: "Frequency of 'I knew I should have done the other thing'.",
    kind: 'slider',
    sliderConfig: { min: 1, max: 3, step: 1, labels: { 1: "Rarely", 2: "Sometimes", 3: "Often" } },
  },
  {
    id: 4,
    title: "What's the primary goal?",
    subtitle: "Pick the one that matters most right now.",
    kind: 'singleChoice',
    options: ["Stop second-guessing", "Read people/situations better", "Decide faster under stress", "Trust my first instinct"],
  },
  // Demographics
  {
    id: 5,
    title: "What’s your name?",
    subtitle: "So I can personalize your plan.",
    kind: 'text',
    placeholder: "Enter your name",
  },
  {
    id: 6,
    title: "How old are you?",
    subtitle: "Age helps me baseline your cognitive reaction times.",
    kind: 'text',
    placeholder: "Enter your age",
  },
];

// --- Main Component ---

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const setUserInfo = useProfileStore((state) => state.setUserInfo);

  const currentQ = QUESTIONS[step];
  const progress = (step) / (QUESTIONS.length - 1);

  const handleAnswerChange = (val: any) => {
    setAnswers((prev) => ({ ...prev, [step]: val }));
  };

  const isStepComplete = () => {
    const val = answers[step];
    if (val === undefined || val === null) return false;
    if (typeof val === 'string') return val.trim().length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Finished
      setIsCalculating(true);
      // Fake calculation delay
      setTimeout(() => {
        setIsCalculating(false);
        persistUserInfo();
        onComplete();
      }, 3000); // 3 seconds of "Calculating..."
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={currentQ.id}
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -20 }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.card}
          >
            <Text style={styles.title}>{currentQ.title}</Text>
            {currentQ.subtitle && <Text style={styles.subtitle}>{currentQ.subtitle}</Text>}

            <View style={styles.inputContainer}>
              {currentQ.kind === 'singleChoice' && (
                <SingleChoiceInput
                  options={currentQ.options!}
                  selected={answers[step]}
                  onSelect={handleAnswerChange}
                />
              )}
              {currentQ.kind === 'text' && (
                <TextInput
                  style={styles.textInput}
                  placeholder={currentQ.placeholder}
                  value={answers[step] || ''}
                  onChangeText={handleAnswerChange}
                  autoFocus
                />
              )}
              {currentQ.kind === 'slider' && (
                <CustomSlider
                  config={currentQ.sliderConfig!}
                  value={answers[step]}
                  onChange={handleAnswerChange}
                />
              )}
            </View>
          </MotiView>
        </AnimatePresence>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={step === 0}
          style={[styles.navButton, styles.secondaryButton, step === 0 && styles.disabledButton]}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={!isStepComplete()}
          style={[styles.navButton, styles.primaryButton, !isStepComplete() && styles.disabledButton]}
        >
          <Text style={styles.primaryButtonText}>
            {step === QUESTIONS.length - 1 ? 'Finish' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calculating Overlay */}
      {isCalculating && <CalculatingOverlay />}
    </View>
  );

  function persistUserInfo() {
    const rawName = answers[5];
    const rawAge = answers[6];

    const name =
      typeof rawName === 'string' ? rawName.trim() || null : null;

    const parsedAge =
      typeof rawAge === 'string'
        ? parseInt(rawAge, 10)
        : typeof rawAge === 'number'
          ? rawAge
          : null;

    setUserInfo({
      name,
      age: Number.isFinite(parsedAge) ? parsedAge : null,
    });
  }
}

// --- Sub Components ---

function SingleChoiceInput({ options, selected, onSelect }: { options: string[], selected: string | null, onSelect: (v: string) => void }) {
  return (
    <View style={{ gap: 12 }}>
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onSelect(opt)}
            activeOpacity={0.7}
            style={[
              styles.choiceButton,
              isSelected && styles.choiceButtonSelected
            ]}
          >
            <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>{opt}</Text>
            <Ionicons
              name={isSelected ? "checkmark-circle" : "ellipse-outline"}
              size={24}
              color={isSelected ? "#007AFF" : "#C7C7CC"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function CustomSlider({ config, value, onChange }: { config: any, value: number | undefined, onChange: (v: number) => void }) {
  // Simple custom slider visual since we might not have @react-native-community/slider installed
  // We'll use 3 tap targets for min/mid/max for MVP simplicity if range is small
  const val = value;
  
  return (
    <View style={{ gap: 20, marginTop: 20 }}>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Render buttons for each step */}
          {Array.from({ length: config.max - config.min + 1 }).map((_, i) => {
             const stepVal = config.min + i;
             const isSelected = val === stepVal;
             return (
               <TouchableOpacity 
                 key={stepVal}
                 onPress={() => onChange(stepVal)}
                 style={{ alignItems: 'center', gap: 8 }}
               >
                  <View style={[styles.sliderDot, isSelected && styles.sliderDotSelected]} />
                  <Text style={[styles.sliderLabel, isSelected && styles.sliderLabelSelected]}>
                    {config.labels?.[stepVal] ?? stepVal}
                  </Text>
               </TouchableOpacity>
             )
          })}
       </View>
       <View style={styles.sliderLine} pointerEvents="none" />
    </View>
  )
}

function CalculatingOverlay() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay]}>
      <View style={styles.overlayContent}>
        <MotiView
          from={{ rotate: '0deg' }}
          animate={{ rotate: '360deg' }}
          transition={{ loop: true, type: 'timing', duration: 1500, easing: Easing.linear }}
        >
           <Ionicons name="sync" size={48} color="#007AFF" />
        </MotiView>
        <Text style={styles.overlayTitle}>Calculating your plan...</Text>
        <Text style={styles.overlaySubtitle}>
          Locking in cognitive benchmarks and identifying bias patterns.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // iOS system gray background
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
    lineHeight: 22,
  },
  inputContainer: {
    gap: 16,
  },
  choiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  choiceButtonSelected: {
    backgroundColor: '#EBF5FF',
    borderColor: '#007AFF',
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  choiceTextSelected: {
    color: '#007AFF',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F2F2F7', // Match bg
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    flex: 2,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '600',
  },
  // Slider Styles
  sliderLine: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#C7C7CC',
    zIndex: -1,
  },
  sliderDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#C7C7CC',
  },
  sliderDotSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  sliderLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  sliderLabelSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  // Overlay
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  overlaySubtitle: {
    textAlign: 'center',
    color: '#8E8E93',
    lineHeight: 20,
  },
});

