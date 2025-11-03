import { useMemo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Button, Screen } from '@/components';
import { useTheme } from '@/theme';

import { GAME_META } from '../meta';
import {
  GameGradient,
  AnswerButton,
  HUDScore,
  HUDTimer,
  GameHeader,
} from '../components';
import { useGameEngine, useGameTimer } from '../hooks';
import type { GameRoundConfig } from '../types';
import { trackEvent } from '@/services/analytics';

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

  const [state, actions] = useGameEngine({
    sessionId: undefined,
    gameMeta: GAME_META['pattern-completion'],
    difficulty: 3,
    rounds,
    targetDurationMs: TARGET_DURATION_MS,
    onComplete: (payload) => trackEvent({ name: 'game_complete', params: payload }),
    onAbort: () =>
      trackEvent({ name: 'game_abort', params: { id: 'pattern-completion' } }),
  });

  const elapsed = useGameTimer(state.status === 'active');
  const currentRound = state.rounds[state.roundIndex];

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

  if (state.status === 'summary') {
    return (
      <Screen>
        <View style={styles.summaryContainer}>
          <GameHeader meta={GAME_META['pattern-completion']} />
          <View style={{ marginTop: theme.spacing.xl }}>
            <Text style={[styles.summaryTitle, { color: theme.colors.text.primary }]}>
              Flow score
            </Text>
            <Text style={[styles.summaryBody, { color: theme.colors.text.secondary }]}>
              Your prism intuition sharpened. Keep the streak alive tomorrow for bonus
              multipliers.
            </Text>
          </View>
          <Button label="Back to hub" onPress={() => {}} />
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
                onPress={() => actions.selectOption(index)}
              />
            ))}
          </View>
          <View style={styles.controls}>
            <Button label="Next" onPress={actions.nextRound} />
            <Button label="End" variant="ghost" onPress={actions.end} />
          </View>
        </GameGradient>
      </View>
    </Screen>
  );
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
    gap: 24,
  },
  summaryTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  summaryBody: {
    fontSize: 16,
    lineHeight: 22,
  },
});
