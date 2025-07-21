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
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarOpen, isMobile, toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavClick = (route) => {
    navigate(route);
    if (isMobile) {
      setTimeout(() => toggleSidebar(), 250);
    }
  };

  return (
    <>
      {/* Backdrop overlay on mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bg-[#0f0f0f] text-white h-full z-50 flex flex-col justify-between transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'w-20'}
          ${isSidebarOpen && !isMobile ? 'w-58' : ''}
        `}
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

          {/* Navigation Items */}
          <nav className="flex flex-col space-y-2">
            {navItems.map(({ name, icon, route }) => {
              const isActive = location.pathname === route;
              return (
                <button
                  key={name}
                  onClick={() => handleNavClick(route)}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-sm ${
                    isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800'
                  }`}
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
              );
            })}
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
    </>
  );
};

export default Sidebar;
