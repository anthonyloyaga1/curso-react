import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface AuthState {
  status?: string;
  uid?: string | null;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  errorMessage?: any | null;
}

const initialState: AuthState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<AuthState>) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.email = payload.email;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.displayName = null;
      state.photoURL = null;
      state.email = null;
      state.errorMessage = null;
    },
    logoutWithError: (state, { payload }: PayloadAction<{ errorMessage: string }>) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.displayName = null;
      state.photoURL = null;
      state.email = null;
      state.errorMessage = payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});
export const { login, logout, logoutWithError, checkingCredentials } = authSlice.actions;

export const statusAuthentication = (state: RootState) => state.auth.status;
