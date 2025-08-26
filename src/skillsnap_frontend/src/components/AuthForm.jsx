import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ICPIcons from "./ICPIcon";
import SpaceScene from "./SpaceScene";
import WalletConnectModal from "./WalletConnectModal";
import { AuthClient } from "@dfinity/auth-client";

const AuthForm = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  // Set the font to match the home page (Inter)
  document.body.style.fontFamily =
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

  // Add keyboard shortcut (Ctrl + H) to go to home page
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if Ctrl + H is pressed
      if (e.ctrlKey && e.key === "h") {
        e.preventDefault();
        window.location.href = "/";
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Handle registration
      console.log("Registration submitted:", formData);
      // Redirect to verification page after successful registration
      window.location.href = "/verify-account";
    } else {
      // Handle login
      console.log("Login submitted:", formData);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const [principal, setPrincipal] = useState(null);
  const navigate = useNavigate();

  const handleICPLogin = async () => {
    const authClient = await AuthClient.create();

    // cek apakah berjalan di lokal (localhost/127.0.0.1 atau *.localhost)
    const isLocal =
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1");

    // URL Internet Identity
    const identityUrl = isLocal
      ? "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/" // II lokal
      : "https://identity.ic0.app/#authorize";

    // jalankan login
    await authClient.login({
      identityProvider: identityUrl,
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();

        console.log("✅ Logged in as Principal:", principal);

        setPrincipal(principal);
        // simpan ke state/localStorage
        localStorage.setItem("ii_principal", principal);
        navigate("/Dashboard");
      },
      onError: (err) => {
        console.error("❌ Login failed:", err);
      },
    });
  };

  const handleWalletConnect = () => {
    setShowWalletModal(true);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden flex items-center justify-center font-sans">
      <SpaceScene />

      {showWalletModal && (
        <WalletConnectModal
          onClose={() => setShowWalletModal(false)}
          isRegister={!isLogin}
        />
      )}

      <div
        className={`relative z-10 ${
          isLogin ? "w-[500px] h-[550px] p-6" : "w-[560px] h-[611px] p-8"
        } bg-[#313131] rounded-2xl shadow-xl border border-white/20 font-['Inter'] flex flex-col`}
      >
        <h2 className="text-xl font-bold text-center mb-3">
          {isLogin ? "Connect Skillsnap" : "Register Account"}
        </h2>

        <p className="text-xs text-white/80 text-center mb-4 leading-tight">
          By connecting a wallet, you agree to Skillsnap{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Terms of Service
          </a>{" "}
          and acknowledge that you have read and understand the Skillsnap{" "}
          <a href="#" className="text-blue-400 hover:underline">
            disclaimer
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1 mb-3">
            <label className="block text-xs font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-[#252525] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-1 mb-3">
            <label className="block text-xs font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-[#252525] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-1 mb-3">
              <label className="block text-xs font-medium text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 text-sm rounded-lg bg-[#252525] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex justify-between text-xs mb-4">
            {isLogin && (
              <Link
                to="/forgot-password"
                className="text-blue-400 hover:underline"
              >
                Forgot Password?
              </Link>
            )}
            <div></div> {/* Empty div to maintain flex layout */}
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 text-gray-800 py-2 text-sm rounded-lg font-medium transition-colors mb-4 border border-white"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="space-y-3 mt-4">
          {/* ICP Login Button */}
          <button
            onClick={handleICPLogin}
            className="w-full flex items-center justify-center gap-2 p-2 text-sm rounded-lg bg-[#313131] text-white font-medium hover:bg-[#4a4a4a] transition-colors border border-white"
          >
            <ICPIcons className="w-4 h-4" />
            {principal
              ? `Connected: ${principal.slice(0, 5)}...${principal.slice(-5)}`
              : isLogin
              ? "Connect with Internet Identity"
              : "Register with Internet Identity"}
          </button>

          {/* Wallet Connection Button */}
          <button
            type="button"
            onClick={() => setShowWalletModal(true)}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 transition-colors duration-200"
          >
            {isLogin ? "Connect" : "Register"} Wallet
          </button>
        </div>

        <div className="text-center mt-3">
          <Link
            to="/register"
            className="text-blue-400 hover:underline text-xs"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
