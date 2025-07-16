import React from "react";

const JobFitSection = () => {
  return (
    <section className="w-full flex flex-col items-center mt-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white drop-shadow-lg">
        Stop wasting time on job applications that don’t fit you
      </h2>
      <p className="text-center text-gray-300 mb-8 max-w-2xl">
        Let our AI analyze your CV and portfolio to identify the skills you need to improve so you can align with what companies are really looking for.
      </p>
      <div className="w-full max-w-5xl aspect-video bg-[#222] rounded-xl flex items-center justify-center text-white text-sm md:text-base">
        Ini video
      </div>
    </section>
  );
};

export default JobFitSection;
