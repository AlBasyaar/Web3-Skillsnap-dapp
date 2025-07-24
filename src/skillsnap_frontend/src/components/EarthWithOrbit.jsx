import React from "react";
import bumi from "../assets/images/world-human/bumi.png";
import man2 from "../assets/images/world-human/man-2.png";
import man from "../assets/images/world-human/man.png";
import she2 from "../assets/images/world-human/she-2.png";
import she from "../assets/images/world-human/she.png";

const EarthWithOrbit = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-90 pointer-events-none">
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto my-auto">
        {/* Earth Image */}
        <img
          src={bumi}
          alt="Earth"
          className="w-full h-full opacity-60 mx-auto my-auto"
        />

        {/* Orbiting Human Images */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="orbit orbit1">
              <img src={man2} alt="Man 1" className="orbit-img" />
            </div>
            <div className="orbit orbit2">
              <img src={man} alt="Man 2" className="orbit-img" />
            </div>
            <div className="orbit orbit3">
              <img src={she2} alt="Woman 1" className="orbit-img" />
            </div>
            <div className="orbit orbit4">
              <img src={she} alt="Woman 2" className="orbit-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthWithOrbit;
