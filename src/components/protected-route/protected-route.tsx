import { selectIsAuth } from '@selectors';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  console.log(location.pathname);

  if (!isAuth) {
    return <Navigate to='/login' state={location.pathname} />;
  }

  return children;
};
