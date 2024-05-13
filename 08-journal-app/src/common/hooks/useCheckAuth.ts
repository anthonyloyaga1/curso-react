import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { FirebaseAuth } from '../firebase/firebase';
import { login, logout } from '../store/auth';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useCheckAuth = () => {
  const { status } = useAppSelector((status) => status.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, photoURL, uid, email } = user;
      dispatch(login({ displayName, photoURL, uid, email }));
    });
  }, [dispatch]);

  return {
    status,
  };
};
