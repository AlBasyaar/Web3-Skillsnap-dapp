import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Animations.css";
import EarthWithOrbit from "../components/EarthWithOrbit";
import dadu from "../assets/images/home-design/dadu.png";
import telepon from "../assets/images/home-design/telepon.png";
import jam from "../assets/images/home-design/jam.png";
import buku1 from "../assets/images/buku-1.png";
import buku2 from "../assets/images/buku-2.png";
import com from "../assets/images/com.png";
import jam2 from "../assets/images/jam-2.png";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden z-10 bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      {/* Decorative Elements */}
      <div
        className={`absolute inset-0 overflow-hidden z-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Book */}
        <div
          className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 transition-all duration-500 hover:scale-110 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <img
            src={buku1}
            alt="Book"
            className="w-16 h-auto md:w-24 lg:w-28 drop-shadow-lg"
            loading="lazy"
          />
        </div>

        {/* Right Side Decorative Elements */}
        <div className="absolute top-8 right-8 md:right-16 lg:right-24 z-10 flex flex-col items-end space-y-4 md:space-y-6">
          <div className="animate-float" style={{ animationDelay: "0.7s" }}>
            <img
              src={buku2}
              alt="Book"
              className="w-16 h-auto md:w-24 lg:w-28 drop-shadow-lg hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <img
              src={com}
              alt="Computer"
              className="w-14 h-auto md:w-20 lg:w-24 -mr-4 md:-mr-6 -mb-2 drop-shadow-lg hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <img
              src={jam2}
              alt="Clock"
              className="w-12 h-auto md:w-16 lg:w-20 -mr-2 md:-mr-4 drop-shadow-lg hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Earth with orbiting human images - External Component */}
      <div
        className={`py-16 relative z-10 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <EarthWithOrbit />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-leading-tight">
              The right jobs, perfectly aligned with what you love
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 text-white max-w-3xl mx-auto">
              Discover jobs picked by AI, and prove your skills with
              decentralized credentials.
              <span className="block mt-2 text-lg">
                Secured by Internet Computer Protocol (ICP)
              </span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 mt-12">
              <Link
                to="/get-started"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Free
              </Link>
              <Link
                to="/how-it-works"
                className="flex items-center text-white font-medium group"
              >
                <span className="mr-2">See how it works</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-16">
              <div className="flex items-center text-white text-sm md:text-base bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 0 1 3.466 0l5.334 3.2a3.066 3.066 0 0 1 1.2 2.4v6.29a3.066 3.066 0 0 1-1.2 2.4l-5.334 3.2a3.066 3.066 0 0 1-3.466 0l-5.334-3.2a3.066 3.066 0 0 1-1.2-2.4v-6.29a3.066 3.066 0 0 1 1.2-2.4l5.334-3.2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Trusted by 20+ top companies</span>
              </div>
              <div className="flex items-center text-white text-sm md:text-base bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5 mr-2 text-green-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100,000+ professionals onboarded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden z-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <div
          className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              Stop wasting time on job applications that don't fit you
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Tell us what you're interested in. Our agents will match it with
              the right skills and job paths companies are actually hiring for.
            </p>
          </div>

          {/* Video Demo Section - Vertical Rectangle */}
          <div className="rounded-lg p-8 max-w-2xl mx-auto">
            <div className="aspect-w-4 aspect-h-5 bg-gray-800 rounded-md flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Video Demo
                </h3>
                <p className="text-white">Watch how it works</p>
              </div>
            </div>
          </div>

          {/* Your Path to a New Job Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              Your Path to a New Job
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="text-white text-xs text-center">
                  Share your interests and passions
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-white text-xs text-center max-w-[120px]">
                  The Magic will happen. Keep relax and calm
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white text-xs text-center">
                  Yeay! you're one step closer to your dream jobs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 overflow-hidden z-10 bg-gradient-to-b from-transparent to-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Built for the Future of Work
            </h2>
            <p className="text-xl text-white/80">
              Powered by AI and secured by ICP blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:bg-white/10 group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-500">
                <img
                  src={dadu}
                  alt="Security"
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-white mb-4">
                Unrivaled Security
              </h3>
              <p className="text-white/80 text-center">
                Tamper-proof cryptography ensures full information integrity and
                prevents data breaches
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:bg-white/10 group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-500">
                <img
                  src={telepon}
                  alt="Verification"
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-white mb-4">
                Verifiable Credentials
              </h3>
              <p className="text-white/80 text-center">
                Shareable Web3 credentials that prove your skills and potential
                to employers worldwide
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:bg-white/10 group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-500">
                <img
                  src={jam}
                  alt="Performance"
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-white mb-4">
                Limitless Scale
              </h3>
              <p className="text-white/80 text-center">
                Built on ICP for high-speed performance that scales to millions
                of users without compromise
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/features"
              className="inline-flex items-center text-white font-medium group hover:text-blue-400 transition-colors duration-300"
            >
              <span className="mr-2">Explore all features</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
