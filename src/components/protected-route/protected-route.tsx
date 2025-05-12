import { selectIsAuth } from '@selectors';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  isAuthPage?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  isAuthPage,
  children
}: ProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  if (!isAuth && !isAuthPage) {
    return <Navigate to='/login' state={{ from: location.pathname }} />;
  }

  if (isAuth && isAuthPage) {
    return <Navigate to={location.state?.from ?? '/'} />;
  }

  return children;
};
