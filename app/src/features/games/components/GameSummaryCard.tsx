import { View, Text, StyleSheet } from 'react-native';

import { Card, Button } from '@/components';
import { useTheme } from '@/theme';

export type SummaryMetric = {
  label: string;
  value: string;
  tone?: 'positive' | 'neutral' | 'warning';
};

type GameSummaryCardProps = {
  title: string;
  subtitle: string;
  metrics: SummaryMetric[];
  onContinue: () => void;
  onRetry: () => void;
};

export function GameSummaryCard({
  title,
  subtitle,
  metrics,
  onContinue,
  onRetry,
}: GameSummaryCardProps) {
  const theme = useTheme();
  return (
    <Card padding="lg" elevated style={styles.card}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
        {subtitle}
      </Text>
      <View style={styles.metrics}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.text.muted }]}>
              {metric.label}
            </Text>
            <Text
              style={[
                styles.metricValue,
                {
                  color:
                    metric.tone === 'positive'
                      ? theme.colors.accent.primary
                      : metric.tone === 'warning'
                        ? theme.colors.text.danger
                        : theme.colors.text.primary,
                },
              ]}
            >
              {metric.value}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        <Button label="Play again" variant="ghost" onPress={onRetry} />
        <Button label="Continue" onPress={onContinue} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  metrics: {
    gap: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
