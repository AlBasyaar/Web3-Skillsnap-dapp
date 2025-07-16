import React from "react";

const cards = [
  {
    img: (
      <img src="https://img.icons8.com/color/96/bitcoin--v1.png" alt="blockchain security" className="mx-auto mb-4 w-24 h-24" />
    ),
    title: "Unrivaled Blockchain-Level Security",
    desc: `Built on ICP, our app inherently protects your skill data and analysis results with advanced blockchain cryptography. We shield you from centralized cyber-attacks and manipulation, ensuring complete information integrity.`
  },
  {
    img: (
      <img src="https://img.icons8.com/ios-filled/100/network.png" alt="on-chain ai" className="mx-auto mb-4 w-24 h-24 invert" />
    ),
    title: "Revolutionary On-Chain AI",
    desc: `We leverage ICP's unique ability to execute complex smart contracts. This enables a significant portion of our AI models, including the intelligent logic for skill verification, to operate directly on-chain.`
  },
  {
    img: (
      <img src="https://img.icons8.com/color/96/speed.png" alt="performance" className="mx-auto mb-4 w-24 h-24" />
    ),
    title: "Limitless Performance and Scalability",
    desc: `ICP is designed for massive scalability and high performance. This ensures that our application can seamlessly handle millions of users and large volumes of data quickly, without compromising on security or decentralization.`
  }
];

const SecurityIcpSection = () => {
  return (
    <section className="w-full flex flex-col items-center mt-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white drop-shadow-lg">
        Built for security, powered by<br />the ICP Network
      </h2>
      <p className="text-center text-gray-300 mb-12 max-w-2xl">
        Discover your true potential with AI-driven skill analysis, backed by<br />the security of ICP technology.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full max-w-6xl">
        {cards.map((card, idx) => (
          <div key={idx} className="flex-1 bg-white/5 rounded-xl p-8 flex flex-col items-center border border-white/20 shadow-lg min-w-[260px]">
            {card.img}
            <h3 className="text-xl font-semibold text-white text-center mb-2 mt-2">
              {card.title}
            </h3>
            <p className="text-gray-300 text-center text-sm">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecurityIcpSection;
