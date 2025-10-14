import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const submitRun = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  const { uid, run } = data ?? {};
  if (!uid || uid !== context.auth.uid) {
    throw new functions.https.HttpsError('permission-denied', 'Cannot submit for another user');
  }

  if (!run || typeof run.score !== 'number') {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid payload');
  }

  const db = admin.firestore();
  await db.collection('gameRuns').add({
    uid,
    ...run,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { ok: true };
});
