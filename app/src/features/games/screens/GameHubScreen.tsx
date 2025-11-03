import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Card, Screen } from '@/components';
import { useTheme } from '@/theme';
import { useProgressStore } from '@/state';

import { GAME_META } from '../meta';
import type { GameId } from '../types';
import type { MainStackParamList } from '@/navigation/RootNavigator';

const GAME_ORDER: GameId[] = [
  'pattern-completion',
  'signal-vs-noise',
  'word-sprint',
  'anomaly-scout',
];

export function GameHubScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const intuitionIndex = useProgressStore((state) => state.intuitionIndex);

  const games = useMemo(() => GAME_ORDER.map((id) => GAME_META[id]), []);

  return (
    <Screen>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { padding: theme.spacing.lg }]}
        ItemSeparatorComponent={GameListSeparator}
        ListHeaderComponent={<GameHubHeader intuitionIndex={intuitionIndex} />}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate(mapRoute(item.id))}>
            <Card
              padding="lg"
              elevated
              style={[
                styles.card,
                { borderColor: hexWithOpacity(item.accentColor, 0.28) },
              ]}
            >
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: hexWithOpacity(item.accentColor, 0.18) },
                  ]}
                >
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>
                <View style={styles.meta}>
                  <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <View style={styles.badges}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: hexWithOpacity(theme.colors.border.subtle, 0.35),
                    },
                  ]}
                >
                  <Text
                    style={[styles.badgeText, { color: theme.colors.text.secondary }]}
                  >
                    {item.mode === 'timed'
                      ? 'Timed Flow'
                      : item.mode === 'streak'
                        ? 'Streak Mode'
                        : 'Precision'}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: hexWithOpacity(theme.colors.accent.primary, 0.18),
                    },
                  ]}
                >
                  <Text
                    style={[styles.badgeText, { color: theme.colors.accent.primary }]}
                  >
                    {`Palette ${item.primaryColor}`}
                  </Text>
                </View>
              </View>
            </Card>
          </Pressable>
        )}
      />
    </Screen>
  );
}

function hexWithOpacity(hex: string, opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${alpha}`;
}

function GameListSeparator() {
  const theme = useTheme();
  return <View style={{ height: theme.spacing.lg }} />;
}

function GameHubHeader({ intuitionIndex }: { intuitionIndex: number }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.heroCard,
        { borderColor: hexWithOpacity(theme.colors.border.subtle, 0.4) },
      ]}
    >
      <Text style={[styles.heroTitle, { color: theme.colors.text.primary }]}>
        Intuition Index
      </Text>
      <Text style={[styles.indexValue, { color: theme.colors.accent.primary }]}>
        {intuitionIndex}
      </Text>
      <Text style={[styles.heroCaption, { color: theme.colors.text.secondary }]}>
        Composite from your latest runs across each intuition circuit.
      </Text>
    </View>
  );
}

function mapRoute(id: GameId): keyof MainStackParamList {
  switch (id) {
    case 'pattern-completion':
      return 'PatternCompletion';
    case 'signal-vs-noise':
      return 'SignalVsNoise';
    case 'word-sprint':
      return 'WordSprint';
    case 'anomaly-scout':
    default:
      return 'AnomalyScout';
  }
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 64,
  },
  card: {
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
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
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  badges: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  heroCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    gap: 8,
  },
  heroTitle: {
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  indexValue: {
    fontSize: 42,
    fontWeight: '700',
  },
  heroCaption: {
    fontSize: 14,
    lineHeight: 20,
  },
});
