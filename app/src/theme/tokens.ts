export const colors = {
  background: {
    primary: '#050608',
    secondary: '#101218',
    surface: '#131622',
    elevated: '#1C2133',
  },
  text: {
    primary: '#F6F7FB',
    secondary: '#B7BDD6',
    muted: '#8590B0',
    accent: '#A3FFB0',
    danger: '#FF7A93',
  },
  accent: {
    primary: '#6C63FF',
    secondary: '#4C4CFF',
    tertiary: '#00C6AE',
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    strong: 'rgba(255, 255, 255, 0.18)',
  },
  gradients: {
    primary: ['#6C63FF', '#46A7FF'],
    success: ['#00C6AE', '#6BFFB0'],
    danger: ['#FF7A93', '#FF477E'],
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '600' as const,
  },
  headline: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600' as const,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
  },
} as const;

export const elevations = {
  sm: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  md: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
} as const;
