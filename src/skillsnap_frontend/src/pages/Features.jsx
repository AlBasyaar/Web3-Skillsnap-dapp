import React, { useEffect, useState } from 'react';
import './Animations.css';

const FeatureCard = ({ title, description, emoji, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 transition-all duration-500 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: 0,
        animation: 'fadeInUp 0.6s ease-out forwards',
        animationDelay: `${0.1 + (index * 0.1)}s`,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      <div 
        className="text-4xl mb-4 inline-block transition-transform duration-500"
        style={{
          transform: isHovered ? 'rotate(5deg) scale(1.2)' : 'rotate(0) scale(1)'
        }}
      >
        {emoji}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 transition-colors duration-300 group-hover:text-white">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const features = [
    {
      emoji: "🧠",
      title: "Personality Assessment",
      description: "Discover your unique personality traits and work style."
    },
    {
      emoji: "📊",
      title: "Skill Evaluation",
      description: "Analyze your current skills and find areas to improve."
    },
    {
      emoji: "🎯",
      title: "Career Path",
      description: "Get personalized career recommendations."
    },
    {
      emoji: "📜",
      title: "Certification",
      description: "Earn certificates for your skills."
    },
    {
      emoji: "👥",
      title: "Team Fit",
      description: "Understand your best team environment."
    },
    {
      emoji: "📱",
      title: "Mobile Access",
      description: "Use SkillSnap on any device."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-float">
            Unlock Your Potential
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover powerful features designed to help you grow and succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
