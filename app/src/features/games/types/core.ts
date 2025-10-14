export type GameDifficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GameMode = 'timed' | 'streak' | 'precision';

export type GameMeta = {
  id: GameId;
  title: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  gradient: string[];
  mode: GameMode;
  icon: string;
};

export type GameId =
  | 'pattern-completion'
  | 'signal-vs-noise'
  | 'word-sprint'
  | 'anomaly-scout';

export type GameSessionState = 'tutorial' | 'active' | 'summary';

export type GameStepSummary = {
  score: number;
  accuracy: number;
  streak: number;
  difficulty: GameDifficulty;
  speed?: number;
  elapsedMs: number;
};

export type GameRunPayload = {
  id: string;
  gameId: GameId;
  startedAt: number;
  completedAt: number;
  difficulty: GameDifficulty;
  score: number;
  accuracy: number;
  totalRounds: number;
  streak: number;
  metadata?: Record<string, unknown>;
};

export type GameRoundConfig = {
  prompt: string;
  options: string[];
  correctIndex: number;
  background?: [string, string, ...string[]];
  ambient?: string;
};

export type GameEngineContext = {
  sessionId?: string;
  gameMeta: GameMeta;
  difficulty: GameDifficulty;
  rounds: GameRoundConfig[];
  targetDurationMs: number;
  onComplete: (payload: GameRunPayload) => void;
};

export type GameEngineActions = {
  start: () => void;
  selectOption: (index: number) => void;
  nextRound: () => void;
  end: () => void;
  reset: () => void;
};

export type GameEngineState = {
  status: GameSessionState;
  roundIndex: number;
  score: number;
  streak: number;
  accuracy: number;
  elapsedMs: number;
  timerMs: number;
  rounds: GameRoundConfig[];
  selectedIndex: number | null;
};
