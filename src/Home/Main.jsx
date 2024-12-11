import React, { useState, useEffect } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";


export default function Main() {
  const phrase = "Welcome to DPCC Web";
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
    <div className="min-h-screen w-full  text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute bg-blue-500 opacity-10 blur-3xl rounded-full h-[400px] w-[400px] top-[-200px] left-[-200px] animate-pulse"></div>
      <div className="absolute bg-pink-500 opacity-10 blur-3xl rounded-full h-[400px] w-[400px] bottom-[-200px] right-[-200px] animate-pulse"></div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center z-10">
        {/* Left Section */}
        <div className="lg:w-1/2 space-y-6  mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl  font-bold">
            {currentText}
            <span className="inline-block w-1 bg-white animate-blink ml-1"></span>
          </h1>
          <p className="text-lg leading-relaxed">
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

        {/* Right Section (Image Grid) */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
          <img
            src='https://sscbs.du.ac.in/wp-content/uploads/2024/09/IMG-20240905-WA0003.jpg'
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:rotate-2 hover:shadow-pink-500"
          />
          <img
            src='https://dyncdn.exampathfinder.net/epf_n_attachments/organisation/OoKfvyM1/logo.png'
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:-rotate-2 hover:shadow-blue-500"
          />
          <img
            src='https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/5a15dc54-9ec9-40c8-981c-c03d9b32bd0e.png'
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:rotate-3 hover:shadow-green-500"
          />
          <img
            src='https://www.cheggindia.com/wp-content/uploads/2024/05/Districts-from-NCR--1024x614.png'
            alt="Economic Times"
            className="rounded-lg h-60 w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:-rotate-3 hover:shadow-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}
