import type { GameMeta, GameId } from './types';

export const GAME_META: Record<GameId, GameMeta> = {
  'pattern-completion': {
    id: 'pattern-completion',
    title: 'Pattern Prism',
    description:
      'Spot the shape that completes the evolving pulse before time shatters it.',
    primaryColor: '#2521FF',
    accentColor: '#6C63FF',
    gradient: ['#1F22FF', '#6F47FF', '#C83AFF'] as [string, string, string],
    mode: 'timed',
    icon: '🧩',
  },
  'signal-vs-noise': {
    id: 'signal-vs-noise',
    title: 'Signal Sifter',
    description:
      'Tease the true frequency out of flickering static. Precision under pressure.',
    primaryColor: '#00C6AE',
    accentColor: '#0CD8C0',
    gradient: ['#0B8772', '#00C6AE', '#66FFE0'] as [string, string, string],
    mode: 'precision',
    icon: '🎛️',
  },
  'word-sprint': {
    id: 'word-sprint',
    title: 'Lexic Rush',
    description:
      'Chain the word that resonates most before your association arc goes dark.',
    primaryColor: '#FF7A93',
    accentColor: '#FF4D7A',
    gradient: ['#7B1F3C', '#FF477E', '#FF8FB3'] as [string, string, string],
    mode: 'streak',
    icon: '⚡',
  },
  'anomaly-scout': {
    id: 'anomaly-scout',
    title: 'Anomaly Scout',
    description: 'Probe the grid and flag the outlier tile before it slips out of sight.',
    primaryColor: '#FDBB2D',
    accentColor: '#FF9F1C',
    gradient: ['#FFB347', '#FFCC33', '#FFE29F'] as [string, string, string],
    mode: 'precision',
    icon: '🛰️',
  },
};
