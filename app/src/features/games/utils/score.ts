export type ScoringInput = {
  selectionCorrect: boolean;
  responseTimeMs: number;
  targetTimeMs: number;
  difficulty: number;
  combo: number;
};

export function calculateScore({
  selectionCorrect,
  responseTimeMs,
  targetTimeMs,
  difficulty,
  combo,
}: ScoringInput): { delta: number; combo: number } {
  if (!selectionCorrect) {
    return { delta: Math.max(-25, -5 * difficulty), combo: 0 };
  }

  const speedRatio = Math.min(1.2, targetTimeMs / Math.max(responseTimeMs, 1));
  const base = 40 * difficulty;
  const comboBonus = combo * 8;
  const speedBonus = Math.round((speedRatio - 0.5) * 30);

  const delta = Math.round(base + speedBonus + comboBonus);
  return {
    delta,
    combo: combo + 1,
  };
}
