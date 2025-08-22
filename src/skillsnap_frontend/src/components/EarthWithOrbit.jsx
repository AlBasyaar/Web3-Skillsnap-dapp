import React, { useRef } from 'react';

// Import images
import bumiImg from '../assets/images/world-human/bumi.png';
import manImg from '../assets/images/world-human/man.png';
import man2Img from '../assets/images/world-human/man-2.png';
import sheImg from '../assets/images/world-human/she.png';
import she2Img from '../assets/images/world-human/she-2.png';

const EarthWithOrbit = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
      pointerEvents: 'none',
      backgroundColor: 'rgba(0,0,0,0.9)'
    }}>
      {/* Earth - Static and centered */}
      <div style={{
        position: 'relative',
        width: '600px',
        height: '600px',
        marginTop: '200px', // Move Earth down further
        zIndex: 1
      }}>
        <img
          src={bumiImg}
          alt="Earth"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            animation: 'none',
            filter: 'drop-shadow(0 0 20px rgba(65, 105, 225, 0.6))'
          }}
        />
      </div>

      {/* Orbiting Characters */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1200px',
        height: '1200px'
      }}>
        {/* Character heads - 2 on each side */}
        {[
          // Left side heads
          { img: manImg, size: 160, left: '10%', top: '40%' },
          { img: she2Img, size: 170, left: '10%', top: '70%' },
          // Right side heads
          { img: man2Img, size: 165, left: '90%', top: '40%' },
          { img: sheImg, size: 175, left: '90%', top: '70%' }
        ].map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
              width: `${item.size}px`,
              height: `${item.size}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 2
            }}
          >
            <img
              src={item.img}
              alt={`Character ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                animation: 'none',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
              }}
            />
          </div>
        ))}
      </div>

      <style>{
        `* {
          box-sizing: border-box;
          animation: none !important;
          transition: none !important;
        }`
      }</style>
    </div>
  );
};

export default EarthWithOrbit;
