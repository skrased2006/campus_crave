import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  // Show loading spinner while auth or role is loading
  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // If not logged in or not admin, redirect to forbidden page
  if (!user || role !== 'admin') {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  // If admin, show protected component
  return children;
};

export default AdminRoute;
