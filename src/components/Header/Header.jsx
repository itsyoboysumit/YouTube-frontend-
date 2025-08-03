import React, { useContext, useState } from "react";
import { Search, Menu, Youtube, Mic } from "lucide-react";
import { SidebarContext } from "../../context/SidebarContext";
import { useAuth } from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import AvatarDropdown from "./AvatarDropdown.jsx";
import useModal from "../../hooks/useModal";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { user } = useAuth();
  const { openLoginModal } = useModal();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false); 

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true); 

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      navigate(`/search?query=${encodeURIComponent(transcript.trim())}`);
      setSearchQuery("");
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false); 
    };
  };

  return (
    <header className="fixed top-0 left-0 right-0 opacity-95 bg-[#0f0f0f] text-white flex justify-between items-center px-2 sm:px-4 py-2 z-50">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-zinc-800"
        >
          <Menu size={24} />
        </button>

        <a
          href="#"
          className="hidden sm:flex items-center space-x-2 ml-2 sm:ml-4"
        >
          <Youtube size={28} className="text-red-600" />
          <span className="text-xl sm:text-2xl font-semibold hidden md:block">
            YouTube
          </span>
        </a>
      </div>

      <div className="flex-1 flex justify-center px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-md flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search"
            className="w-full bg-[#121212] border border-zinc-700 rounded-l-full px-3 py-1.5 focus:outline-none focus:border-zinc-50 text-white text-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-zinc-800 border border-zinc-700 border-l-0 px-4 py-1.5 rounded-r-full hover:bg-zinc-700"
          >
            <Search size={20} />
          </button>

          <button
            onClick={handleVoiceSearch}
            className={`ml-2 p-2 rounded-full hidden sm:inline-flex transition-colors duration-200 ${
              isListening ? "bg-red-600" : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            <Mic size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2">
        <Link to="/upload" className="hidden sm:block">
          <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-800 border border-zinc-700">
            <RiVideoAddLine className="w-5 h-5 text-white" />
            <span className="hidden md:inline text-sm font-semibold">
              Create
            </span>
          </button>
        </Link>

        {user ? (
          <AvatarDropdown />
        ) : (
          <button onClick={openLoginModal}>
            <FaUserCircle className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-300" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
