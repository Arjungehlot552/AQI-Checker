import React, { useState, useEffect } from "react";
import {
  FaWind,
  FaCloud,
  FaSun,
  FaTint,
  FaCloudSunRain,
  FaUmbrella,
} from "react-icons/fa";

const MoreWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching weather data (replace with your actual API)
    setLoading(true);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=India&appid=8ed6b75ac5bb4d07f81b77c3a9a65ea5"
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setSuggestions({
          heatStroke: "Avoid Outdoor",
          clothing: "Breathable Clothes",
          sunscreen: "Apply Sunscreen",
          driving: "Check Visibility",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  const main = weatherData?.main;
  const wind = weatherData?.wind;
  const visibility = weatherData?.visibility;
  const pressure = main?.pressure || "N/A";
  const windSpeed = wind?.speed || "N/A";
  const uvIndex = Math.random() * 10; // Dummy UV Index value

  return (
    <div
      style={{ backgroundColor: "rgb(5, 8, 22)" }}
      className=" text-white mx-4 min-h-screen flex flex-col justify-center items-center p-6 space-y-8"
    >
      <div className="flex  flex-wrap justify-center gap-6 mb-8">
        {/* Dynamic Weather Info Cards */}
        <WeatherCard
          title="Wind Speed"
          value={`${windSpeed} km/h`}
          description="Light Breeze"
          icon={<FaWind className="text-5xl text-green-400" />}
          bgColor="bg-gray-700"
        />
        {/* Suggestions Section */}
        <div className="bg-gray-900 p-6 mx-4 md:mx-10 flex flex-col sm:flex-row items-center rounded-lg w-full max-w-lg shadow-lg">
          <div className="flex-1 sm:ml-8 space-y-4">
            <h2 className="text-lg  sm:text-xl font-bold mb-4 text-center sm:text-left">
              Suggestions for Today
            </h2>
            {suggestions &&
              Object.entries(suggestions).map(([key, value]) => (
                <div
                  key={key}
                  className="flex w-full flex-wrap justify-between items-center gap-2 text-sm sm:text-lg"
                >
                  <span className="text-gray-400 capitalize">{key}:</span>
                  <span className="text-green-400">{value}</span>
                </div>
              ))}
          </div>
        </div>

        <WeatherCard
          title="Visibility"
          value={`${visibility ? (visibility / 1000).toFixed(1) : "N/A"} km`}
          description="Clear"
          icon={<FaCloud className="text-5xl text-blue-400" />}
          bgColor="bg-gray-700"
        />
        <WeatherCard
          title="Pressure"
          value={`${pressure} mb`}
          description="Normal"
          icon={<FaTint className="text-5xl text-red-400" />}
          bgColor="bg-gray-700"
        />
        <WeatherCard
          title="UV Index"
          value={`${uvIndex.toFixed(1)}`}
          description={uvIndex > 6 ? "High" : "Low"}
          icon={<FaSun className="text-5xl text-yellow-400" />}
          bgColor="bg-gray-700"
        />
        <WeatherCard
          title="Rain"
          value="2%"
          description="Rain Expected"
          icon={<FaCloudSunRain className="text-5xl text-blue-500" />}
          bgColor="bg-gray-700"
        />
        <WeatherCard
          title="Chance of Thunderstorm"
          value="20%"
          description="Moderate Chance"
          icon={<FaUmbrella className="text-5xl text-orange-500" />}
          bgColor="bg-gray-700"
        />
      </div>
    </div>
  );
};

// Enhanced Weather Card Component with Transparent Outer Background and Light Gray Inner Background
const WeatherCard = ({ title, value, description, icon, bgColor }) => (
  <div
    className={`p-6 rounded-lg w-72 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col items-center border-4 border-transparent ${bgColor} bg-opacity-80 hover:border-${bgColor.replace(
      "bg-",
      ""
    )}`}
  >
    <div className="mb-4">{icon}</div>
    <div className="bg-gray-900 p-4 rounded-md w-full">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </div>
);

export default MoreWeather;
