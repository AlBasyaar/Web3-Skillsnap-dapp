import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiZap } from 'react-icons/fi';
import Notifications from './Notifications';
import UpgradeBanner from './UpgradeBanner';

const Navbar = ({ searchTerm, onSearchChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm || '');
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const navigate = useNavigate();
  const upgradeRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (upgradeRef.current && !upgradeRef.current.contains(event.target)) {
        setShowUpgrade(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      onSearchChange(localSearch);
      // Navigate to home if not already there
      if (location.pathname !== '/home') {
        navigate('/home');
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-white/10' 
          : 'bg-gray-900/80 backdrop-blur-md'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          
          {/* Mobile: Space for sidebar toggle */}
          <div className="w-12 md:w-0 flex-shrink-0"></div>
          
          {/* Search Bar */}
          <div className="flex-1 mx-4 max-w-lg md:max-w-xl">
            <div className="w-full">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm md:text-base"
                    placeholder="Search for jobs, courses, and more"
                  />
                </div>
              </form>
            </div>
          </div>
          
          {/* Upgrade and Notifications - ALWAYS VISIBLE */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            
            {/* Upgrade Button */}
            <div className="relative" ref={upgradeRef}>
              <button 
                onClick={() => setShowUpgrade(!showUpgrade)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-medium rounded-full hover:from-yellow-300 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 transition-all duration-200"
              >
                <FiZap className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Upgrade</span>
                <span className="sm:hidden">Pro</span>
              </button>
              
              {showUpgrade && (
                <div className="absolute right-0 mt-2 w-80 z-50">
                  <UpgradeBanner />
                </div>
              )}
            </div>
            
            {/* Notifications */}
            <div ref={notificationRef}>
              <Notifications />
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;