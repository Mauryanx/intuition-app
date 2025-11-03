import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

const FILL_DURATION = 1000; // ms per segment

export function HUDTimer({ elapsed }: { elapsed: number }) {
  const theme = useTheme();
  const [bars, setBars] = useState(0);

  useEffect(() => {
    setBars(Math.min(5, Math.floor(elapsed / FILL_DURATION)));
  }, [elapsed]);

  return (
    <View style={[styles.container, { borderColor: theme.colors.border.subtle }]}>
      <Text style={[styles.label, { color: theme.colors.text.muted }]}>Time</Text>
      <View style={styles.bars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              {
                backgroundColor:
                  index < bars
                    ? theme.colors.accent.secondary
                    : theme.colors.border.subtle,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
  },
  bars: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  bar: {
    width: 12,
    height: 20,
    borderRadius: 4,
  },
});
