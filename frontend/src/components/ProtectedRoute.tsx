import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: Array<'user' | 'admin' | 'cfo' | 'founder'>;
  userRole?: string; // We will get this from your Auth System later
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, userRole }) => {
  // If not logged in, go to Sign In
  if (!userRole) {
    return <Navigate to="/signin" replace />;
  }

  // If logged in but rank is too low, go to Dashboard
  if (!allowedRoles.includes(userRole as any)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Access Granted
  return <Outlet />;
};

export default ProtectedRoute;
