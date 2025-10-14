import {
  collection,
  doc,
  getFirestore,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';

import type { GameRunPayload, GameId } from '@/features/games/types';
import { ensureFirebaseApp } from '@/config';

export type LeaderboardEntry = {
  gameId: GameId | 'overall';
  score: number;
  accuracy: number;
  averageResponseMs: number;
  streak: number;
  createdAt: Date;
};

function getDb() {
  const app = ensureFirebaseApp();
  if (!app) {
    throw new Error('Firebase app not initialised');
  }
  return getFirestore(app);
}

export async function recordGameRun(uid: string, run: GameRunPayload) {
  const db = getDb();
  const runRef = doc(collection(db, 'gameRuns'));

  await setDoc(runRef, {
    uid,
    ...run,
    createdAt: serverTimestamp(),
  });
}

export async function fetchLeaderboard(
  gameId: GameId | 'overall',
  scope: 'daily' | 'weekly' | 'all-time',
): Promise<LeaderboardEntry[]> {
  const db = getDb();
  const ref = collection(db, 'leaderboards', scope, gameId);
  const snapshot = await getDocs(query(ref, orderBy('score', 'desc'), limit(20)));

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      gameId,
      score: data.score as number,
      accuracy: data.accuracy as number,
      averageResponseMs: data.averageResponseMs as number,
      streak: data.streak as number,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    };
  });
}
