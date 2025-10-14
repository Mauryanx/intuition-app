import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

type ScreenProps = {
  children: ReactNode;
  withSafeArea?: boolean;
};

export function Screen({ children, withSafeArea = true }: ScreenProps) {
  const { colors, spacing } = useTheme();

  if (withSafeArea) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background.primary }]}
      >
        <View style={[styles.container, { paddingHorizontal: spacing.lg }]}>
          {children}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background.primary }]}>
      <View style={[styles.container, { paddingHorizontal: spacing.lg }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
