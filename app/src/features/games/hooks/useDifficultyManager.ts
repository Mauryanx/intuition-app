import { useCallback, useEffect, useState } from 'react';

import type { GameDifficulty } from '../types';
import { nextDifficulty } from '../utils';

type DifficultyManagerOptions = {
  initial: GameDifficulty;
  targetResponseMs: number;
};

type DifficultyManager = {
  current: GameDifficulty;
  history: GameDifficulty[];
  registerRun: (args: { accuracy: number; averageResponseMs: number }) => GameDifficulty;
  reset: () => void;
};

export function useDifficultyManager({
  initial,
  targetResponseMs,
}: DifficultyManagerOptions): DifficultyManager {
  const [current, setCurrent] = useState<GameDifficulty>(initial);
  const [history, setHistory] = useState<GameDifficulty[]>([initial]);

  useEffect(() => {
    setCurrent(initial);
    setHistory([initial]);
  }, [initial]);

  const registerRun = useCallback(
    ({
      accuracy,
      averageResponseMs,
    }: {
      accuracy: number;
      averageResponseMs: number;
    }) => {
      const updated = nextDifficulty({
        previous: current,
        accuracy,
        averageResponseMs,
        targetResponseMs,
      });
      setCurrent(updated);
      setHistory((prev) => [...prev.slice(-4), updated]);
      return updated;
    },
    [current, targetResponseMs],
  );

  const reset = useCallback(() => {
    setCurrent(initial);
    setHistory([initial]);
  }, [initial]);

  return {
    current,
    history,
    registerRun,
    reset,
  };
}
