import React from 'react';
import { useSelector } from '../../services/store';
import { selectIsAuth } from '@selectors';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return children;
};
