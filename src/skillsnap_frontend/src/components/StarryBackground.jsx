import React, { useEffect, useRef } from 'react';
import './StarryBackground.css';

const StarryBackground = () => {
  const containerRef = useRef(null);
  const starCount = 200; // Increased number of stars
  const shootingStarInterval = useRef(null);

  // Create stars
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear existing stars
    containerRef.current.innerHTML = '';

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      
      // Random animation duration between 3s and 8s
      const duration = Math.random() * 5 + 3;
      
      // Set star styles
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = Math.random() * 0.8 + 0.2;
      star.style.animation = `twinkle ${duration}s infinite ${Math.random() * 5}s`;
      
      containerRef.current.appendChild(star);
    }

    // Create shooting stars
    const createShootingStar = () => {
      if (!containerRef.current) return;
      
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random position
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      // Random angle
      const angle = Math.random() * 40 + 45; // Between 45 and 85 degrees
      
      // Set styles
      shootingStar.style.left = `${startX}%`;
      shootingStar.style.top = `${startY}%`;
      shootingStar.style.width = '100px';
      shootingStar.style.height = '2px';
      shootingStar.style.background = 'linear-gradient(90deg, transparent, #fff, transparent)';
      shootingStar.style.transform = `rotate(${angle}deg)`;
      shootingStar.style.animation = `shooting ${Math.random() * 2 + 1}s linear forwards`;
      
      containerRef.current.appendChild(shootingStar);
      
      // Remove after animation
      setTimeout(() => {
        if (containerRef.current && shootingStar.parentNode === containerRef.current) {
          containerRef.current.removeChild(shootingStar);
        }
      }, 3000);
    };
    
    // Create shooting stars periodically
    shootingStarInterval.current = setInterval(createShootingStar, 1500);
    
    // Cleanup
    return () => {
      if (shootingStarInterval.current) {
        clearInterval(shootingStarInterval.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,  // Changed from -1 to 0
        pointerEvents: 'none',
        backgroundColor: 'black',  // Added black background
        overflow: 'hidden'
      }}
    />
  );
};

export default StarryBackground;
