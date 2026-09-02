import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

/**
 * Send password reset email using Firebase Auth
 */
export async function resetPasswordByEmail(email: string): Promise<void> {
  if (!email || !email.trim()) {
    throw new Error('Alamat email wajib diisi.');
  }
  await sendPasswordResetEmail(auth, email.trim());
}

// Validate Connection to Firestore as required by firebase-integration skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase Firestore connected successfully!");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    } else {
      console.log("Firestore connection test completed (document may not exist, but server reached).");
    }
  }
}

testConnection();

