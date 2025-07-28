import React, { useContext } from "react";
import { Search, Menu, Youtube, Video, Bell, Mic } from "lucide-react";
import { SidebarContext } from "../../context/SidebarContext";
import { useAuth } from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import AvatarDropdown from "./AvatarDropdown.jsx";
import useModal from "../../hooks/useModal";
import { Link } from "react-router-dom";
const Header = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { user } = useAuth();
  const { openLoginModal } = useModal();

  return (
    <header className="fixed top-0 left-0 right-0 opacity-95 bg-[#0f0f0f] text-white flex justify-between items-center px-4 py-2 z-50">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-zinc-800"
        >
          <Menu size={24} />
        </button>
        <a href="#" className="flex items-center space-x-2 ml-6">
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
            className="w-full bg-[#121212] border border-zinc-700 rounded-l-full px-4 py-2 focus:outline-none focus:border-red-500 text-white"
          />
          <button className="bg-zinc-800 border border-zinc-700 border-l-0 px-6 py-2 rounded-r-full hover:bg-zinc-700">
            <Search size={24} />
          </button>
          <button className="ml-4 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700">
            <Mic size={24} />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-2">
        <Link to="/upload">
          <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-800 border border-zinc-700">
            <RiVideoAddLine className="w-6 h-6 text-white" />
            <span className="hidden md:inline text-base font-semibold">
              Create
            </span>
          </button>
        </Link>

        {user ? (
          <AvatarDropdown />
        ) : (
          <button onClick={openLoginModal}>
            <FaUserCircle className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-300" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
