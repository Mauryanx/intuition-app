import { ReactNode, useMemo } from 'react';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

type SafeAreaProps = {
  children: ReactNode;
  edges?: Edge[];
};

export function SafeArea({ children, edges = ['top', 'left', 'right'] }: SafeAreaProps) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.primary,
        },
      }),
    [colors.background.primary],
  );

  return (
    <SafeAreaView edges={edges} style={styles.container}>
      {children}
    </SafeAreaView>
  );
}
