import React from 'react';
import StarryBackground from './StarryBackground';
import EarthWithOrbit from './EarthWithOrbit';

const SpaceScene = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      <StarryBackground />
      <EarthWithOrbit />
    </div>
  );
};

export default SpaceScene;
