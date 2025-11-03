import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ViewStyle } from 'react-native';

type GameGradientProps = {
  colors: [string, string, ...string[]];
  children: ReactNode;
  style?: ViewStyle;
};

export function GameGradient({ colors, children, style }: GameGradientProps) {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.gradient, style]}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    borderRadius: 24,
    padding: 24,
  },
});
