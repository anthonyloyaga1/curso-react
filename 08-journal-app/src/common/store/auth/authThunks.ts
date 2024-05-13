import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { AppThunk } from '../../types/AppThunk';
import { checkingCredentials, login, logout, logoutWithError } from './authSlice';

export const checkingAuth = (email = '', password = ''): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = (): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logoutWithError({ errorMessage: result.errorMessage }));
    dispatch(login(result));
  };
};

export const startEmailPasswordSignIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithEmailPassword(email, password);
    if (!result.ok) return dispatch(logoutWithError({ errorMessage: result.errorMessage }));
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ displayName, password, email });
    if (!ok) return dispatch(logoutWithError({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = (): AppThunk => {
  return async (dispatch) => {
    try {
      await logoutFirebase();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
};
