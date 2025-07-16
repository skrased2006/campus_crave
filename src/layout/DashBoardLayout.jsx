import React, { useState } from 'react';
import Sidebar from '../pages/DashBoard/Sidebar';
import { Outlet } from 'react-router';

const DashBoardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:shadow-none`}
      >
        <Sidebar />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Hamburger button on mobile */}
        <header className="md:hidden p-4 shadow-md bg-white flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
            aria-label="Open sidebar"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="ml-4 font-semibold text-lg">Dashboard</h1>
        </header>

        {/* Main Outlet */}
        <main className="p-4 overflow-y-auto bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
