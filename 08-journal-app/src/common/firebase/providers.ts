import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

import { FirebaseAuth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: any) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: any) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = result.user;
    await updateProfile(result.user, { displayName });
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
