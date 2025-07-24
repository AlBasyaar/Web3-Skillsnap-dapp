import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-8 px-4 pb-6 pt-10 bg-black text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="font-semibold mb-2">Skillset</div>
          <div className="text-xs text-gray-400 mb-1">© 2025 Skillset. All right reserved</div>
          <div className="flex gap-3 text-xs text-gray-500">
            <a href="#" className="hover:underline">Disclaimer</a>
            <span>|</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-gray-400 mb-1">Connect With Us</span>
          <div className="flex gap-4 text-2xl">
  <a href="#" aria-label="Facebook" className="hover:text-gray-200" target="_blank" rel="noopener noreferrer">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  </a>
  <a href="#" aria-label="Instagram" className="hover:text-gray-200" target="_blank" rel="noopener noreferrer">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  </a>
  <a href="#" aria-label="X" className="hover:text-gray-200" target="_blank" rel="noopener noreferrer">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 6.5l-11 11"/><path d="M6.5 6.5l11 11"/></svg>
  </a>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
