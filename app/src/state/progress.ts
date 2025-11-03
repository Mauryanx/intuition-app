import { create } from 'zustand';

import type { GameId, GameRunPayload } from '@/features/games/types';
import { computeIntuitionIndex } from '@/features/games/utils';

type ProgressState = {
  runs: GameRunPayload[];
  runsByGame: Partial<Record<GameId, GameRunPayload[]>>;
  intuitionIndex: number;
  recordRun: (run: GameRunPayload) => void;
  reset: () => void;
};

const MAX_RECENT_RUNS = 25;
const MAX_PER_GAME = 10;

export const useProgressStore = create<ProgressState>((set, get) => ({
  runs: [],
  runsByGame: {},
  intuitionIndex: 0,
  recordRun: (run) => {
    const prevRuns = get().runs;
    const runs = [...prevRuns.slice(-(MAX_RECENT_RUNS - 1)), run];

    const prevByGame = get().runsByGame;
    const byGame = {
      ...prevByGame,
      [run.gameId]: [...(prevByGame[run.gameId] ?? []), run].slice(-MAX_PER_GAME),
    };

    const latestScores = Object.values(byGame)
      .map((entries) => entries[entries.length - 1]?.score ?? 0)
      .filter((score) => score > 0);

    const intuitionIndex = computeIntuitionIndex({ scores: latestScores });

    set({ runs, runsByGame: byGame, intuitionIndex });
  },
  reset: () => set({ runs: [], runsByGame: {}, intuitionIndex: 0 }),
}));
