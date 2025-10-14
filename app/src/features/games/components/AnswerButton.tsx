import { ReactNode, useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@/theme';

type AnswerButtonProps = {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export function AnswerButton({
  label,
  icon,
  active = false,
  disabled,
  onPress,
}: AnswerButtonProps) {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        base: {
          borderRadius: 18,
          paddingVertical: 16,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          borderWidth: 1,
          borderColor: active ? theme.colors.accent.primary : theme.colors.border.subtle,
          backgroundColor: active
            ? theme.colors.background.elevated
            : theme.colors.background.surface,
        },
        text: {
          flex: 1,
          color: theme.colors.text.primary,
          fontSize: 16,
        },
      }),
    [active, theme],
  );

  return (
    <Pressable
      style={({ pressed }) => [styles.base, pressed ? { opacity: 0.8 } : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{label}</Text>
      {icon}
    </Pressable>
  );
}
