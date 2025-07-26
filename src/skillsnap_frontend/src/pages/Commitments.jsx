import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Animations.css';

// Import local images
import dafiqImg from '../assets/images/foto/dafiq.jpg';
import rakhaImg from '../assets/images/foto/rakha.jpeg';
import reinhardImg from '../assets/images/foto/reinhard.jpg';
import basyarImg from '../assets/images/foto/basyar.jpg';

const Commitments = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      id: 1,
      image: dafiqImg,
      name: 'Dafiq',
      role: 'Lead Developer',
      description: 'Passionate about creating innovative solutions and leading technical projects.'
    },
    {
      id: 2,
      image: rakhaImg,
      name: 'Rakha',
      role: 'UI/UX Designer',
      description: 'Designing beautiful and intuitive user experiences that make a difference.'
    },
    {
      id: 3,
      image: reinhardImg,
      name: 'Reinhard',
      role: 'Blockchain Expert',
      description: 'Specializing in decentralized technologies and smart contract development.'
    },
    {
      id: 4,
      image: basyarImg,
      name: 'Basyar',
      role: 'Full Stack Developer',
      description: 'Building robust and scalable web applications with modern technologies.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Meet Our Team</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              The People Behind the Mission
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            A diverse team of passionate individuals working together to create something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`group relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50`}
              style={{
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4">{member.description}</p>
                <button className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105">
                  View Profile
                </button>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 transition-all duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're always looking for talented individuals to join our growing team.
          </p>
          <Link 
            to="/careers" 
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Open Positions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Commitments;
