import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Features from './pages/Features';
import Web3 from './pages/Web3';
import AI from './pages/AI';
import AIChat from './pages/AIChat';
import Commitments from './pages/Commitments';
import LoginRegisterPage from "./pages/LoginRegisterPage";
import RegisterPage from "./pages/RegisterPage";
import VerificationPage from "./pages/VerificationPage";
import NameEntryPage from "./pages/NameEntryPage";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import JobNearby from "./pages/JobNearby";

// Layout component with common structure
const Layout = ({ children, searchTerm, onSearchChange }) => {
  return (
    <div className="relative min-h-screen flex bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <Navbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <main className="flex-grow overflow-y-auto">
          <div className="p-6 pt-24 md:pt-20 lg:pt-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <WalletProvider>
      <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <LoginRegisterPage />
        } />
        
        <Route path="/home" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <Home searchTerm={searchTerm} />
          </Layout>
        } />

        <Route path="/course" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <Course />
          </Layout>
        } />
        <Route path="/course/:id" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <CourseDetail />
          </Layout>
        } />
        
        <Route path="/features" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <Features />
          </Layout>
        } />

        <Route path="/web3" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <Web3 />
          </Layout>
        } />

        <Route path="/ai" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <AI />
          </Layout>
        } />
        
        <Route path="/ai-chat" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <AIChat />
          </Layout>
        } />

        <Route path="/login" element={
          <LoginRegisterPage />
        } />

        <Route path="/register" element={
          <RegisterPage />
        } />

        <Route path="/commitments" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <Commitments />
          </Layout>
        } />

        <Route path="/verify-account" element={
          <VerificationPage />
        } />
        
        <Route path="/enter-name" element={
          <NameEntryPage />
        } />
        
        <Route path="/job-nearby" element={
          <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
            <JobNearby searchTerm={searchTerm} />
          </Layout>
        } />
        </Routes>
      </div>
    </WalletProvider>
  );
}

export default App;
