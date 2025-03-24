import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaHome, FaUser, FaSignOutAlt, FaPlusSquare } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Home Link */}
        <Link to="/" className="flex items-center gap-2 hover:text-yellow-300 transition duration-300">
          <FaHome className="text-2xl" />
          <span className="text-xl font-extrabold tracking-wide">Health Tracker</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-lg">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 hover:text-yellow-300 transition duration-300"
              >
                <FaPlusSquare className="text-xl" /> <span>Dashboard</span>
              </Link>

              <Link 
                to="/profile" 
                className="flex items-center gap-2 hover:text-yellow-300 transition duration-300"
              >
                <FaUser className="text-xl" /> <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-400 transition duration-300"
              >
                <FaSignOutAlt className="text-xl" /> <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="hover:text-yellow-300 transition duration-300 text-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
