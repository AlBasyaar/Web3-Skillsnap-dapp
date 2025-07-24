import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ComingSoon from './components/ComingSoon';
import JobFitSection from './components/JobFitSection';
import HowItWorksSection from './components/HowItWorksSection';
import SecurityIcpSection from './components/SecurityIcpSection';
import CloserSection from './components/CloserSection';
import Footer from './components/Footer';
import Features from './pages/Features';
import Web3 from './pages/Web3';
import AI from './pages/AI';
import Commitments from './pages/Commitments';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={
  <>
    <Hero />
    <JobFitSection />
    <HowItWorksSection />
    <SecurityIcpSection />
    <CloserSection />
    <Footer />
  </>
} />
          <Route path="/features" element={<Features />} />
          <Route path="/web3" element={<Web3 />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/commitments" element={<Commitments />} />
        </Routes>
      </div>
    </Router>
  );
}
