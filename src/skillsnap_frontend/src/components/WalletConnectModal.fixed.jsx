import React, { useState, useEffect } from 'react';
import { FaPlug, FaFingerprint, FaTimes, FaEthereum } from 'react-icons/fa';
import { AuthClient } from '@dfinity/auth-client';
import './WalletConnectModal.css';
import Notification from './Notification';

const WalletConnectModal = ({ onClose, isRegister = false, onWalletConnected }) => {
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [isLoading, setIsLoading] = useState({
    internetIdentity: false,
    plug: false,
    metaMask: false
  });
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    setIsMetaMaskInstalled(!!window.ethereum);
  }, []);

  // Handle notification display
  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
  };

  // Internet Identity Connection
  const handleInternetIdentityConnect = async () => {
    setIsLoading(prev => ({ ...prev, internetIdentity: true }));
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          
          // Store the principal in localStorage or context/state
          localStorage.setItem('walletPrincipal', principal);
          localStorage.setItem('walletType', 'internet-identity');
          
          if (isRegister) {
            // Call your registration API here
            // await registerUser(principal, 'internet-identity');
            showNotification('Registration successful!', 'success');
          } else {
            showNotification('Connected with Internet Identity', 'success');
          }
          
          if (onWalletConnected) {
            onWalletConnected(principal, 'internet-identity');
          }
          onClose();
        },
        onError: (error) => {
          console.error('Internet Identity login error:', error);
          showNotification('Failed to connect with Internet Identity', 'error');
        }
      });
    } catch (error) {
      console.error('Internet Identity error:', error);
      showNotification('Failed to initialize Internet Identity', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, internetIdentity: false }));
    }
  };

  // Plug Wallet Connection
  const handlePlugConnect = async () => {
    setIsLoading(prev => ({ ...prev, plug: true }));
    try {
      if (window.ic?.plug) {
        // Check if already connected
        const connected = await window.ic.plug.isConnected();
        
        if (!connected) {
          // Request connection and whitelist your canister
          const whitelist = []; // Add your canister IDs here
          await window.ic.plug.requestConnect({ whitelist });
        }
        
        // Get the principal
        const principal = await window.ic.plug.agent.getPrincipal();
        const principalString = principal.toString();
        
        // Store in localStorage
        localStorage.setItem('walletPrincipal', principalString);
        localStorage.setItem('walletType', 'plug');
        
        if (isRegister) {
          // Call your registration API here
          // await registerUser(principalString, 'plug');
          showNotification('Registration successful!', 'success');
        } else {
          showNotification('Connected with Plug Wallet', 'success');
        }
        
        if (onWalletConnected) {
          onWalletConnected(principalString, 'plug');
        }
        onClose();
      } else {
        window.open('https://plugwallet.ooo/', '_blank');
        showNotification('Please install Plug Wallet first', 'info');
      }
    } catch (error) {
      console.error('Failed to connect Plug wallet:', error);
      showNotification('Failed to connect Plug wallet', 'error');
      setIsLoading(prev => ({ ...prev, plug: false }));
    }
  };

  // MetaMask Connection
  const handleMetaMaskConnect = async () => {
    setIsLoading(prev => ({ ...prev, metaMask: true }));
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not detected');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Store the address
      localStorage.setItem('walletAddress', address);
      localStorage.setItem('walletType', 'metamask');
      
      if (isRegister) {
        // Call your registration API here
        // await registerUser(address, 'metamask');
        showNotification('Registration successful!', 'success');
      } else {
        showNotification('Connected with MetaMask', 'success');
      }
      
      if (onWalletConnected) {
        onWalletConnected(address, 'metamask');
      }
      onClose();
    } catch (error) {
      console.error('Failed to connect MetaMask:', error);
      showNotification('Failed to connect MetaMask', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, metaMask: false }));
    }
  };

  // Check if wallet is already connected
  const checkConnectedWallet = () => {
    const walletType = localStorage.getItem('walletType');
    if (walletType) {
      const address = walletType === 'metamask' 
        ? localStorage.getItem('walletAddress')
        : localStorage.getItem('walletPrincipal');
      
      if (address) {
        return { type: walletType, address };
      }
    }
    return null;
  };

  const connectedWallet = checkConnectedWallet();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <FaTimes />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {isRegister ? 'Register with Wallet' : 'Connect Wallet'}
        </h2>
        
        <div className="space-y-4">
          {/* Internet Identity */}
          <button
            onClick={handleInternetIdentityConnect}
            disabled={isLoading.internetIdentity}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaFingerprint className="text-xl" />
            <span>
              {isLoading.internetIdentity 
                ? 'Connecting...' 
                : 'Internet Identity'}
            </span>
          </button>
          
          {/* Plug Wallet */}
          <button
            onClick={handlePlugConnect}
            disabled={isLoading.plug}
            className="w-full flex items-center justify-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlug className="text-xl" />
            <span>
              {isLoading.plug ? 'Connecting...' : 'Plug Wallet'}
            </span>
          </button>
          
          {/* MetaMask */}
          <button
            onClick={handleMetaMaskConnect}
            disabled={isLoading.metaMask || !isMetaMaskInstalled}
            className={`w-full flex items-center justify-center space-x-3 font-medium py-3 px-4 rounded-lg transition-colors ${
              isMetaMaskInstalled
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            } ${isLoading.metaMask ? 'opacity-50' : ''}`}
            title={!isMetaMaskInstalled ? 'Install MetaMask extension to connect' : ''}
          >
            <FaEthereum className="text-xl" />
            <span>
              {isLoading.metaMask 
                ? 'Connecting...' 
                : isMetaMaskInstalled 
                  ? 'MetaMask' 
                  : 'MetaMask (Not Installed)'}
            </span>
          </button>
        </div>
        
        {connectedWallet && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Connected with {connectedWallet.type}: 
              <span className="block truncate font-mono text-xs mt-1">
                {connectedWallet.address}
              </span>
            </p>
          </div>
        )}
        
        {notification.show && (
          <div className="mt-4">
            <Notification 
              message={notification.message} 
              type={notification.type} 
              onClose={() => setNotification(prev => ({ ...prev, show: false }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnectModal;
