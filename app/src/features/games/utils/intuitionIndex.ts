export type IntuitionIndexInput = {
  scores: number[]; // normalized scores per game
  recencyWeights?: number[]; // optional weighting for recency emphasis
};

export function computeIntuitionIndex({
  scores,
  recencyWeights,
}: IntuitionIndexInput): number {
  if (scores.length === 0) {
    return 0;
  }

  let weightedSum = 0;
  let weightTotal = 0;

  scores.forEach((score, idx) => {
    const weight = recencyWeights?.[idx] ?? 1;
    weightedSum += normalizeScore(score) * weight;
    weightTotal += weight;
  });

  const average = weightTotal > 0 ? weightedSum / weightTotal : 0;
  const clamped = Math.max(0, Math.min(100, average));

  return Math.round(clamped);
}

const SCORE_MIN = 200;
const SCORE_MAX = 2000;

function normalizeScore(score: number): number {
  const normalized = ((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100;
  return Math.max(0, Math.min(100, normalized));
}
