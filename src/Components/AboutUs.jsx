import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Pranay Pathak",
    role: "Team Lead",
    img: "https://www.aiease.ai/wp-content/uploads/2024/08/outdoor-ai-generated-male-headshot-from-AI-Ease-ai-professional-headshot-generator.webp",
    linkedin: "",
    github: "https://github.com/pranaypathak",
    twitter: "https://twitter.com/pranay_pathak",
  },
  {
    name: "Arjun Gehlot",
    role: "Full Stack Developer",
    img: "https://t4.ftcdn.net/jpg/03/06/63/61/360_F_306636176_KQbxttYdxWHsH3S6bYCD47NvVGdTL2xV.jpg",
    linkedin: "https://www.linkedin.com/in/arjun-gehlot",
    github: "https://github.com/arjungehlot",
    twitter: "https://twitter.com/arjun_gehlot",
  },
  {
    name: "Keshav Maheswari",
    role: "Backend Developer",
    img: "https://static.vecteezy.com/system/resources/thumbnails/037/098/807/small_2x/ai-generated-a-happy-smiling-professional-man-light-blurry-office-background-closeup-view-photo.jpg",
    linkedin: "https://www.linkedin.com/in/keshav-maheswari",
    github: "https://github.com/keshavmaheswari",
    twitter: "https://twitter.com/keshav_maheswari",
  },
  {
    name: "Gaurav Yadav",
    role: "Idea Strategist",
    img: "https://img.freepik.com/premium-photo/confidence-man-smile-business-indoors-executive-businessman-male-professional-office-portrait-generative-ai_163305-226167.jpg",
    linkedin: "https://www.linkedin.com/in/gaurav-yadav",
    github: "https://github.com/gauravyadav",
    twitter: "https://twitter.com/gaurav_yadav",
  },
  {
    name: "Shiva Singh",
    role: "App Developer",
    img: "https://static.vecteezy.com/system/resources/previews/041/914/387/large_2x/ai-generated-young-professional-man-working-on-laptop-focused-and-driven-progressive-and-modern-office-space-photo.jpeg",
    linkedin: "https://www.linkedin.com/in/shiva-singh",
    github: "https://github.com/shivasingh",
    twitter: "https://twitter.com/shiva_singh",
  },
];

function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showMore = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, teamMembers.length));
  };

  const showLess = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen py-24 px-6 md:px-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          About Our Project
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Welcome to AQI Checker Web! Our mission is to provide real-time air
          quality information along with 10-day predictive values to users.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {teamMembers.slice(currentIndex, currentIndex + 3).map((member, index) => (
          <div
            key={index}
            className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-gray-500 object-cover"
            />
            <h3 className="text-xl font-bold text-center">{member.name}</h3>
            <p className="text-gray-400 text-center mb-4">{member.role}</p>
            <div className="flex justify-center gap-4">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-gray-300 hover:text-blue-600 transition" size={24} />
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-300 hover:text-gray-400 transition" size={24} />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-300 hover:text-blue-400 transition" size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={showLess}
          disabled={currentIndex === 0}
          className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50 transition"
        >
          Show Less
        </button>
        <button
          onClick={showMore}
          disabled={currentIndex + 3 >= teamMembers.length}
          className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50 transition"
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
