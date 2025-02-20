import React, { useState } from "react";
import "./../index.css"

const AQIPage = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const apiKey = "59b3e3201bb813c0b51f78631d5b30c8";

  const fetchLocationAQI = () => {
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
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result && result.list) {
        const data = result.list[0].components;
        setLocationData(data);
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

  const fetchSearchAQI = async () => {
    if (!searchQuery) return;

    setLoading(true);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result && result.coord) {
        // Use the coordinates from the searched location to fetch AQI data
        fetchAQIData(result.coord.lat, result.coord.lon);
        setError("");
      } else {
        setError("Failed to fetch location data.");
      }
    } catch (err) {
      setError("An error occurred while searching for location.");
      console.error("Error fetching location data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Enter key press in the input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchSearchAQI();
    }
  };

  // Function to calculate AQI based on the given concentrations
  const calculateAQI = (concentration, pollutant) => {
    let AQI = 0;

    const breakpoints = {
      pm2_5: [
        { range: [0, 12], AQI: [0, 50] },
        { range: [12.1, 35.4], AQI: [51, 100] },
        { range: [35.5, 55.4], AQI: [101, 150] },
        { range: [55.5, 150.4], AQI: [151, 200] },
        { range: [150.5, 250.4], AQI: [201, 300] },
        { range: [250.5, 500.4], AQI: [301, 500] },
      ],
      pm10: [
        { range: [0, 54], AQI: [0, 50] },
        { range: [55, 154], AQI: [51, 100] },
        { range: [155, 254], AQI: [101, 150] },
        { range: [255, 354], AQI: [151, 200] },
        { range: [355, 424], AQI: [201, 300] },
        { range: [425, 604], AQI: [301, 500] },
      ],
      co: [
        { range: [0, 4.4], AQI: [0, 50] },
        { range: [4.5, 9.4], AQI: [51, 100] },
        { range: [9.5, 12.4], AQI: [101, 150] },
        { range: [12.5, 15.4], AQI: [151, 200] },
        { range: [15.5, 30.4], AQI: [201, 300] },
        { range: [30.5, 50], AQI: [301, 500] },
      ],
    };

    const pollutantBreakpoints = breakpoints[pollutant];
    if (pollutantBreakpoints) {
      for (let i = 0; i < pollutantBreakpoints.length; i++) {
        const { range, AQI: [low, high] } = pollutantBreakpoints[i];
        if (concentration >= range[0] && concentration <= range[1]) {
          AQI = ((high - low) / (range[1] - range[0])) * (concentration - range[0]) + low;
          break;
        }
      }
    }

    return Math.round(AQI);
  };

  const getOverallAQI = () => {
    if (!locationData) return null;

    const pm2_5_AQI = calculateAQI(locationData.pm2_5, "pm2_5");
    const pm10_AQI = calculateAQI(locationData.pm10, "pm10");
    const co_AQI = calculateAQI(locationData.co, "co");

    return Math.max(pm2_5_AQI, pm10_AQI, co_AQI); // The highest AQI is used
  };

  const overallAQI = getOverallAQI();

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="mt-20 min-h-[70vh] border-2 rounded-3xl border-emerald-200 flex flex-col items-center justify-center  text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-white animate-pulse text-center">Real-Time AQI Gases Checker of any city</h1>

      {/* Search Input */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search for a place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-4 py-2 rounded-md text-black focus:outline-none"
        />
        <button
          onClick={fetchSearchAQI}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow-lg hover:bg-blue-200 transition transform hover:scale-105 duration-300"
        >
          Search AQI
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* Display AQI Value */}
      {overallAQI !== null && (
        <div className="text-5xl mb-6 text-white font-bold text-center mt-6 flex items-center justify-center">
          <span className="text-red-500 text-3xl mr-2 animate-blink">●</span> {/* Blinking red dot */}
          Live AQI: {overallAQI} {/* AQI value */}
        </div>
      )}

      {locationData && (
        <div className="mt-6 flex flex-col lg:flex-row text-center  justify-center space-y-6 lg:space-y-0 lg:space-x-6 w-full">
          {/* AQI Information */}
          <div className="flex-1 p-6 rounded shadow-lg bg-gray-600 text-white max-w-md">
            <h2 className="text-2xl font-semibold">Air Quality Information</h2>
            <p className="text-lg mt-4"><strong>PM2.5:</strong> {locationData.pm2_5} μg/m³</p>
            <p className="text-lg"><strong>PM10:</strong> {locationData.pm10} μg/m³</p>
            <p className="text-lg"><strong>CO:</strong> {locationData.co} μg/m³</p>
            <p className="text-lg"><strong>SO₂:</strong> {locationData.so2} μg/m³</p>
            <p className="text-lg"><strong>NH₃:</strong> {locationData.nh3} μg/m³</p>
            <p className="text-lg"><strong>O₃:</strong> {locationData.o3} μg/m³</p>
            <p className="text-lg"><strong>NO₂:</strong> {locationData.no2} μg/m³</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AQIPage;
