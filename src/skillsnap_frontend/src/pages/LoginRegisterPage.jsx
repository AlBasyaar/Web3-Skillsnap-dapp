import React, { useState, useEffect } from "react";
import EarthWithOrbit from "../components/EarthWithOrbit";
import "./Animations.css";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login attempt:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Register attempt:", formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="login-page-container relative min-h-screen flex items-center justify-center">
      <div className="stars-container absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center z-5 transition-opacity duration-1000 ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
      >
        <EarthWithOrbit />
      </div>

      <div
        className={`login-form-container fade-in relative z-10 max-w-md w-full ${
          isVisible ? "visible" : ""
        }`}
      >
        <div className="login-form">
          <div className="form-header">
            <h2 className="form-title">
              {isLogin ? "Selamat Datang!" : "Daftar Akun"}
            </h2>
            <p className="form-subtitle">
              {isLogin
                ? "Masuk ke akun Anda untuk melanjutkan petualangan digital"
                : "Bergabunglah dengan komunitas digital kami dan nikmati koneksi tanpa batas"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Masukkan password"
                required
              />
            </div>

            {!isLogin && (
              <div className="input-group">
                <label className="input-label">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Ulangi password"
                  required
                />
              </div>
            )}

            <div className="form-footer">
              <span className="toggle-text">
                {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="toggle-link"
                >
                  {isLogin ? "Daftar sekarang" : "Masuk"}
                </button>
              </span>
            </div>

            <button type="submit" className="submit-btn">
              {isLogin ? "Masuk" : "Daftar"}
            </button>

            {!isLogin && (
              <>
                <div className="divider">
                  <span>atau</span>
                </div>
                <button type="button" className="alt-btn">
                  🔐 Daftar dengan Internet Identity
                </button>
                <button type="button" className="alt-btn">
                  Daftar dengan Wallet
                </button>
              </>
            )}
          </form>

          <div className="terms-text">
            Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
          </div>
        </div>
      </div>

      <style jsx>{`
        .stars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .earth-background {
          position: absolute;
          width: 800px;
          height: 800px;
          z-index: 5;
        }
        .earth-main {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          position: relative;
          overflow: hidden;
          box-shadow: inset -20px -20px 40px rgba(0, 0, 0, 0.3),
            0 0 60px rgba(16, 185, 129, 0.4);
          animation: earthRotate 30s linear infinite;
        }
        .earth-surface {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: radial-gradient(
              ellipse at 20% 30%,
              transparent 20%,
              rgba(6, 95, 70, 0.8) 25%
            ),
            radial-gradient(
              ellipse at 60% 70%,
              transparent 15%,
              rgba(5, 150, 105, 0.6) 20%
            ),
            radial-gradient(
              ellipse at 80% 20%,
              transparent 18%,
              rgba(16, 185, 129, 0.7) 23%
            );
          animation: surfaceMove 40s linear infinite;
        }
        .earth-glow {
          position: absolute;
          top: -50px;
          left: -50px;
          right: -50px;
          bottom: -50px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            transparent 60%,
            rgba(16, 185, 129, 0.2) 70%,
            transparent 80%
          );
          animation: glow 3s ease-in-out infinite alternate;
        }
        @keyframes earthRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes surfaceMove {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes glow {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        .login-form-container {
          width: 100%;
          max-width: 400px;
        }
        .login-form {
          background: rgba(30, 41, 59, 0.2);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        }
        .form-title {
          color: white;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 8px;
        }
        .form-subtitle {
          color: rgba(148, 163, 184, 0.8);
          font-size: 14px;
          text-align: center;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .input-group {
          margin-bottom: 16px;
        }
        .input-label {
          display: block;
          color: rgba(148, 163, 184, 0.9);
          font-size: 14px;
          margin-bottom: 6px;
        }
        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: 8px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: rgba(168, 85, 247, 0.6);
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }
        .form-input::placeholder {
          color: rgba(148, 163, 184, 0.5);
        }
        .form-footer {
          text-align: center;
          margin-bottom: 20px;
        }
        .toggle-text {
          color: rgba(148, 163, 184, 0.8);
          font-size: 14px;
        }
        .toggle-link {
          color: #a855f7;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .toggle-link:hover {
          color: #9333ea;
          text-decoration: underline;
        }
        .submit-btn {
          width: 100%;
          padding: 12px 24px;
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(168, 85, 247, 0.3);
        }
        .alt-btn {
          width: 100%;
          padding: 12px 24px;
          background: rgba(15, 23, 42, 0.8);
          color: rgba(148, 163, 184, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .alt-btn:hover {
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.5);
        }
        .terms-text {
          color: rgba(148, 163, 184, 0.9);
          font-size: 12px;
          text-align: center;
          margin-top: 16px;
        }
        @media (max-width: 768px) {
          .earth-background {
            width: 600px;
            height: 600px;
          }
          .login-form {
            padding: 24px;
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginRegisterPage;