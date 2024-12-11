import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AQIPage = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [historicalAQIData, setHistoricalAQIData] = useState([]);
  const apiKey = "b63160ff-205c-40cc-a6c6-aea3ab7d6aa1"; // Replace with your API key
  
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchAQIData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Location permission denied. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchAQIData = async (latitude, longitude) => {
    setLoading(true);
    const url = `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      console.log("THis is my mapcomponent" , result)

      if (result.status === "success") {
        setLocationData(result.data);
      
        localStorage.setItem("aqiValue", result.data.current.pollution.aqius);
        fetchHistoricalData(result.data.city, result.data.state, result.data.country);
        setError("");
      } else {
        setError("Failed to fetch AQI data.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error("Error fetching AQI data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = (city, state, country) => {
    const data = Array.from({ length: 10 }, (_, index) => ({
      date: `Day ${index + 1}`,
      aqi: Math.floor(Math.random() * 200) + 50,
    }));
    setHistoricalAQIData(data);
  };

  
  const getAqiLevel = (aqius) => {
    let level = "";
    let message = "";
    let color = "";

    if (aqius <= 50) {
      level = "Good";
      message = "Air quality is satisfactory.";
      color = "text-green-500";
    } else if (aqius <= 100) {
      level = "Moderate";
      message = "Air quality is acceptable.";
      color = "text-yellow-500";
    } else if (aqius <= 150) {
      level = "Unhealthy for Sensitive Groups";
      message = "People with respiratory issues should limit outdoor exertion.";
      color = "text-orange-500";
    } else if (aqius <= 200) {
      level = "Unhealthy";
      message = "Everyone may experience health effects.";
      color = "text-red-500";
    } else if (aqius <= 300) {
      level = "Very Unhealthy";
      message = "Health alert: everyone may experience more serious health effects.";
      color = "text-purple-500";
    } else {
      level = "Hazardous";
      message = "Health warning: everyone should avoid outdoor activities.";
      color = "text-gray-500";
    }

    return { level, message, color };
  };

  const getGradientBackground = (aqius) => {
    if (aqius <= 50) {
      return "bg-gradient-to-r from-green-400 to-green-600"; // Good
    } else if (aqius <= 100) {
      return "bg-gradient-to-r from-yellow-400 to-yellow-600"; // Moderate
    } else if (aqius <= 150) {
      return "bg-gradient-to-r from-orange-400 to-orange-600"; // Unhealthy for Sensitive Groups
    } else if (aqius <= 200) {
      return "bg-gradient-to-r from-red-300 to-red-600"; // Unhealthy
    } else if (aqius <= 300) {
      return "bg-gradient-to-r from-purple-400 to-purple-600"; // Very Unhealthy
    } else if (aqius <= 400) {
      return "bg-gradient-to-r from-pink-600 to-pink-800"; // Hazardous
    } else {
      return "bg-gradient-to-r from-[#7e0023] to-red-900"; // Extremely Hazardous
    }
  };


  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="py-16 min-h-[70vh] border-2 rounded-3xl border-emerald-200 flex flex-col items-center justify-center  text-white p-6">
      <h1 className="text-4xl font-bold mb-6 animate-pulse text-center">Real-Time AQI Checker</h1>
      <button
        onClick={fetchLocation}
        className="bg-white text-blue-600 font-semibold sm:mt-9 px-8 py-3 rounded-full shadow-lg hover:bg-blue-200 transition transform hover:scale-105 duration-300"
      >
        Check AQI in Your Location
      </button>

      {loading && <p className="mt-8 text-lg text-blue-200 animate-bounce text-center">Fetching AQI data...</p>}

      {error && (
        <div className="mt-8 p-4 bg-red-600 text-white rounded shadow-lg w-full max-w-md mx-auto">
          <p>{error}</p>
        </div>
      )}

      {locationData && (
        <div className="mt-16 flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-6 w-full">
          {/* AQI Information */}
          <div className="flex-1 p-6 rounded shadow-lg bg-gray-800 text-white max-w-md">
            <h2 className="text-2xl font-semibold">Air Quality Information</h2>
            {/* <p>City: {Data.city}</p> */}
            <p className="font-bold text-xl">City: {locationData.city}</p>
            <p>State: {locationData.state}</p>
            <p>Country: {locationData.country}</p>
            <div className="mt-4">
              <p className="text-lg font-bold">Current AQI Level:
                <span className={`${getAqiLevel(locationData.current.pollution.aqius).color} text-lg`}>
                  {getAqiLevel(locationData.current.pollution.aqius).level}
                </span>
              </p>
              <p>{getAqiLevel(locationData.current.pollution.aqius).message}</p>
              <p className="text-2xl font-bold">AQI:
                <span className={`${getAqiLevel(locationData.current.pollution.aqius).color} text-2xl font-bold`}>
                  {locationData.current.pollution.aqius}
                </span>
              </p>
              <p>Primary Pollutant: {locationData.current.pollution.mainus}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Weather Information</h3>
              <p>Temperature: {locationData.current.weather.tp}°C</p>
              <p>Humidity: {locationData.current.weather.hu}%</p>
              <p>Pressure: {locationData.current.weather.pr} hPa</p>
              <p>Wind Direction: {locationData.current.weather.wd}°</p>
              <p>Wind Speed: {locationData.current.weather.ws} m/s</p>
            </div>
          </div>

          {/* AQI Trend Chart with dynamic background */}
          {historicalAQIData.length > 0 && (
            <div className={`w-full max-w-2xl flex-1 text-white rounded-lg shadow-lg p-6 ${getGradientBackground(locationData.current.pollution.aqius)}`}>
              <h3 className="text-2xl font-semibold text-center mb-12 text-white">AQI Trend for Last 10 Days</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalAQIData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date"/>
                  <YAxis />
                  <Tooltip labelStyle={{color:'#fff'}} contentStyle={{backgroundColor:'rgb(0, 0, 0, 0.8)', border:'none', width:'5rem', borderRadius:'0.5rem'}}/>
                  <Line
                    type="monotone"
                    dataKey="aqi"
                    stroke={historicalAQIData[historicalAQIData.length - 1].aqi <= 50 ? "#4caf50" :
                      historicalAQIData[historicalAQIData.length - 1].aqi <= 100 ? "#ffeb3b" :
                        historicalAQIData[historicalAQIData.length - 1].aqi <= 150 ? "#ff9800" :
                          historicalAQIData[historicalAQIData.length - 1].aqi <= 200 ? "#f44336" :
                            "#9c27b0"}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AQIPage;
