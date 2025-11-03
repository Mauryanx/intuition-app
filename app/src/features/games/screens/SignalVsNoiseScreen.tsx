import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button, Card, Screen } from '@/components';
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

const SIGNAL_ROUNDS: GameRoundConfig[] = [
  {
    prompt: 'Which channel holds the pure tone?',
    options: ['Alpha', 'Nova', 'Quark', 'Flux'],
    correctIndex: 1,
    background: ['#012529', '#035E63', '#04A7A1'],
  },
  {
    prompt: 'Lock on to the spike that repeats.',
    options: ['Pulse A', 'Pulse B', 'Pulse C', 'Pulse D'],
    correctIndex: 3,
    background: ['#031018', '#05253A', '#0F4A7B'],
  },
  {
    prompt: 'Find the wave unfazed by static.',
    options: ['Sierra', 'Echo', 'Calm', 'Rift'],
    correctIndex: 2,
    background: ['#040C12', '#0A1F2D', '#0E3249'],
  },
];

const TARGET_DURATION_MS = 20000;

export function SignalVsNoiseScreen() {
  const theme = useTheme();
  const rounds = useMemo(() => SIGNAL_ROUNDS, []);

  const [state, actions] = useGameEngine({
    gameMeta: GAME_META['signal-vs-noise'],
    difficulty: 3,
    rounds,
    targetDurationMs: TARGET_DURATION_MS,
    onComplete: (payload) => trackEvent({ name: 'game_complete', params: payload }),
  });

  const elapsed = useGameTimer(state.status === 'active');
  const currentRound = state.rounds[state.roundIndex];

  const summaryMetrics = useMemo(
    () => [
      { label: 'Signal score', value: `${state.score}`, tone: 'positive' as const },
      { label: 'Noise dodged', value: `${state.streak}` },
      { label: 'Lock accuracy', value: `${Math.round(state.accuracy * 100)}%` },
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
          <GameHeader meta={GAME_META['signal-vs-noise']} />
          <Text style={[styles.tutorialBody, { color: theme.colors.text.secondary }]}>
            Drag your focus through the static. Only one waveform hums consistently—tap
            the channel before the interference swells.
          </Text>
          <Card padding="md" style={styles.visualCard}>
            <Image
              source={require('@/assets/backgrounds/spectrum.png')}
              style={styles.visual}
            />
          </Card>
          <Button label="Tune in" onPress={actions.start} />
        </View>
      </Screen>
    );
  }

  if (state.status === 'summary') {
    return (
      <Screen>
        <View style={styles.summaryContainer}>
          <GameSummaryCard
            title="Signal locked"
            subtitle="Your detector sliced through the noise floor. Tomorrow’s boost sharpens the gain even more."
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
          colors={currentRound.background ?? (['#02141B', '#063844'] as [string, string])}
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
                state.roundIndex >= state.rounds.length - 1 ? 'Finish' : 'Next pulse'
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
  visualCard: {
    alignItems: 'center',
  },
  visual: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
