import { getFunctions, httpsCallable } from 'firebase/functions';

import type { GameRunPayload } from '@/features/games/types';
import { ensureFirebaseApp } from '@/config';

const SUBMIT_RUN = 'submitRun';

function getFns() {
  const app = ensureFirebaseApp();
  if (!app) {
    throw new Error('Firebase app not initialised');
  }
  return getFunctions(app);
}

export async function submitGameRun(uid: string, run: GameRunPayload) {
  const functions = getFns();
  const callable = httpsCallable(functions, SUBMIT_RUN);
  await callable({ uid, run });
}
