import React from 'react';
import Sidebar from '../pages/DashBoard/Sidebar';
import Topbar from '../pages/DashBoard/Topbar';
import { Outlet } from 'react-router';

const DashBoardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">

        <main className="p-4 overflow-y-auto bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;