import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'info' });

  const connectWallet = async () => {
    try {
      // Show notification that the feature is not yet available
      showNotificationMessage('Fitur wallet connection belum tersedia. Akan segera hadir!', 'info');
      
      // Simulate loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would connect to the wallet here
      // For example, using Web3Modal, Web3React, or similar
      // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Commented out actual connection since the feature is not available yet
      // setIsWalletConnected(true);
      // showNotificationMessage('Wallet connected successfully!', 'success');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showNotificationMessage('Gagal terhubung ke wallet. Silakan coba lagi nanti.', 'error');
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    showNotificationMessage('Wallet disconnected', 'info');
  };

  const showNotificationMessage = (message, type = 'info') => {
    setNotification({ message, type });
    setShowNotification(true);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Web3', path: '/web3' },
    { name: 'AI', path: '/ai' },
    { name: 'Commitments', path: '/commitments' },
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
          
          {/* Wallet Connection Button - Right side */}
          <div className="hidden md:block">
            {isWalletConnected ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">Connected</span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 text-sm shadow-lg shadow-purple-500/20"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Glow Effect */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
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
            {isWalletConnected ? (
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium">Wallet Connected</span>
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
                className="w-full flex items-center justify-center px-4 py-2 text-center rounded-md text-base font-medium text-black bg-white hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Connect Wallet
              </button>
            )}
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
    </nav>
  );
};

export default Navbar;
