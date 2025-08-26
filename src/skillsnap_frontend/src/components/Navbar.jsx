import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);
  const [editProfile, setEditProfile] = useState({ ...defaultProfile });
  const fileInputRef = useRef(null);
  const profileRef = useRef(null);
  const modalRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setEditProfile(parsedProfile);
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const connectWallet = async () => {
    try {
      // Show notification that the feature is not yet available
      showNotificationMessage(
        "Fitur wallet connection belum tersedia. Akan segera hadir!",
        "info"
      );

      // Simulate loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would connect to the wallet here
      // For example, using Web3Modal, Web3React, or similar
      // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Commented out actual connection since the feature is not available yet
      // setIsWalletConnected(true);
      // showNotificationMessage('Wallet connected successfully!', 'success');
    } catch (error) {
      console.error("Error connecting wallet:", error);
      showNotificationMessage(
        "Gagal terhubung ke wallet. Silakan coba lagi nanti.",
        "error"
      );
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    showNotificationMessage("Wallet disconnected", "info");
  };

  const showNotificationMessage = (message, type = "info") => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfile((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editProfile.name.trim()) {
      showNotificationMessage("Nama tidak boleh kosong", "error");
      return;
    }

    const updatedProfile = { ...editProfile };
    setProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setIsEditModalOpen(false);
    showNotificationMessage("Profil berhasil diperbarui", "success");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Features", path: "/features" },
    { name: "Web3", path: "/web3" },
    { name: "AI", path: "/ai" },
    { name: "Commitments", path: "/commitments" },
  ];

  return (
    <nav className="bg-black/70 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">SkillSnap</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered with Glow Effect */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-80 transition duration-300 pointer-events-none"></div>
              <div className="relative flex items-center space-x-4 bg-black/80 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-purple-500/20">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative px-2 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group-hover:text-white"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Login/Register, Wallet & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login/Register Button */}
            <Link
              to="/"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 text-sm shadow-lg shadow-purple-500/20"
            >
              {/* <UserIcon /> */}
              <span className="ml-2">Login/Register</span>
            </Link>

            {/* Wallet Connection Button */}
            {isWalletConnected ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium text-gray-300">
                    Connected
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 text-sm shadow-lg shadow-purple-500/20"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Connect Wallet
              </button>
            )}

            {/* Profile Dropdown
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

              Dropdown Menu
              {isProfileOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <div className="relative group">
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
                          <p className="text-xs text-gray-400">
                            {profile.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        // Uncomment the line below when you have a settings page
                        // navigate('/settings');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <span className="w-4 h-4 mr-3 flex items-center justify-center">
                        <SettingsIcon />
                      </span>
                      Settings
                    </button>
                  </div>
                  <div className="py-1 border-t border-gray-700">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center"
                      onClick={() => {
                        // Handle logout
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
            </div> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Glow Effect */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="relative px-3 pt-2 pb-3 space-y-2 sm:px-4 bg-black/95 backdrop-blur-sm border-t border-purple-500/20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg opacity-60 blur transition duration-300 pointer-events-none"></div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative block px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-700">
            {/* Login/Register Button */}
            <Link
              to="/LoginRegisterPage"
              className="w-full flex items-center justify-center px-4 py-2 text-center rounded-md text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition-opacity mb-2"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon />
              <span className="ml-2">Login/Register</span>
            </Link>
            <div className="mt-2">
              {isWalletConnected ? (
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium">
                        Wallet Connected
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setIsOpen(false);
                      }}
                      className="text-sm text-primary hover:text-opacity-80"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    connectWallet();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 text-center rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-4">Edit Profil</h2>
            <form onSubmit={handleSaveProfile}>
              <div className="mb-4 flex flex-col items-center">
                <div
                  className="w-24 h-24 rounded-full bg-gray-700 mb-4 overflow-hidden cursor-pointer relative group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {editProfile.photo ? (
                    <img
                      src={editProfile.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserIcon />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs text-center">
                      Ganti Foto
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={editProfile.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nama Anda"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editProfile.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="email@contoh.com"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
