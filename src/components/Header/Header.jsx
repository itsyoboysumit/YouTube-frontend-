// src/components/Header.jsx
import React, { useContext } from "react";
import { Search, Menu, Youtube, Video, Bell, Mic } from "lucide-react";
import { SidebarContext } from "../../context/SidebarContext";
import { useAuth } from "../../hooks/useAuth";
import AvatarDropdown from "./AvatarDropdown.jsx";

const Header = ({ onLoginClick }) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0f0f0f] text-white flex justify-between items-center px-4 py-2 z-50">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-zinc-800"
        >
          <Menu size={24} />
        </button>
        <a href="#" className="flex items-center space-x-2">
          <Youtube size={32} className="text-red-600" />
          <span className="text-2xl font-semibold hidden md:block">
            YouTube
          </span>
        </a>
      </div>
      <div className="flex-1 flex justify-center px-4 lg:px-16">
        <div className="w-full max-w-2xl flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#121212] border border-zinc-700 rounded-l-full px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
          />
          <button className="bg-zinc-800 border border-zinc-700 border-l-0 px-6 py-2 rounded-r-full hover:bg-zinc-700">
            <Search size={24} />
          </button>
          <button className="ml-4 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700">
            <Mic size={24} />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-zinc-800">
          <Video size={24} />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-800 relative">
          <Bell size={24} />
          <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
            3
          </span>
        </button>
        {user ? (
          <AvatarDropdown />
        ) : (
          <button onClick={onLoginClick}>
            <img
              src="https://placehold.co/40x40/7e22ce/ffffff?text=U"
              alt="User Avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-zinc-700"
            />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
