import { useCallback, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';

import type {
  GameEngineActions,
  GameEngineContext,
  GameEngineState,
  GameSessionState,
} from '../types';
import { calculateScore } from '../utils';

const INITIAL_STATE: GameEngineState = {
  status: 'tutorial',
  roundIndex: 0,
  score: 0,
  streak: 0,
  accuracy: 0,
  elapsedMs: 0,
  timerMs: 0,
  rounds: [],
  selectedIndex: null,
};

export function useGameEngine({
  sessionId: externalSessionId,
  gameMeta,
  difficulty,
  rounds,
  targetDurationMs,
  onComplete,
  onAbort: _onAbort = () => undefined,
}: GameEngineContext): [GameEngineState, GameEngineActions] {
  const [state, setState] = useState<GameEngineState>({
    ...INITIAL_STATE,
    rounds,
  });
  const comboRef = useRef(0);
  const responseStartRef = useRef<number | null>(null);
  const correctCountRef = useRef(0);
  const sessionIdRef = useRef(externalSessionId ?? nanoid());

  const totalRounds = rounds.length;

  const transitionStatus = useCallback((status: GameSessionState) => {
    setState((prev) => ({ ...prev, status }));
  }, []);

  const start = useCallback(() => {
    comboRef.current = 0;
    correctCountRef.current = 0;
    responseStartRef.current = Date.now();
    transitionStatus('active');
  }, [transitionStatus]);

  const selectOption = useCallback(
    (index: number) => {
      setState((prev) => {
        if (prev.status !== 'active') {
          return prev;
        }

        const currentRound = prev.rounds[prev.roundIndex];
        const responseMs = responseStartRef.current
          ? Date.now() - responseStartRef.current
          : targetDurationMs;
        const isCorrect = index === currentRound.correctIndex;

        const { delta, combo } = calculateScore({
          selectionCorrect: isCorrect,
          responseTimeMs: responseMs,
          targetTimeMs: targetDurationMs,
          difficulty,
          combo: comboRef.current,
        });

        comboRef.current = combo;
        if (isCorrect) {
          correctCountRef.current += 1;
        }

        return {
          ...prev,
          score: Math.max(0, prev.score + delta),
          streak: isCorrect ? prev.streak + 1 : 0,
          accuracy: (correctCountRef.current ?? 0) / totalRounds,
          selectedIndex: index,
        };
      });
    },
    [difficulty, targetDurationMs, totalRounds],
  );

  const nextRound = useCallback(() => {
    setState((prev) => {
      if (prev.roundIndex >= prev.rounds.length - 1) {
        return prev;
      }

      responseStartRef.current = Date.now();

      return {
        ...prev,
        roundIndex: prev.roundIndex + 1,
        selectedIndex: null,
      };
    });
  }, []);

  const end = useCallback(() => {
    const now = Date.now();

    setState((prev) => {
      const payload = {
        id: sessionIdRef.current,
        gameId: gameMeta.id,
        startedAt: now - prev.elapsedMs,
        completedAt: now,
        difficulty,
        score: prev.score,
        accuracy: prev.accuracy,
        totalRounds,
        streak: prev.streak,
        metadata: {
          mode: gameMeta.mode,
        },
      };

      transitionStatus('summary');
      onComplete(payload);

      return {
        ...prev,
        status: 'summary',
      };
    });
  }, [difficulty, gameMeta.id, gameMeta.mode, onComplete, totalRounds, transitionStatus]);

  const actions = useMemo<GameEngineActions>(
    () => ({
      start,
      selectOption,
      nextRound,
      end,
    }),
    [end, nextRound, selectOption, start],
  );

  return [state, actions];
}
