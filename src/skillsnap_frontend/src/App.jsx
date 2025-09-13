import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
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
import Recommendation from "./pages/Recommendation";
import Profile from "./pages/Profile";

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

// Protected Route
const ProtectedRoute = ({ children }) => {
  const iiPrincipal = localStorage.getItem("ii_principal");
  const token = localStorage.getItem("token");
  const isAuthenticated = iiPrincipal || token;
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginRegisterPage />} />

        {/* Halaman umum */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
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
            <ProtectedRoute>
              <MainLayout>
                <Commitments />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Dashboard pakai Sidebar saja */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AIChat />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/course"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Course />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-nearby"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <JobNearby />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendation"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Recommendation />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/*Default redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
