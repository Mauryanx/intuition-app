import { ReactNode, createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { colors, spacing, radii, typography, elevations } from './tokens';

type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  elevations: typeof elevations;
  scheme: 'light' | 'dark';
};

const ThemeContext = createContext<Theme | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const scheme = useColorScheme();

  const theme = useMemo<Theme>(
    () => ({
      colors,
      spacing,
      radii,
      typography,
      elevations,
      scheme: scheme === 'light' ? 'light' : 'dark',
    }),
    [scheme],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return ctx;
}
