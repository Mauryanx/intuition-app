import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const GRID_ROUNDS: GameRoundConfig[] = [
  {
    prompt: 'Flag the tile whose glow drifts out of rhythm.',
    options: ['Sector A3', 'Sector B2', 'Sector C4', 'Sector D1'],
    correctIndex: 0,
    background: ['#1F1402', '#553402', '#FFB347'],
  },
  {
    prompt: 'Which panel flickers off-sequence?',
    options: ['Panel North', 'Panel East', 'Panel South', 'Panel West'],
    correctIndex: 2,
    background: ['#241001', '#7A3E03', '#FF9F1C'],
  },
  {
    prompt: 'Spot the anomaly before it cloaks.',
    options: ['Node K', 'Node R', 'Node V', 'Node X'],
    correctIndex: 3,
    background: ['#2A1000', '#8B4100', '#FFC45A'],
  },
];

const TARGET_DURATION_MS = 22000;

export function AnomalyScoutScreen() {
  const theme = useTheme();
  const rounds = useMemo(() => GRID_ROUNDS, []);

  const [state, actions] = useGameEngine({
    gameMeta: GAME_META['anomaly-scout'],
    difficulty: 4,
    rounds,
    targetDurationMs: TARGET_DURATION_MS,
    onComplete: (payload) => trackEvent({ name: 'game_complete', params: payload }),
  });

  const elapsed = useGameTimer(state.status === 'active');
  const currentRound = state.rounds[state.roundIndex];

  const summaryMetrics = useMemo(
    () => [
      { label: 'Scout score', value: `${state.score}`, tone: 'positive' as const },
      { label: 'Perfect sweeps', value: `${state.streak}` },
      { label: 'Detection accuracy', value: `${Math.round(state.accuracy * 100)}%` },
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
          <GameHeader meta={GAME_META['anomaly-scout']} />
          <Text style={[styles.tutorialBody, { color: theme.colors.text.secondary }]}>
            Scan the grid, trust the flicker your gut spots first. Tap the tile before the
            anomaly ghosts away.
          </Text>
          <Card padding="md" style={styles.mapCard}>
            <Text style={[styles.mapLabel, { color: theme.colors.text.primary }]}>
              Deck Atlas
            </Text>
            <View style={styles.mapGrid}>
              {['A', 'B', 'C', 'D'].map((row) => (
                <View key={row} style={styles.mapRow}>
                  {['1', '2', '3', '4'].map((col) => (
                    <View key={col} style={styles.mapCell}>
                      <Text
                        style={[styles.mapText, { color: theme.colors.text.secondary }]}
                      >
                        {`${row}${col}`}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </Card>
          <Button label="Deploy" onPress={actions.start} />
        </View>
      </Screen>
    );
  }

  if (state.status === 'summary') {
    return (
      <Screen>
        <View style={styles.summaryContainer}>
          <GameSummaryCard
            title="Sweep secured"
            subtitle="Anomalies won’t hide from you. Keep the sweeps daily to unlock elite scout tiers."
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
          colors={currentRound.background ?? (['#2A1000', '#8B4100'] as [string, string])}
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
              label={state.roundIndex >= state.rounds.length - 1 ? 'Finish' : 'Next scan'}
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
  mapCard: {
    gap: 12,
  },
  mapLabel: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mapGrid: {
    gap: 8,
  },
  mapRow: {
    flexDirection: 'row',
    gap: 8,
  },
  mapCell: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 14,
  },
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
