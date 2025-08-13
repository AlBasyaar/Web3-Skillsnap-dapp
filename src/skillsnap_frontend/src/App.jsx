import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Web3 from './pages/Web3';
import AI from './pages/AI';
import Commitments from './pages/Commitments';
import LoginRegisterPage from "./pages/LoginRegisterPage";

// Layout component with common structure
const Layout = ({ children }) => (
  <div className="relative min-h-screen flex flex-col bg-gray-900">
    <Navbar />
    <main className="flex-grow relative z-10 pt-16">
      {children}
    </main>
    <div className="relative z-20">
      <Footer />
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />

        <Route path="/features" element={
          <Layout>
            <Features />
          </Layout>
        } />

        <Route path="/web3" element={
          <Layout>
            <Web3 />
          </Layout>
        } />

        <Route path="/ai" element={
          <Layout>
            <AI />
          </Layout>
        } />

        <Route path="/commitments" element={
          <Layout>
            <Commitments />
          </Layout>
        } />
        <Route path="/LoginRegisterPage" element={
          <Layout>
            <LoginRegisterPage />
          </Layout>
        } />
      </Routes>
    </div>
  );
}

export default App;
