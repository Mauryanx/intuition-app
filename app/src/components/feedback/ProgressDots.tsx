import { View, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

type ProgressDotsProps = {
  total: number;
  activeIndex: number;
};

export function ProgressDots({ total, activeIndex }: ProgressDotsProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        const backgroundColor = isActive ? colors.accent.primary : colors.border.subtle;
        const width = isActive ? 24 : 8;

        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width,
                backgroundColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
});
