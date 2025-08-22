import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'info' });

  const showNotificationMessage = (message, type = 'info') => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const connectWallet = async () => {
    try {
      // In a real app, this would connect to MetaMask or another Web3 provider
      // For demo purposes, we'll simulate a successful connection
      const demoAddress = '0x1a2b...3c4d';
      
      setIsConnected(true);
      setWalletAddress(demoAddress);
      
      // Save to localStorage to persist the connection
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', demoAddress);
      
      showNotificationMessage('Wallet connected successfully!', 'success');
      return demoAddress;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showNotificationMessage('Failed to connect wallet. Please try again.', 'error');
      throw error;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    showNotificationMessage('Wallet disconnected', 'info');
  };

  // Check for existing wallet connection on mount
  useEffect(() => {
    const connected = localStorage.getItem('walletConnected');
    const address = localStorage.getItem('walletAddress');
    
    if (connected && address) {
      setIsConnected(true);
      setWalletAddress(address);
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
        showNotification,
        notification,
        showNotificationMessage
      }}
    >
      {children}
      {showNotification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'error' ? 'bg-red-600' : 
          notification.type === 'success' ? 'bg-green-600' : 'bg-blue-600'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
