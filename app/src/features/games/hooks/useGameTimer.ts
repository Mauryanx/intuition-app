import { useEffect, useRef, useState } from 'react';

export function useGameTimer(active: boolean, intervalMs = 1000) {
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    const start = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - start);
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [active, intervalMs]);

  return elapsed;
}
