import React, { useState } from 'react';

const WelcomeScreen = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close welcome screen"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-purple-400">Creative</h2>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Job related</h3>
            <div className="flex flex-wrap gap-2">
              {['Graphics Design', 'Motion Graphics', 'UI/UX Designer', 'Art'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The creative field offers diverse career opportunities for individuals who are passionate about design and innovation. 
              Roles in Graphic Design, Motion Graphics, UI/UX Design, and Art allow professionals to transform concepts into visual 
              solutions that support business goals and enhance user engagement. Graphic designers develop impactful branding and 
              communication materials, motion graphics specialists create dynamic visuals for media, UI/UX designers build intuitive 
              digital experiences, and artists contribute originality and expression. These careers combine technical expertise with 
              creativity, making them essential in industries such as advertising, technology, entertainment, and digital media. 
              Pursuing this path provides strong growth and relevance.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
