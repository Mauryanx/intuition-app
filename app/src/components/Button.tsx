import { ReactNode, useMemo } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  PressableStateCallbackType,
  ViewStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/theme';

type ButtonVariant = 'primary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function Button({
  label,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  const theme = useTheme();
  const gradientColors =
    variant === 'primary'
      ? theme.colors.gradients.primary
      : theme.colors.gradients.success;

  const themedStyles = useMemo(
    () =>
      StyleSheet.create({
        primaryText: {
          color: theme.colors.text.primary,
        },
        secondaryText: {
          color: theme.colors.text.secondary,
        },
        ghostBorder: {
          borderColor: theme.colors.border.strong,
        },
      }),
    [theme],
  );

  const pressableStyle = ({ pressed }: PressableStateCallbackType): ViewStyle => ({
    opacity: pressed || disabled ? 0.8 : 1,
  });

  if (variant === 'ghost') {
    return (
      <Pressable onPress={onPress} style={pressableStyle} disabled={disabled}>
        <View style={[styles.button, styles.ghost, themedStyles.ghostBorder]}>
          {icon}
          <Text style={[styles.text, themedStyles.secondaryText]}>{label}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={pressableStyle} disabled={disabled}>
      <LinearGradient colors={gradientColors} style={styles.button}>
        {icon}
        <Text style={[styles.text, themedStyles.primaryText]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    paddingHorizontal: 20,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  ghost: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});
