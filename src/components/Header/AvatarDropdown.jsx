// src/components/AvatarDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AvatarDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleDropdown = () => setOpen(!open);

  // Close dropdown on outside click
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
    logout(); // your logout logic
    navigate("/"); // redirect after logout
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={user?.avatar}
        alt="avatar"
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer border border-gray-600"
      />
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-[#1f1f1f] border border-gray-700 text-white rounded-xl shadow-lg z-50">
          <ul className="p-2">
            <li
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] cursor-pointer rounded"
            >
              <User size={18} /> My Profile
            </li>
            <li
              onClick={() => navigate("/studio")}
              className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] cursor-pointer rounded"
            >
              <LayoutDashboard size={18} /> Studio
            </li>
            <li
              onClick={() => navigate("")}
              className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] cursor-pointer rounded"
            >
              <Settings size={18} /> Settings
            </li>
            <li
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] cursor-pointer rounded text-red-400"
            >
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
