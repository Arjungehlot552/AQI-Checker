// src/App.js
import React, { useState, useEffect } from 'react';

function AQIRoom() {
  const [location, setLocation] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to get the user's location
  const fetchLocation = () => {
    setError('');
    setAqiData(null);
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setError('Location permission denied or unavailable.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  // Function to fetch AQI data from OpenWeatherMap
 // Function to fetch AQI data from OpenWeatherMap
const fetchAqiData = async (lat, lon) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      // console.log('API Key:', process.env.REACT_APP_WEATHER_API_KEY);
      // Check if the API key is present
      if (!apiKey) {
        setError('API key is missing. Please check your .env file.');
        setLoading(false);
        return;
      }
  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
  
      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Check if the data is valid
      if (!data.list || data.list.length === 0) {
        throw new Error('No AQI data available for this location.');
      }
  
      setAqiData(data.list[0]);
    } catch (error) {
      console.error('Error fetching AQI data:', error.message);
      setError(`Failed to fetch AQI data. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch AQI data when location changes
  useEffect(() => {
    if (location) {
      fetchAqiData(location.latitude, location.longitude);
    }
  }, [location]);

  // Function to get AQI level description
  const getAqiLevel = (aqi) => {
    switch (aqi) {
      case 1:
        return { level: 'Good', color: 'bg-green-500', message: 'Air quality is considered satisfactory.' };
      case 2:
        return { level: 'Fair', color: 'bg-yellow-400', message: 'Air quality is acceptable; moderate concern for some pollutants.' };
      case 3:
        return { level: 'Moderate', color: 'bg-orange-400', message: 'Air quality is unhealthy for sensitive groups.' };
      case 4:
        return { level: 'Poor', color: 'bg-red-500', message: 'Air quality is unhealthy; everyone may start to experience health effects.' };
      case 5:
        return { level: 'Very Poor', color: 'bg-purple-700', message: 'Air quality is hazardous; serious health effects.' };
      default:
        return { level: 'Unknown', color: 'bg-gray-500', message: 'Data not available.' };
    }
  };
  // bg-gradient-to-br from-blue-600 to-green-400
  return (
    <>
     <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className="pt-0 min-h-screen flex flex-col items-center justify-center  text-white p-6">
      <h1 className="text-4xl font-bold mb-6 animate-pulse">Real-Time AQI Checker</h1>
      <button
        onClick={fetchLocation}
        className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-200 transition transform hover:scale-105 duration-300"
      >
        Check AQI in Your Room
      </button>

      {loading && <p className="mt-6 text-lg text-blue-200 animate-bounce">Fetching AQI data...</p>}

      {error && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded shadow-lg w-full max-w-md">
          <p>{error}</p>
        </div>
      )}

      {aqiData && (
        <div
          className={`mt-6 p-6 rounded shadow-lg w-full bg-white max-w-lg text-black`}
        >
          <h2 className="text-2xl font-semibold">Air Quality Index</h2>
          <p className="mt-2 font-bold">AQI Level: {getAqiLevel(aqiData.main.aqi).level}</p>
          <p className="mt-1">{getAqiLevel(aqiData.main.aqi).message}</p>
          <div className="mt-4 space-y-1">
            <p>CO: {aqiData.components.co} μg/m³</p>
            <p>NO₂: {aqiData.components.no2} μg/m³</p>
            <p>O₃: {aqiData.components.o3} μg/m³</p>
            <p>PM2.5: {aqiData.components.pm2_5} μg/m³</p>
            <p>PM10: {aqiData.components.pm10} μg/m³</p>
          </div>
        </div>
      )}
    </div>
    <div>
      
    </div>
    </>
   
  );
}

export default AQIRoom;
