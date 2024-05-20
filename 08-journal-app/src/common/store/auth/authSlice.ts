import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from 'firebase/auth';

export interface AuthState {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  data: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  status: 'loading',
  data: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.status = 'authenticated';
      state.loading = false;
      state.data = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'unauthenticated';
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.status = 'unauthenticated';
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
