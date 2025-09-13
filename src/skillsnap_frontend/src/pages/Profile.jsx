import React, { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [principal, setPrincipal] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data dari localStorage
    const iiPrincipal = localStorage.getItem("ii_principal");
    const storedToken = localStorage.getItem("token");

    if (iiPrincipal) {
      setPrincipal(iiPrincipal);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = async () => {
    const authClient = await AuthClient.create();

    if (principal) {
      // logout II
      await authClient.logout();
      localStorage.removeItem("ii_principal");
    }

    if (token) {
      // logout token biasa
      localStorage.removeItem("token");
    }

    window.location.href = "/";
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      {principal ? (
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Login Method:</strong> Internet Identity
          </p>
          <p className="break-words">
            <strong>Principal:</strong> {principal}
          </p>
        </div>
      ) : token ? (
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Login Method:</strong> Token
          </p>
          <p className="break-words">
            <strong>Token:</strong> {token}
          </p>
        </div>
      ) : (
        <p className="text-red-500">❌ Not logged in</p>
      )}

      <button
        onClick={handleGoHome}
        className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Go to Home
      </button>

      <button
        onClick={handleLogout}
        className="w-full mt-4 py-2 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
