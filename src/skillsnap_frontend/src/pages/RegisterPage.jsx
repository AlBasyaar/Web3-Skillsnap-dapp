import React from 'react';
import { Link } from 'react-router-dom';
import ICPIcons from '../components/ICPIcon';
import SpaceScene from '../components/SpaceScene';
import WalletConnectModal from '../components/WalletConnectModal';

const RegisterPage = () => {
  const [showWalletModal, setShowWalletModal] = React.useState(false);
  
  // Set the font to match the home page (Inter)
  React.useEffect(() => {
    document.body.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    
    return () => {
      document.body.style.fontFamily = '';
    };
  }, []);

  const handleICPLogin = () => {
    // Open Internet Identity login in a new window
    const width = 400;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      'https://identity.ic0.app/#authorize',
      'icWindow',
      `toolbar=0,location=0,menubar=0,width=${width},height=${height},top=${top},left=${left}`
    );
    
    // Listen for messages from the popup
    const handleMessage = (event) => {
      if (event.origin === 'https://identity.ic0.app' && event.data) {
        window.removeEventListener('message', handleMessage);
      }
    };
    
    window.addEventListener('message', handleMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted');
    // Redirect to verification page after successful registration
    window.location.href = '/verify-account';
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden flex items-center justify-center font-sans">
      <SpaceScene />
      
      {showWalletModal && (
        <WalletConnectModal 
          onClose={() => setShowWalletModal(false)}
          isRegister={true}
        />
      )}

      <div className="relative z-10 w-[560px] h-[611px] p-8 bg-[#313131] rounded-2xl shadow-xl border border-white/20 font-['Inter'] flex flex-col">
        <h2 className="text-xl font-bold text-center mb-3">
          Register Account
        </h2>
        
        <p className="text-xs text-white/80 text-center mb-4 leading-tight">
          By connecting a wallet, you agree to Skillsnap{' '}
          <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>{' '}
          and acknowledge that you have read and understand the Skillsnap{' '}
          <a href="#" className="text-blue-400 hover:underline">disclaimer</a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1 mb-3">
            <label className="block text-xs font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 text-sm rounded-lg bg-[#252525] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-1 mb-3">
            <label className="block text-xs font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 text-sm rounded-lg bg-[#252525] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-1 mb-3">
            <label className="block text-xs font-medium text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 text-sm rounded-lg bg-[#252525] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 text-gray-800 py-2 text-sm rounded-lg font-medium transition-colors mb-4 border border-white"
          >
            Register
          </button>
        </form>

        <div className="space-y-3 mt-4">
          {/* ICP Register Button */}
          <button
            onClick={handleICPLogin}
            className="w-full flex items-center justify-center gap-2 p-2 text-sm rounded-lg bg-[#313131] text-white font-medium hover:bg-[#4a4a4a] transition-colors border border-white"
          >
            <ICPIcons className="w-4 h-4" /> Register with Internet Identity
          </button>

          {/* Wallet Connection Button */}
          <button
            type="button"
            onClick={() => setShowWalletModal(true)}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 transition-colors duration-200"
          >
            Register with Wallet
          </button>
        </div>

        <div className="text-center mt-3">
          <Link to="/login" className="text-blue-400 hover:underline text-xs">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
