import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';


const DashBoardHome = () => {

  const { role } = useUserRole();



  if (role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashBoardHome;