import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';
import type { GameMeta } from '../types/core';

export function GameHeader({ meta }: { meta: GameMeta }) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: meta.accentColor }]}>
        <Text style={styles.icon}>{meta.icon}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          {meta.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          {meta.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
});
