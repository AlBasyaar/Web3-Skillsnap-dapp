import React, { useState } from 'react';
// import './LoginRegisterPage.css';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt:', { email: formData.email, password: formData.password });
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Register attempt:', formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background Stars */}
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Earth with Orbiting Elements */}
      <div className="earth-background">
        {/* Main Earth */}
        <div className="earth-main">
          <div className="earth-surface"></div>
          <div className="earth-glow"></div>
        </div>

        {/* Orbiting Characters - Using real images like EarthWithOrbit */}
        <div className="orbit-container">
          <div className="orbit orbit1">
            <div className="orbit-img">👨‍💼</div>
          </div>
          <div className="orbit orbit2">
            <div className="orbit-img">👨‍🔬</div>
          </div>
          <div className="orbit orbit3">
            <div className="orbit-img">👩‍💼</div>
          </div>
          <div className="orbit orbit4">
            <div className="orbit-img">👩‍🎓</div>
          </div>
        </div>
      </div>

      {/* Login/Register Form */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="login-form-container">
          <div className="login-form">
            <h2 className="form-title">
              {isLogin ? 'Login Account' : 'Register Account'}
            </h2>
            
            <p className="form-subtitle">
              {isLogin 
                ? 'Welcome back! Please login to your account.'
                : 'By connecting a wallet, you agree to SkillSnap Terms of Service and acknowledge you have read and understand the SkillSnap disclaimer'
              }
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label className="input-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              <div className="form-footer">
                <span className="toggle-text">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="toggle-link"
                  >
                    {isLogin ? 'Register' : 'Login'}
                  </button>
                </span>
              </div>

              <button type="submit" className="submit-btn">
                {isLogin ? 'Login' : 'Register'}
              </button>

              {!isLogin && (
                <>
                  <button type="button" className="alt-btn">
                    🔐 Register with Internet Identity
                  </button>
                  <button type="button" className="alt-btn">
                    Register Wallet
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Styles */}
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
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }

        .earth-background {
          position: absolute;
          bottom: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          z-index: 1;
        }

        .earth-main {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset -20px -20px 40px rgba(0, 0, 0, 0.3),
            0 0 60px rgba(16, 185, 129, 0.4);
          animation: earthRotate 30s linear infinite;
        }

        .earth-surface {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 20% 30%, transparent 20%, rgba(6, 95, 70, 0.8) 25%),
            radial-gradient(ellipse at 60% 70%, transparent 15%, rgba(5, 150, 105, 0.6) 20%),
            radial-gradient(ellipse at 80% 20%, transparent 18%, rgba(16, 185, 129, 0.7) 23%);
          animation: surfaceMove 40s linear infinite;
        }

        .earth-glow {
          position: absolute;
          top: -50px;
          left: -50px;
          right: -50px;
          bottom: -50px;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 60%, rgba(16, 185, 129, 0.2) 70%, transparent 80%);
          animation: glow 3s ease-in-out infinite alternate;
        }

        @keyframes earthRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes surfaceMove {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes glow {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }

        .orbit-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }

        .login-form-container {
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 10;
        }

        .login-form {
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(20px);
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

        @media (max-width: 768px) {
          .earth-background {
            width: 400px;
            height: 400px;
            bottom: -150px;
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