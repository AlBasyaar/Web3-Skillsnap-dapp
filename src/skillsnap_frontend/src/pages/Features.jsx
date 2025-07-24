import React from 'react';

const Features = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70 blur-lg"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
            <p className="text-xl text-gray-300 mb-6">
              Exciting new features are on their way!
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-400">
              We're working hard to bring you an amazing experience. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
