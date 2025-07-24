import React, { useEffect, useState } from 'react';

export default function Hero() {
  // Canvas Setup
  useEffect(() => {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Dimensions
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    // Colors and Particles
    const colors = ['#FF0066', '#00FF99', '#FF9900', '#663399', '#FF33CC'];
    let particles = [];
    
    // Particle Class
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 100;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        return this.life > 0;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Firework Creation Function
    function createFirework() {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Create explosion particles
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    // Animation Loop
    function animate() {
      // Create semi-transparent dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      particles = particles.filter(particle => particle.update());
      particles.forEach(particle => particle.draw());
      
      // Create more fireworks
      if (particles.length < 100) {
        createFirework();
      }
      
      // Add some random sparkles
      if (Math.random() < 0.05) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Create explosion particles
        for (let i = 0; i < 30; i++) {
          particles.push(new Particle(x, y, color));
        }
      }
      
      requestAnimationFrame(animate);
    }

    // Start animation
    animate();
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white overflow-hidden">
      {/* Canvas for fireworks */}
      <canvas
        id="fireworks-canvas"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          opacity: 0.95
        }}
      />
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Your go-to skill analyzer,<br />
            all in one place - Skillsnap
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Accelerate your career with smart skill analysis by our AI agent.<br />
            Showcase your talent with blockchain-powered digital certificates.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🏢</span>
              <span className="text-xl">Approved by 120+ IT companies</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">👥</span>
              <span className="text-xl">300k users loves this tools</span>
            </div>
          </div>
          <button className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition mt-8">
            <span className="text-base">Try it now!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
