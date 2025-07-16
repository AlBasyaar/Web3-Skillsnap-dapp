import React from "react";

const CloserSection = () => {
  return (
    <section className="w-full flex flex-col items-center mt-20 mb-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white drop-shadow-lg">
        You’re closer than you think<br />
        Our AI help to improve your skills
      </h2>
      <button className="mt-8 px-6 py-2 rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-all">
        Try it now!
      </button>
    </section>
  );
};

export default CloserSection;
