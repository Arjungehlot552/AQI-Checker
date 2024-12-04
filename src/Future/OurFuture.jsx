import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Newspaper from "../Images/Newspaper.png";

export default function Main() {
  // Cursor image animation state
  const cursorImage = "https://img.freepik.com/premium-photo/ai-images_1247965-9623.jpg"; // Replace with your animated cursor image

  return (
    <div
      className="min-h-screen w-full bg-gray-900 text-white relative overflow-hidden flex items-center justify-center"
      style={{
        cursor: `url(${cursorImage}), auto`,
      }}
    >
      {/* Animated Background Circles */}
      <div className="absolute bg-blue-500 opacity-10 blur-2xl rounded-full h-[400px] w-[400px] top-[-200px] left-[-200px] animate-pulse"></div>
      <div className="absolute bg-pink-500 opacity-10 blur-2xl rounded-full h-[400px] w-[400px] bottom-[-200px] right-[-200px] animate-pulse"></div>

      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center relative z-10">
        {/* Left Content */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 animate-fadeInLeft">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Welcome to AQI Tracker
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            This is the first homepage of our AQI Project! Explore real-time air
            quality data, gain insights into pollution levels in your city, and
            learn how we can make a difference together. Join us on our mission
            to provide accurate, reliable air quality updates for healthier
            lives.
          </p>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-medium hover:scale-110 transform transition duration-300 shadow-md hover:shadow-lg">
            Learn More <ArrowOutwardIcon />
          </button>
        </div>

        {/* Right Content (Image Grid) */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
          <img
            src={Newspaper}
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:rotate-2 hover:shadow-pink-500"
          />
          <img
            src={Newspaper}
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:-rotate-2 hover:shadow-blue-500"
          />
          <img
            src={Newspaper}
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:rotate-3 hover:shadow-green-500"
          />
          <img
            src={Newspaper}
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:-rotate-3 hover:shadow-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}
