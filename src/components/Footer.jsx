import React from "react";
import imgSrc from "../assets/img.jpg";

const avatarSrc = "https://avatars.githubusercontent.com/u/25058652";

const Footer = () => {
  return (
    <div className="bg-black bg-opacity-90 text-gray-300 min-h-[12rem] px-16 py-8 md:py-4">
      <div className="flex flex-col md:flex-row h-full items-center">
        <div className="flex flex-col w-full items-center md:items-start">
          <h2 className="font-bold text-lg">About Us</h2>
          <p className="text-sm tracking-widest text-center md:text-left mt-2">
            We are the best crypto trading app in India, we provide our guidance
            at a very cheap price.
          </p>
        </div>

        <div className="flex flex-col items-center mt-4 md:mt-0">
          <img
            className="w-28 h-28 rounded-full"
            src={imgSrc}
            alt="Our Founder"
          />
          <p className="mt-2">Our Founder</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
