import { ReactNode } from 'react';
import { View, StyleSheet, ViewProps, Pressable } from 'react-native';

import { useTheme } from '@/theme';

type CardProps = ViewProps & {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  elevated?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export function Card({
  children,
  padding = 'lg',
  elevated = true,
  onPress,
  disabled,
  style,
  ...rest
}: CardProps) {
  const { colors, spacing, radii, elevations } = useTheme();

  const baseStyle = [
    styles.base,
    {
      backgroundColor: colors.background.surface,
      padding: spacing[padding],
      borderRadius: radii.md,
    },
    elevated ? elevations.sm : null,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [...baseStyle, pressed ? styles.pressed : null]}
        {...rest}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={baseStyle} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
