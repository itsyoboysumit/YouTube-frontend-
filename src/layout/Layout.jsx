// src/layout/Layout.jsx
import React, { useState, useEffect } from 'react';
import { Header, Sidebar } from '../components';
import { SidebarContext } from '../context/SidebarContext';

const Layout = ({ children, onLoginClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, isMobile }}>
      <div className="bg-[#0f0f0f] min-h-screen relative">
        <Header onLoginClick={onLoginClick} /> {/* ✔ Pass login control */}
        <Sidebar />
        <main className={`pt-16 transition-all duration-300 ease-in-out text-white bg-[#0f0f0f] ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;
