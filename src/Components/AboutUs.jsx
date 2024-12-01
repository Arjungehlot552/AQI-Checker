import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

// Team member data
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
    name: "Kumari Alka",
    role: "ML Developer",
    img: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/78e88f76-29bf-4289-9624-719aec0f7bcb/e516f677-4846-4a28-9707-ba00ffa49479.png",
    linkedin: "https://www.linkedin.com/in/kumari-alka",
    github: "https://github.com/kumarialka",
    twitter: "https://twitter.com/kumari_alka",
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
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, teamMembers.length - 1));
  };

  const showLess = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  return (
    <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" mt-12 min-h-screen py-12 px-40">
      <div className="text-center text-white">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          About Our Project
        </h1>
        <p className="text-lg mb-12 max-w-2xl mx-auto font-medium">
          Welcome to AQI Checker Web! Our mission is to provide real-time air quality information along with 10-day predictive values to users. This empowers individuals to monitor air quality levels and make informed decisions regarding their health and the environment.
        </p>

        <h2 className="text-3xl font-semibold text-gray-100 mb-8">Meet Our Team</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.slice(currentIndex, currentIndex + 3).map((member, index) => (
          <div
            key={index}
            className="bg-gray-600 p-6 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-gray-700 object-cover transition-transform duration-500 transform hover:scale-110"
            />
            <h3 className="text-xl font-semibold ml-24 text-gray-100 mb-2">{member.name}</h3>
            <p className="text-gray-400 ml-24 mb-4">{member.role}</p>
            <div className="flex justify-center gap-4">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-gray-300 hover:text-blue-600 transition" size={24} />
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-300 hover:text-black transition" size={24} />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-300 hover:text-blue-400 transition" size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={showLess}
          disabled={currentIndex === 0}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 disabled:bg-gray-400 transition duration-300"
        >
          Show Less
        </button>
        <button
          onClick={showMore}
          disabled={currentIndex + 3 >= teamMembers.length}
          className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-400 transition duration-300"
        >
          Show More
        </button>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">What Makes Us Different</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Unlike other AQI platforms, we offer real-time AQI values combined with a 10-day forecast, allowing users to get a complete picture of the air quality in their area. Our platform uses advanced data analytics and machine learning models to predict air quality trends, giving users insights into future air pollution levels. With this information, individuals can make proactive decisions to protect themselves and their families.
        </p>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">Why AQI Matters</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          The Air Quality Index (AQI) is a vital tool for monitoring the safety of the air we breathe. Poor air quality can significantly impact health, particularly for individuals with respiratory conditions, children, and the elderly. By providing real-time and predictive AQI data, we aim to help users take the necessary precautions and lead healthier lives.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
