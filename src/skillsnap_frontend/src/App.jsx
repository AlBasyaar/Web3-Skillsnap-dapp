import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; // pastikan sudah ada
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Web3 from "./pages/Web3";
import AI from "./pages/AI";
import Commitments from "./pages/Commitments";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Course from "./pages/Course";
import AIChat from "./pages/AIChat";
import JobNearby from "./pages/JobNearby";

// Layout umum (Navbar + Footer)
const MainLayout = ({ children }) => (
  <div className="relative min-h-screen flex flex-col bg-gray-900">
    <Navbar />
    <main className="flex-grow relative z-10 pt-16">{children}</main>
    <div className="relative z-20">
      <Footer />
    </div>
  </div>
);

// Layout khusus Dashboard (hanya Sidebar)
const DashboardLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            <MainLayout>
              <LoginRegisterPage />
            </MainLayout>
          }
        />

        {/* Halaman umum */}
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/features"
          element={
            <MainLayout>
              <Features />
            </MainLayout>
          }
        />

        <Route
          path="/web3"
          element={
            <MainLayout>
              <Web3 />
            </MainLayout>
          }
        />

        <Route
          path="/ai"
          element={
            <MainLayout>
              <AI />
            </MainLayout>
          }
        />

        <Route
          path="/commitments"
          element={
            <MainLayout>
              <Commitments />
            </MainLayout>
          }
        />

        {/* Dashboard pakai Sidebar saja */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <DashboardLayout>
              <AIChat />
            </DashboardLayout>
          }
        />

        <Route
          path="/course"
          element={
            <DashboardLayout>
              <Course />
            </DashboardLayout>
          }
        />

        <Route
          path="/job-nearby"
          element={
            <DashboardLayout>
              <JobNearby />
            </DashboardLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
