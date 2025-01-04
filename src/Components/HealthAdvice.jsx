import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaShareAlt } from "react-icons/fa";

const aqiData = [
  // Your existing AQI data here...
  {
    id: 1,
    title: "Good",
    aqi: "0-50",
    healthAdvice: [
      "Air quality is satisfactory, and air pollution poses little or no risk.",
      "Outdoor activities are safe for all individuals.",

    ],
    color: "bg-green-500",
    image:
      "https://media.istockphoto.com/id/504342172/photo/city-life-main-bazar-paharganj-new-delhi-india.jpg?s=612x612&w=0&k=20&c=IuuvPUyRDPQ85vaL-33p62Ah3kfdwWF0YkFVWcYOEKo=",
  },
  {
    id: 2,
    title: "Moderate",
    aqi: "51-100",
    healthAdvice: [
      "Air quality is acceptable; however, some pollutants may pose a moderate health concern for a small number of people.",
    ],
    color: "bg-yellow-500",
    image:
      "https://img.freepik.com/premium-photo/land-pollution-air-pollution-water-pollution-greenhouse-gas-emissions-waste-generation-its-c_27550-6590.jpg",
  },
  {
    id: 3,
    title: "Unhealthy for Sensitive Groups",
    aqi: "101-150",
    healthAdvice: [
      "Sensitive groups may experience health effects; the general public is less likely to be affected.",

    ],
    color: "bg-orange-500",
    image:
      "https://cdn.who.int/media/images/default-source/air-pollution/air-pollution-in-urban-area.tmb-1200v.jpg?sfvrsn=4f0a3c36_6",
  },
  {
    id: 4,
    title: "Unhealthy",
    aqi: "151-200",
    healthAdvice: [
      "Everyone may begin to experience health effects; sensitive groups may experience more serious effects.",


    ],
    color: "bg-red-500",
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/11/Delhi-AQI-Reuters.png?impolicy=website&width=770&height=431",
  }, {
    id: 5,
    title: "Very Unhealthy",
    aqi: "201-300",
    healthAdvice: [
      "Significant health effects expected for all, especially those with respiratory or heart conditions.",


    ],
    color: "bg-purple-700",
    image: "https://cdn.britannica.com/76/155676-050-40CF909F/Air-pollution-vehicle-tailpipes-number-criteria-pollutants.jpg",
  },
  {
    id: 6,
    title: "Hazardous",
    aqi: "301-400",
    healthAdvice: [
      "Health warnings of emergency conditions; everyone is likely to be affected.",
      "Stay indoors with windows closed and use an air purifier if possible.",

    ],
    color: "bg-purple-900",
    image: "https://media.istockphoto.com/id/1434610444/photo/heavy-traffic-on-the-streets-of-new-delhi-in-new-delhi-covered-in-heavy-smog.jpg?s=612x612&w=0&k=20&c=OAIcQRRhIh_VtGQG-kcwzKYHDFDSnL5jEAmmxHUa88I=",
  },
  {
    id: 7,
    title: "Emergency Alert",
    aqi: "401-500",
    healthAdvice: [
      "Extremely dangerous to health; all individuals should remain indoors.",


    ],
    color: "bg-black",
    image: "https://media.istockphoto.com/id/517364023/photo/lotus-temple.jpg?s=612x612&w=0&k=20&c=Ap7wHtvS2nWcIyUsEDhThIln1VOcWlm50dVv7GYcBbI=",
  },
  {
    id: 8,
    title: "Critical Health Risk",
    aqi: "500+",
    healthAdvice: [
      "Critical air quality level with life-threatening effects.",

    ],
    color: "bg-black",
    image: "https://img.chemie.de/Portal/News/66d985aa7a042_TTpmN600W.png?tr=w-1200,h-600,cm-extract,x-28,y-80:n-news_teaser",
  },

];

export default function AQIHealthAdvice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [shareCard, setShareCard] = useState(null);

  // Function to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + (isSmallScreen ? 1 : 2)) % aqiData.length
    );
  };

  const handleExpandClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleShareClick = (id) => {
    setShareCard(shareCard === id ? null : id);
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-8  ">
      {/* Text Section */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-50 mb-8">
          "Breathe Easy,<h1 className="text-green-600">Live Healthy"</h1>
        </h1>
        <h3 className="text-lg font-medium text-gray-50 italic mb-8">
          "Your lungs deserve the best – keep an eye on the air you breathe."
        </h3>
        <p className="text-lg text-gray-50">
          Maintaining good air quality is essential for health and well-being.
          Staying aware of AQI levels can help you make informed decisions to
          protect yourself and others, especially during high-pollution days.
        </p>
      </div>

      {/* AQI Card Section */}
      <div className="w-full md:w-3/4 lg:w-3/4 flex flex-wrap justify-center gap-4 mt-8">
        {aqiData.slice(currentIndex, currentIndex + (isSmallScreen ? 1 : 3)).map((item) => (
          <div
            key={item.id}
            className={`w-full sm:w-1/2 h-[35rem] md:w-1/3 lg:w-1/4 max-w-md mb-8 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 ${item.color}`}
          >
            <img
              src={item.image}
              alt={`${item.title} level`}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 w-full">
              <h2 className="text-2xl font-bold text-white">{item.title}</h2>
              <p className="text-white text-opacity-80 mb-4">
                AQI Range: {item.aqi}
              </p>
              <p className="text-white">
                {expandedCard === item.id
                  ? item.healthAdvice.join(" ")
                  : `${item.healthAdvice.slice(0, 2).join(" ")}...`}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleExpandClick(item.id)}
                  className="px-4 py-2 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
                >
                  {expandedCard === item.id ? "Show Less" : "Show More"}
                </button>
                <button
                  onClick={() => handleShareClick(item.id)}
                  className="text-white text-xl"
                >
                  <FaShareAlt />
                </button>
              </div>
              {shareCard === item.id && (
                <div className="mt-4 flex justify-around text-white">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://wa.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  );
}
