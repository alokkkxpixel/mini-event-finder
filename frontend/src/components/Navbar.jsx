import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const { isAuthenticated, logout ,loading} = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`)         ``
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-[#6A3DE4] text-white' : 'text-[#A0A0A0] hover:bg-[#1E1E1E] hover:text-white'
    }`;
    
  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-[#4718cb] text-white' : 'text-[#A0A0A0] hover:bg-[#1E1E1E] hover:text-white'
    }`;

  return (
    <nav className="bg-[#4718cb] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              Event<span className="text-primary">Finder</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to="/my-events" className={navLinkClass}>My Events</NavLink>
                  <NavLink to="/create-event" className={navLinkClass}>Create Event</NavLink>
                  <button
                    onClick={handleLogout}
                    className="bg-[#FF6B6B] text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                  <NavLink to="/register" className="bg-[#4718cb] text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">Register</NavLink>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#1E1E1E] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            {isAuthenticated ? (
              <>
                 <NavLink to="/my-events" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>My Events</NavLink>
                 <NavLink to="/create-event" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Create Event</NavLink>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full text-left block bg-[#FF6B6B] text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Login</NavLink>
                <NavLink to="/register" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Register</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;