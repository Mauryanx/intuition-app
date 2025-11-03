import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Screen } from '@/components';
import { useTheme } from '@/theme';

import { GAME_META } from '../meta';
import {
  AnswerButton,
  GameGradient,
  GameHeader,
  GameSummaryCard,
  HUDScore,
  HUDTimer,
} from '../components';
import { useGameEngine, useGameTimer } from '../hooks';
import type { GameRoundConfig } from '../types';
import { trackEvent } from '@/services/analytics';

const WORD_ROUNDS: GameRoundConfig[] = [
  {
    prompt: 'Choose the word that sparks “clarity”.',
    options: ['obscura', 'lucid', 'fable', 'ember'],
    correctIndex: 1,
    background: ['#2E0630', '#641C68', '#A635A5'],
  },
  {
    prompt: 'Lightning connection to “momentum”.',
    options: ['loom', 'surge', 'flair', 'pilot'],
    correctIndex: 1,
    background: ['#300B22', '#8B153E', '#FF3D6E'],
  },
  {
    prompt: 'Which word pairs with “intuition”?',
    options: ['rift', 'compass', 'retreat', 'anchor'],
    correctIndex: 1,
    background: ['#3C0720', '#921E3D', '#FF616A'],
  },
];

const TARGET_DURATION_MS = 15000;

export function WordSprintScreen() {
  const theme = useTheme();
  const rounds = useMemo(() => WORD_ROUNDS, []);

  const [state, actions] = useGameEngine({
    gameMeta: GAME_META['word-sprint'],
    difficulty: 2,
    rounds,
    targetDurationMs: TARGET_DURATION_MS,
    onComplete: (payload) => trackEvent({ name: 'game_complete', params: payload }),
  });

  const elapsed = useGameTimer(state.status === 'active');
  const currentRound = state.rounds[state.roundIndex];

  const summaryMetrics = useMemo(
    () => [
      { label: 'Lexic score', value: `${state.score}`, tone: 'positive' as const },
      { label: 'Combo sparks', value: `${state.streak}` },
      { label: 'Gut accuracy', value: `${Math.round(state.accuracy * 100)}%` },
    ],
    [state.accuracy, state.score, state.streak],
  );

  const handleNext = () => {
    if (state.selectedIndex === null) return;
    if (state.roundIndex >= state.rounds.length - 1) {
      actions.end();
      return;
    }
    actions.nextRound();
  };

  if (state.status === 'tutorial') {
    return (
      <Screen>
        <View style={styles.tutorialContainer}>
          <GameHeader meta={GAME_META['word-sprint']} />
          <Text style={[styles.tutorialBody, { color: theme.colors.text.secondary }]}>
            Fire off the association that feels right in your bones. Word chains heat up
            the faster you commit.
          </Text>
          <Button label="Spark" onPress={actions.start} />
        </View>
      </Screen>
    );
  }

  if (state.status === 'summary') {
    return (
      <Screen>
        <View style={styles.summaryContainer}>
          <GameSummaryCard
            title="Associations crackled"
            subtitle="Your lexic instincts are warming up. Bring them back tomorrow and the streak multiplier climbs."
            metrics={summaryMetrics}
            onContinue={() => actions.reset()}
            onRetry={() => {
              actions.reset();
              actions.start();
            }}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <HUDScore score={state.score} streak={state.streak} accuracy={state.accuracy} />
        <HUDTimer elapsed={elapsed} />
        <GameGradient
          colors={currentRound.background ?? (['#350716', '#6A0F2A'] as [string, string])}
          style={styles.gradient}
        >
          <Text style={[styles.prompt, { color: theme.colors.text.primary }]}>
            {currentRound.prompt}
          </Text>
          <View style={styles.answers}>
            {currentRound.options.map((option, index) => (
              <AnswerButton
                key={option}
                label={option}
                active={state.selectedIndex === index}
                disabled={state.selectedIndex !== null}
                onPress={() => actions.selectOption(index)}
              />
            ))}
          </View>
          <View style={styles.controls}>
            <Button
              label={
                state.roundIndex >= state.rounds.length - 1 ? 'Finish' : 'Next spark'
              }
              onPress={handleNext}
            />
            <Button label="End" variant="ghost" onPress={actions.end} />
          </View>
        </GameGradient>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  gradient: {
    flex: 1,
    gap: 24,
    justifyContent: 'space-between',
  },
  prompt: {
    fontSize: 20,
    textAlign: 'center',
  },
  answers: {
    gap: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  tutorialContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  tutorialBody: {
    fontSize: 17,
    lineHeight: 24,
  },
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
