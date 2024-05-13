import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useCheckAuth } from './common/hooks/useCheckAuth';
import { CheckingAuth } from './common/ui/components/CheckingAuth';
import { AuthRoutes } from './modules/auth/routes/AuthRoutes';
import { JournalRoutes } from './modules/journal/routes/JournalRoutes';

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === 'checking') return <CheckingAuth />;

  return (
    <Routes>
      {status === 'authenticated' ? <Route path="/*" element={<JournalRoutes />} /> : <Route path="/auth/*" element={<AuthRoutes />} />}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
