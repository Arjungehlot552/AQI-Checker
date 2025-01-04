import React, { useState, useEffect } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";

// import LineChart from "./LineChart";

export default function Main() {
  const phrase = "Welcome to SmartAQI";
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let charIndex = 0;

    const typeText = () => {
      if (charIndex < phrase.length) {
        setCurrentText(phrase.slice(0, charIndex + 1)); // Reveal one letter at a time
        charIndex++;
        setTimeout(typeText, 100); // Typing speed
      } else {
        setTimeout(() => {
          charIndex = 0; // Reset to start typing again
          setCurrentText(""); // Clear text before restarting
          typeText();
        }, 2000); // Delay before restarting
      }
    };

    typeText();
  }, []);

  return (
    <div className="min-h-screen w-full text-white flex items-center  justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute bg-blue-500 opacity-10 blur-3xl rounded-full h-[400px] w-[400px] top-[-200px] left-[-200px] animate-pulse"></div>
      <div className="absolute bg-pink-500 opacity-10 blur-3xl rounded-full h-[400px] w-[400px] bottom-[-200px] right-[-200px] animate-pulse"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center z-10">
        {/* Left Section */}
        <div className="lg:w-1/2 space-y-6 mb-2 sm:mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {currentText}
            <span className="inline-block w-1 bg-white animate-blink ml-1"></span>
          </h1>
          <p className="text-lg md:text-sm sm:text-base lg:text-lg leading-relaxed">
            This is the first homepage of our AQI Project! Explore real-time air
            quality data, gain insights into pollution levels in your city, and
            learn how we can make a difference together. Join us on our mission
            to provide accurate, reliable air quality updates for healthier
            lives.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link to="/LearnMore">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 mt-3 rounded-full font-medium hover:scale-110 transform transition duration-300 shadow-md hover:shadow-lg">
                Learn More <ArrowOutwardIcon />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section (Image Grid) */}
        <div className="lg:w-1/2 hidden sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
          <img
            src="https://t3.ftcdn.net/jpg/03/45/37/40/360_F_345374024_toXIjm8hecDggxAgFZ9nJRvT4v2rlQ4V.jpg"
            alt="Economic Times"
            className="rounded-lg h-40 sm:h-48 md:h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:rotate-2 hover:shadow-pink-500"
          />
          <img
            src="https://as1.ftcdn.net/v2/jpg/03/99/75/28/1000_F_399752812_83CXgeUwyy0zzwUkPCFmM9aLZpsB6ns5.jpg"
            alt="Economic Times"
            className="rounded-lg h-40 sm:h-48 md:h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:-rotate-2 hover:shadow-blue-500"
          />
          <img
            src="https://cdn.pixabay.com/photo/2023/04/22/11/12/environment-7943580_640.jpg"
            alt="Economic Times"
            className="rounded-lg h-40 sm:h-48 md:h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:rotate-3 hover:shadow-green-500"
          />
          <img
            src="https://img.freepik.com/premium-photo/tree-grows-from-polluted-ground-symbolizing-hope-greener-future_885831-170855.jpg"
            alt="Economic Times"
            className="rounded-lg h-40 sm:h-48 md:h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:-rotate-3 hover:shadow-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}
