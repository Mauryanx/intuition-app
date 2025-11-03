import type { LeaderboardEntry } from '../firebase';

export const mockLeaderboard: LeaderboardEntry[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    gameId: 'overall',
    score: 1500 - idx * 45,
    accuracy: 0.82 - idx * 0.01,
    averageResponseMs: 950 + idx * 20,
    streak: Math.max(0, 6 - idx),
    createdAt: new Date(Date.now() - idx * 3600 * 1000),
  }),
);
