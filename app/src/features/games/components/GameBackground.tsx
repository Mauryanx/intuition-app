import { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const FALLBACK = require('@/assets/backgrounds/nebula.png');

type GameBackgroundProps = {
  source?: ReturnType<typeof require>;
  children: ReactNode;
};

export function GameBackground({ source = FALLBACK, children }: GameBackgroundProps) {
  return (
    <ImageBackground source={source} style={styles.background} resizeMode="cover">
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 24,
  },
});
