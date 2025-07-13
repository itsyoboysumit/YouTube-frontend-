// src/components/Sidebar.js
import React, { useContext } from 'react';
import {
  Menu,
  Youtube,
  Clapperboard,
  Home,
  Flame,
  Video,
  History,
  User,
} from 'lucide-react';
import { SidebarContext } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarOpen, isMobile, toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();

  // Full sidebar item
  const SidebarItem = ({ icon, name, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full text-left space-x-6 px-4 py-3 rounded-lg hover:bg-zinc-800 ${
        active ? 'bg-zinc-700' : ''
      }`}
    >
      {icon}
      <span className="font-medium">{name}</span>
    </button>
  );

  // Collapsed sidebar item
  const CollapsibleSidebarItem = ({ icon, name, onClick }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center py-4 rounded-lg hover:bg-zinc-800 w-full"
    >
      {icon}
      <span className="text-xs mt-1">{name}</span>
    </button>
  );

  // 🔒 Hide sidebar entirely on mobile when closed
  if (isMobile && !isSidebarOpen) return null;

  // 📏 Collapsed mode (icon-only)
  if (!isSidebarOpen) {
    return (
      <aside className="fixed top-16 left-0 bg-[#0f0f0f] text-white h-full w-20 flex flex-col items-center py-4 z-40">
        <CollapsibleSidebarItem icon={<Home size={24} />} name="Home" onClick={() => navigate('/')} />
        <CollapsibleSidebarItem icon={<Flame size={24} />} name="Trending" />
        <CollapsibleSidebarItem icon={<Clapperboard size={24} />} name="Subscriptions" />
        <CollapsibleSidebarItem icon={<History size={24} />} name="History" />
      </aside>
    );
  }

  // 🧱 Full sidebar
  return (
    <aside
      className={`fixed top-0 left-0 bg-[#0f0f0f] text-white h-full w-64 p-4 z-50 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center space-x-4 mb-6 pt-2">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-zinc-800">
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Youtube size={32} className="text-red-600" />
          <span className="text-2xl font-semibold">YouTube</span>
        </div>
      </div>

      <nav>
        <SidebarItem icon={<Home size={24} />} name="Home" active onClick={() => navigate('/')} />
        <SidebarItem icon={<Flame size={24} />} name="Trending" />
        <SidebarItem icon={<Clapperboard size={24} />} name="Subscriptions" />

        <hr className="my-4 border-zinc-700" />

        <h3 className="px-4 text-lg font-semibold mb-2">You</h3>
        <SidebarItem icon={<User size={24} />} name="Your channel" />
        <SidebarItem icon={<History size={24} />} name="History" />
        <SidebarItem icon={<Video size={24} />} name="Your videos" />

        <hr className="my-4 border-zinc-700" />

        <h3 className="px-4 text-lg font-semibold mb-2">Subscriptions</h3>
        <SidebarItem
          icon={<img src="https://placehold.co/24x24/ff0000/ffffff?text=C" className="rounded-full" />}
          name="Channel 1"
        />
        <SidebarItem
          icon={<img src="https://placehold.co/24x24/00ff00/ffffff?text=C" className="rounded-full" />}
          name="Channel 2"
        />

        <hr className="my-4 border-zinc-700" />

        <div className="text-xs text-zinc-400 px-4 space-x-2">
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Press</a>
          <a href="#" className="hover:text-white">Copyright</a>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
