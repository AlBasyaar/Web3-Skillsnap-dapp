import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Web3', path: '/web3' },
  { name: 'AI', path: '/ai' },
  { name: 'Commitments', path: '/commitments' },
];

export default function Navbar() {
  const location = useLocation();
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        });
    }
  }, []);

  return (
    <nav className="flex items-center pt-8 px-12 text-white relative z-10">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold tracking-wider">Skillsnap</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-lg hover:text-blue-400 transition ${
              location.pathname === link.path ? 'text-blue-400' : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </div>
            <button 
              onClick={() => {
                window.ethereum.request({ method: 'eth_requestAccounts' })
                  .then(() => {
                    setAccount(null);
                    setIsConnected(false);
                  });
              }}
              className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-white text-black px-4 py-2 rounded-full border border-white hover:bg-white/90 transition flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Connect Wallet</span>
          </button>
        )}
      </div>
    </nav>
  );
}
