import type { GameDifficulty } from '../types/core';

type DifficultyParams = {
  previous: GameDifficulty;
  accuracy: number;
  averageResponseMs: number;
  targetResponseMs: number;
};

export function nextDifficulty({
  previous,
  accuracy,
  averageResponseMs,
  targetResponseMs,
}: DifficultyParams): GameDifficulty {
  let adjusted = Number(previous);

  if (accuracy >= 0.85 && averageResponseMs <= targetResponseMs) {
    adjusted += 1;
  } else if (accuracy < 0.65) {
    adjusted -= 1;
  }

  adjusted = Math.min(10, Math.max(1, adjusted));
  return adjusted as GameDifficulty;
}
