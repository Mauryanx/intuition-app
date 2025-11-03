import { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button, Screen } from '@/components';
import { useTheme } from '@/theme';
import { useProgressStore } from '@/state';
import { trackEvent } from '@/services/analytics';
import { GAME_META } from '../meta';
import {
  AnswerButton,
  GameGradient,
  GameHeader,
  GameSummaryCard,
  HUDScore,
  HUDTimer,
} from '../components';
import { useDifficultyManager, useGameEngine, useGameTimer } from '../hooks';
import type { GameDifficulty, GameRoundConfig, GameRunPayload } from '../types';

const VISUAL_DATA: GameRoundConfig[] = [
  {
    prompt: 'Complete the prism sequence',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 2,
    background: ['#151B3D', '#2442A3'],
  },
  {
    prompt: 'Which shard balances the arc?',
    options: ['X', 'Y', 'Z', 'Φ'],
    correctIndex: 1,
    background: ['#11152B', '#421D57'],
  },
  {
    prompt: 'Find the twin pulse',
    options: ['◎', '◖', '⊛', '◍'],
    correctIndex: 0,
    background: ['#061824', '#104061'],
  },
];

const TARGET_DURATION_MS = 18000;

export function PatternCompletionScreen() {
  const theme = useTheme();
  const rounds = useMemo(() => VISUAL_DATA, []);
  const perRoundTargetMs = TARGET_DURATION_MS / Math.max(1, rounds.length);

  const recordRun = useProgressStore((state) => state.recordRun);

  const { current: difficultyLevel, registerRun } = useDifficultyManager({
    initial: 3,
    targetResponseMs: perRoundTargetMs,
  });

  const [nextDifficulty, setNextDifficulty] = useState<GameDifficulty>(difficultyLevel);
  const [lastRun, setLastRun] = useState<GameRunPayload | null>(null);

  useEffect(() => {
    setNextDifficulty(difficultyLevel);
  }, [difficultyLevel]);

  const [state, actions] = useGameEngine({
    sessionId: undefined,
    gameMeta: GAME_META['pattern-completion'],
    difficulty: difficultyLevel,
    rounds,
    targetDurationMs: TARGET_DURATION_MS,
    onComplete: (payload) => {
      trackEvent({ name: 'game_complete', params: payload });
      recordRun(payload);
      setLastRun(payload);
      const updated = registerRun({
        accuracy: payload.accuracy,
        averageResponseMs: payload.averageResponseMs,
      });
      setNextDifficulty(updated);
    },
  });

  const elapsed = useGameTimer(state.status === 'active');
  const currentRound = state.rounds[state.roundIndex];

  const summaryScore = lastRun?.score ?? state.score;
  const summaryAccuracy = Math.round((lastRun?.accuracy ?? state.accuracy) * 100);
  const summaryAvgResponse = Math.round(
    lastRun?.averageResponseMs ?? state.averageResponseMs ?? perRoundTargetMs,
  );

  const summaryMetrics = useMemo(
    () => [
      { label: 'Score', value: `${summaryScore}`, tone: 'positive' as const },
      { label: 'Accuracy', value: `${summaryAccuracy}%` },
      { label: 'Avg response', value: `${summaryAvgResponse} ms` },
      { label: 'Next difficulty', value: formatDifficulty(nextDifficulty) },
    ],
    [nextDifficulty, summaryAccuracy, summaryAvgResponse, summaryScore],
  );

  if (state.status === 'tutorial') {
    return (
      <Screen>
        <View style={styles.tutorialContainer}>
          <GameHeader meta={GAME_META['pattern-completion']} />
          <Text style={[styles.tutorialBody, { color: theme.colors.text.secondary }]}>
            Snap to intuition: watch the pulse morph, then tap the shard that completes
            the loop before the beat resets.
          </Text>
          <Button label="Begin" onPress={actions.start} />
        </View>
      </Screen>
    );
  }

  const handleNext = () => {
    if (state.selectedIndex === null) {
      return;
    }

    if (state.roundIndex >= state.rounds.length - 1) {
      actions.end();
      return;
    }

    actions.nextRound();
  };

  if (state.status === 'summary') {
    return (
      <Screen>
        <View style={styles.summaryContainer}>
          <GameSummaryCard
            title="Prism flow complete"
            subtitle="You’re interpreting pattern pulses with sharper instincts. Keep momentum for bonus multipliers."
            metrics={summaryMetrics}
            onContinue={() => {
              actions.reset();
            }}
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
          colors={currentRound.background ?? (['#101010', '#191919'] as [string, string])}
          style={styles.gradient}
        >
          <View style={styles.promptBlock}>
            <Text style={[styles.prompt, { color: theme.colors.text.primary }]}>
              {currentRound.prompt}
            </Text>
            <Image
              source={require('@/assets/overlays/halo.png')}
              style={styles.promptImage}
            />
          </View>
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
              label={state.roundIndex >= state.rounds.length - 1 ? 'Finish' : 'Next'}
              onPress={handleNext}
            />
            <Button label="End" variant="ghost" onPress={actions.end} />
          </View>
        </GameGradient>
      </View>
    </Screen>
  );
}

function formatDifficulty(level: GameDifficulty) {
  return `Level ${level}`;
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
  },
  gradient: {
    flex: 1,
    gap: 24,
    justifyContent: 'space-between',
  },
  promptBlock: {
    alignItems: 'center',
    gap: 16,
  },
  prompt: {
    fontSize: 20,
    textAlign: 'center',
  },
  promptImage: {
    width: 220,
    height: 220,
    opacity: 0.9,
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
    fontSize: 18,
    lineHeight: 24,
  },
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
