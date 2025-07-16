import React from "react";

const steps = [
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-3 text-white/80"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg>
    ),
    title: "Upload your CV and Portofolio"
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-3 text-white/80"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    ),
    title: "Let the system work its magic"
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-3 text-white/80"><rect x="6" y="6" width="12" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
    ),
    title: "Your certificates are ready for you"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="w-full flex flex-col items-center mt-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">
        How does it works?
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full max-w-5xl">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white/5 rounded-xl p-6 min-w-[180px] max-w-[220px] shadow-lg">
            {step.icon}
            <span className="text-white text-center text-base font-medium">
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center w-full max-w-5xl mt-8 gap-8">
        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
