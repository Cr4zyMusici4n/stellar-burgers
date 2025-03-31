import { selectIsAuth } from '@selectors';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to='/login' />;
  }
  return children;
};
