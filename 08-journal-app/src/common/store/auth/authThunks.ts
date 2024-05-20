import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { AppThunk } from '../../types/AppThunk';
import { clearNotesLogout } from '../journal/journalSlice';
import { loginFailure, loginStart, loginSuccess, logout } from './authSlice';

export const startGoogleSignIn = (): AppThunk => {
  return async (dispatch) => {
    dispatch(loginStart());
    const result = await signInWithGoogle();
    if (typeof result === 'string') return dispatch(loginFailure(result));
    const { email, displayName, uid, phoneNumber, photoURL, providerId } = result;
    dispatch(loginSuccess({ displayName, uid, phoneNumber, photoURL, providerId, email }));
  };
};

export const startEmailPasswordSignIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    dispatch(loginStart());
    const result = await signInWithEmailPassword(email, password);
    if (typeof result === 'string') return dispatch(loginFailure(result));
    const { displayName, uid, phoneNumber, photoURL, providerId } = result;
    dispatch(loginSuccess({ displayName, uid, phoneNumber, photoURL, providerId, email }));
  };
};

export const startCreatingUserWithEmailPassword = (email: string, password: string, displayName: string): AppThunk => {
  return async (dispatch) => {
    dispatch(loginStart());
    const result = await registerUserWithEmailPassword({ displayName, password, email });
    if (typeof result === 'string') return dispatch(loginFailure(result));
    const { uid, phoneNumber, photoURL, providerId } = result;
    dispatch(loginSuccess({ displayName, uid, phoneNumber, photoURL, providerId, email }));
  };
};

export const startLogout = (): AppThunk => {
  return async (dispatch) => {
    const result = await logoutFirebase();
    if (typeof result === 'string') return dispatch(loginFailure(result));
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
