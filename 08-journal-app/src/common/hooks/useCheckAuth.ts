import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { FirebaseAuth } from '../firebase/firebase';
import { loginSuccess, logout } from '../store/auth';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useCheckAuth = () => {
  const { status } = useAppSelector((status) => status.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, uid, phoneNumber, photoURL, providerId, email } = user;
      dispatch(loginSuccess({ displayName, uid, phoneNumber, photoURL, providerId, email }));
    });
  }, [dispatch]);

  return {
    status,
  };
};
