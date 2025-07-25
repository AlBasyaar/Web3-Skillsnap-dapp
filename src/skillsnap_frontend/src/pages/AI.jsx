import React, { useEffect, useState } from "react";
import PersonalityAssessmentForm from "../components/PersonalityAssessmentForm";
import "./Animations.css";

const AI = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-8 md:pt-12 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-16 left-1/2 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 animate-float">
              Personality Assessment
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Complete this assessment to discover your personality traits and
              career matches
            </p>
          </div>
          <div className={`bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 shadow-xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <PersonalityAssessmentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
