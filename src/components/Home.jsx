import React from "react";
import btcSrc from "../assets/btc.png";

const Home = () => {
  return (
    <div className="w-full bg-black" style={{ height: "94vh" }}>
      <img
        className="w-full h-full object-contain filter grayscale animate-pulse"
        src={btcSrc}
        alt="Bitcoin"
      />
      <p className="text-6xl text-center font-thin text-white relative bottom-16">
        Xcrypto
      </p>
    </div>
  );
};

export default Home;
