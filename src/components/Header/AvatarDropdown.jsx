// src/components/AvatarDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Fade } from "react-awesome-reveal";

const AvatarDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={user?.avatar}
        alt="avatar"
        onClick={toggleDropdown}
        className="w-8 h-8 rounded-full cursor-pointer border border-gray-600"
      />
      {open && (
        <Fade duration={500} triggerOnce>
          <div className="absolute  right-0 mt-2 w-56 bg-[#1f1f1f]/90 border border-gray-700 text-white rounded-xl shadow-lg z-50">
            <ul className="p-2">
              <li
                onClick={() => {
                  setOpen(false);
                  navigate("/channel");
                }}
                className="flex items-center gap-2 p-2 hover:bg-zinc-600 cursor-pointer rounded"
              >
                <User size={18} /> My Profile
              </li>
              <li
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 p-2 hover:bg-zinc-600 cursor-pointer rounded"
              >
                <LayoutDashboard size={18} /> Studio
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 hover:bg-zinc-600 cursor-pointer rounded text-red-500 font-bold hover:text-zinc-50"
              >
                <LogOut size={18} /> Logout
              </li>
            </ul>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default AvatarDropdown;
