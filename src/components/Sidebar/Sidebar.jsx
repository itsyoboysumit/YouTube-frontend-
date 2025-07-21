// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import {
  Menu,
  Youtube,
  Home,
  History,
  Video,
  User,
  PlusSquare,
  Heart,
  LayoutDashboard,
  ListVideo
} from 'lucide-react';
import { SidebarContext } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarOpen, isMobile, toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();

  if (isMobile && !isSidebarOpen) return null;

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, route: '/' },
    { name: 'Your Channel', icon: <User size={20} />, route: '/channel' },
    { name: 'Your Videos', icon: <Video size={20} />, route: '/my-videos' },
    { name: 'Liked Videos', icon: <Heart size={20} />, route: '/liked' },
    { name: 'Watch History', icon: <History size={20} />, route: '/history' },
    { name: 'Playlists', icon: <ListVideo size={20} />, route: '/playlists' },
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, route: '/dashboard' },
    { name: 'Upload Video', icon: <PlusSquare size={20} />, route: '/upload' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bg-[#0f0f0f] text-white h-full transition-[width] duration-300 ease-in-out overflow-hidden z-50 flex flex-col justify-between ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top: Logo & Toggle */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200"
          >
            <Menu size={20} />
          </button>
          <div
            className={`flex items-center space-x-2 transition-all duration-300 ${
              isSidebarOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <Youtube size={28} className="text-red-600" />
            <span className="text-xl font-semibold">YouTube</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ name, icon, route }) => (
            <button
              key={name}
              onClick={() => navigate(route)}
              className="flex items-center hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors duration-200 text-sm"
            >
              <span>{icon}</span>
              <span
                className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {name}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom: Footer */}
      <div className="text-xs text-zinc-400 mt-4 p-4">
        <div className="relative h-4 flex justify-center items-center">
          <span
            className={`absolute transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            © 2025 Sumit Kumar
          </span>
          <span
            className={`absolute text-[10px] transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            ©
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
