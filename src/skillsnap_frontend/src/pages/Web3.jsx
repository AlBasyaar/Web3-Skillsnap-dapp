import React from 'react';

const Web3 = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70 blur-lg animate-pulse"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
            <div className="text-6xl mb-4">🌐</div>
            <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Web3 Integration
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Decentralizing the future of skill validation
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full animate-pulse"></div>
            </div>
            <div className="inline-flex items-center space-x-2 text-sm text-gray-400 mb-4 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Building on Blockchain</span>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              We're working on something revolutionary. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3;
