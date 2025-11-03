import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

type HUDScoreProps = {
  score: number;
  streak: number;
  accuracy: number;
};

export function HUDScore({ score, streak, accuracy }: HUDScoreProps) {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.elevated }]}
    >
      <View style={styles.metric}>
        <Text style={[styles.label, { color: theme.colors.text.muted }]}>Score</Text>
        <Text style={[styles.value, { color: theme.colors.text.primary }]}>{score}</Text>
      </View>
      <View style={styles.metric}>
        <Text style={[styles.label, { color: theme.colors.text.muted }]}>Streak</Text>
        <Text style={[styles.value, { color: theme.colors.accent.primary }]}>
          {streak}
        </Text>
      </View>
      <View style={styles.metric}>
        <Text style={[styles.label, { color: theme.colors.text.muted }]}>Accuracy</Text>
        <Text style={[styles.value, { color: theme.colors.text.secondary }]}>
          {Math.round(accuracy * 100)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 16,
  },
  metric: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
  },
});
