import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

import { FirebaseAuth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    return result.user;
  } catch (error: any) {
    return error.message as string;
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    return result.user;
  } catch (error: any) {
    return error.message as string;
  }
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    await updateProfile(result.user, { displayName });
    return { ...result.user, displayName };
  } catch (error: any) {
    return error.message as string;
  }
};

export const logoutFirebase = async () => {
  try {
    await FirebaseAuth.signOut();
  } catch (error: any) {   
    return error.message as string;
  }
};
