import React from "react";
import Newspaper from "../Images/Newspaper.png";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function EditorsPick() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="text-white lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl text-white font-bold mb-6">Editor's Pick</h1>
          <p className="text-lg text-white leading-relaxed mb-6">
            AQI.in is India’s leading platform for air quality monitoring, as
            featured in The Economic Times. Discover our journey from humble
            beginnings to becoming the nation's sole provider of comprehensive
            air pollution data and solutions. Learn how we started from scratch
            and now offer top-tier tools and services to combat air pollution
            effectively.
          </p>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition duration-300">
            Read Article{" "}
            <ArrowOutwardIcon />
          </button>
        </div>

        {/* Right Content (Image) */}
        <div className="lg:w-1/2">
        <h1 className="text-white text-5xl font-serif font-medium ml-4 mb-4">The Economic Times</h1>
          <img
            src={Newspaper}
            alt="Economic Times"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
