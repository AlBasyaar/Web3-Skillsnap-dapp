import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

// Inline SVG Icons
const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const LogOutIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const ChevronDownIcon = ({ isOpen }) => (
  <svg
    className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${
      isOpen ? "transform rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

// Default profile data
const defaultProfile = {
  name: "John Doe",
  email: "john@example.com",
  photo: null,
};

// Icons
const HomeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const ChatIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const CourseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const JobIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State terpisah untuk mobile menu
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);
  const [editProfile, setEditProfile] = useState({ ...defaultProfile });

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);

      // Jika berubah dari mobile ke desktop, tutup mobile menu
      if (wasMobile && !nowMobile) {
        setMobileMenuOpen(false);
        document.body.classList.remove("sidebar-open");
      }

      // Update body class untuk desktop
      if (!nowMobile) {
        document.body.classList.toggle("sidebar-expanded", isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isOpen]);

  // Toggle sidebar - berbeda untuk mobile dan desktop
  const toggleSidebar = () => {
    if (isMobile) {
      const newMobileMenuOpen = !mobileMenuOpen;
      setMobileMenuOpen(newMobileMenuOpen);
      document.body.classList.toggle("sidebar-open", newMobileMenuOpen);
    } else {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      document.body.classList.toggle("sidebar-expanded", newIsOpen);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobile &&
        mobileMenuOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".sidebar-toggle")
      ) {
        setMobileMenuOpen(false);
        document.body.classList.remove("sidebar-open");
      }

      // Close dropdown when clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, mobileMenuOpen]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleOpenEditModal = () => {
    setEditProfile(profile);
    setIsProfileOpen(false);
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
      document.body.classList.remove("sidebar-open");
    }
  };

  const menuItems = [
    { name: "Home", path: "/home", icon: <HomeIcon /> },
    { name: "AI Chat", path: "/ai-chat", icon: <ChatIcon /> },
    { name: "Course", path: "/course", icon: <CourseIcon /> },
    { name: "Job Nearby", path: "/job-nearby", icon: <JobIcon /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="sidebar-toggle fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-gray-900 hover:bg-gray-700 focus:outline-none text-white"
          aria-label="Toggle sidebar"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      )}

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-4 left-0 bottom-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-40 shadow-2xl transition-all duration-300 ease-in-out flex flex-col rounded-r-xl overflow-hidden
          ${
            isMobile
              ? `w-64 transform ${
                  mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : `md:relative ${isOpen ? "md:w-64" : "md:w-20"}`
          }`}
      >
        {/* Header untuk Mobile dan Desktop */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700 bg-gray-900/30 backdrop-blur-sm mt-2">
          {(isOpen || mobileMenuOpen) && (
            <div
              className={`flex items-center space-x-3 ${
                isMobile ? "ml-12" : ""
              }`}
            >
              <img
                src={logo}
                alt="SkillSnap Logo"
                className="h-9 w-9 object-cover rounded-lg shadow-md"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                SkillSnap
              </h1>
            </div>
          )}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-700/50 focus:outline-none transition-colors duration-200 text-gray-400 hover:text-white"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        <nav className="p-4 overflow-y-auto flex-1 custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.name}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    onClick={closeSidebarOnMobile}
                    className={`group flex items-center p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-white shadow-lg border-l-4 border-purple-500"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:pl-4"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 transition-transform duration-300 ${
                        isActive
                          ? "text-purple-400 scale-110"
                          : "group-hover:scale-110 group-hover:text-white"
                      }`}
                    >
                      {React.cloneElement(item.icon, {
                        className: `w-5 h-5 ${
                          isActive
                            ? "text-purple-400"
                            : "text-gray-400 group-hover:text-white"
                        }`,
                      })}
                    </span>
                    {(isOpen || mobileMenuOpen) && (
                      <span
                        className={`ml-4 font-medium transition-all duration-300 ${
                          isActive ? "text-white" : "group-hover:text-white"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                    {hoveredItem === item.name && !isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="mt-auto p-4 border-t border-gray-700/50 bg-gray-900/30 backdrop-blur-sm">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                <UserIcon />
              </div>
              <ChevronDownIcon isOpen={isProfileOpen} />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
                {/* Profile Info */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white overflow-hidden">
                      {profile.photo ? (
                        <img
                          src={profile.photo}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserIcon />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {profile.name}
                      </p>
                      <p className="text-xs text-gray-400">{profile.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={handleOpenEditModal}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <span className="w-4 h-4 mr-3 flex items-center justify-center">
                      <UserIcon />
                    </span>
                    Edit Profil
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfileOpen(false);
                      showNotificationMessage(
                        "Membuka halaman pengaturan...",
                        "info"
                      );
                      // navigate('/settings') bila sudah ada halaman settings
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <span className="w-4 h-4 mr-3 flex items-center justify-center">
                      <SettingsIcon />
                    </span>
                    Settings
                  </button>
                </div>

                {/* Sign Out */}
                <div className="py-1 border-t border-gray-700">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center"
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                  >
                    <span className="w-4 h-4 mr-3 flex items-center justify-center">
                      <LogOutIcon />
                    </span>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
