import { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

import { useTheme } from '@/theme';

type CardProps = ViewProps & {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  elevated?: boolean;
};

export function Card({
  children,
  padding = 'lg',
  elevated = true,
  style,
  ...rest
}: CardProps) {
  const { colors, spacing, radii, elevations } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.background.surface,
          padding: spacing[padding],
          borderRadius: radii.md,
        },
        elevated ? elevations.sm : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
});
