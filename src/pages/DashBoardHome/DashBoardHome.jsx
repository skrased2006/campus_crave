import React from 'react';
import useUserRole from '../../hooks/useUserRole';

const DashBoardHome = () => {

  const { role, roleLoading } = useUserRole();



  if (role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashBoardHome;