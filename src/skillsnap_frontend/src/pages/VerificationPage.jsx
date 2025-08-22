import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
  const navigate = useNavigate();

  const handleResendEmail = (e) => {
    e.preventDefault();
    // TODO: Implement resend verification email logic
    console.log('Resending verification email...');
    // Navigate to name entry page
    navigate('/enter-name');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Verify Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            We just sent a verification email! Check your inbox and click 'Verify' to activate your account
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleResendEmail}
            className="w-full bg-white border-2 border-white text-gray-800 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Resend Verification Email
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mt-2"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
