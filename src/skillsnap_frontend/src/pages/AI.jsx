import React from "react";
import PersonalityAssessmentForm from "../components/PersonalityAssessmentForm";

const AI = () => {
  return (
    <div className="min-h-screen pt-8 md:pt-12 pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Personality Assessment
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Complete this assessment to discover your personality traits and
              career matches
            </p>
          </div>
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 shadow-xl">
            <PersonalityAssessmentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
