import React from 'react';
import { FiZap, FiCheck } from 'react-icons/fi';

const UpgradeBanner = () => {
  const features = [
    'Unlimited course access',
    'Certificate upon completion',
    'Priority support',
    'Exclusive content',
    'Offline access'
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <FiZap className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-bold">Upgrade to Pro</h3>
      </div>
      <p className="mb-4 text-blue-100">Unlock all features and take your learning to the next level</p>
      
      <div className="mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center mb-2">
            <FiCheck className="w-5 h-5 mr-2 text-green-300" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center mb-4">
        <span className="text-3xl font-bold">$9.99</span>
        <span className="text-blue-200">/month</span>
      </div>
      
      <button className="w-full bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
        Upgrade Now
      </button>
      
      <p className="mt-3 text-center text-sm text-blue-200">
        7-day free trial. Cancel anytime.
      </p>
    </div>
  );
};

export default UpgradeBanner;
