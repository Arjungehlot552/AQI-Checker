import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FaTemperatureHigh, FaMask, FaHome, FaDoorOpen, FaWind, FaPeopleArrows } from 'react-icons/fa';

const AQIPage = () => {
  const [data, setData] = useState(null);
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState(false);

  // Function to categorize AQI level
  const getAQILevel = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return { level: 'Good', color: 'green' };
    if (aqi >= 51 && aqi <= 100) return { level: 'Moderate', color: 'yellow' };
    if (aqi >= 101 && aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'orange' };
    if (aqi >= 151 && aqi <= 200) return { level: 'Unhealthy', color: 'red' };
    if (aqi >= 201 && aqi <= 300) return { level: 'Very Unhealthy', color: 'purple' };
    if (aqi >= 301) return { level: 'Hazardous', color: 'maroon' };
    return { level: 'Unknown', color: 'gray' };
  };

  // Fetch AQI and weather data using the WeatherAPI
  const fetchAQIData = async (pincode) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      
      // Log API key for debugging
      console.log("API Key:", apiKey);

      if (!apiKey) {
        throw new Error("API Key is missing. Please check your environment variable setup.");
      }

      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${pincode}`
      );

      const aqi = response.data.current.air_quality ? response.data.current.air_quality.aqi : 50;

      const { level, color } = getAQILevel(aqi);
      setData({
        aqi,
        aqiLevel: level,
        aqiColor: color,
        temperature: response.data.current.temp_c,
        weather: response.data.current.condition.text,
        localTime: response.data.location.localtime,
        healthTips: {
          wearMask: 'Not Required',
          stayIndoor: 'Not Required',
          windows: 'Keep Open',
          usePurifier: 'Not Required',
          family: 'Allow Outdoor',
        },
        forecast: [
          { day: 'Fri', condition: 'Moderate rain', temp: 26, humidity: 90 },
          { day: 'Sat', condition: 'Patchy rain nearby', temp: 27, humidity: 84 },
          { day: 'Sun', condition: 'Moderate rain', temp: 27, humidity: 86 },
          { day: 'Mon', condition: 'Patchy rain nearby', temp: 27, humidity: 85 },
          { day: 'Tue', condition: 'Patchy rain nearby', temp: 27, humidity: 83 },
          { day: 'Wed', condition: 'Patchy rain nearby', temp: 28, humidity: 78 },
          { day: 'Thu', condition: 'Sunny', temp: 28, humidity: 78 },
        ],
      });
      setError(false);
    } catch (err) {
      setError(true);
      console.error('Error fetching data:', err.message);
    }
  };

  return (
    <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className="min-h-screen  flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Real-time Air Quality Index (AQI) Live
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Stay updated on the current air pollution levels and weather conditions in your area, with detailed information on the concentrations of major air pollutants in the ambient air.
      </p>
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter Pin Code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="p-2 border rounded-l-md focus:outline-none"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          onClick={() => fetchAQIData(pincode)}
        >
          Check
        </button>
      </div>

      {data && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-left">
              <h2 className={`text-2xl font-bold text-${data.aqiColor}-600`}>{data.aqiLevel}</h2>
              <p className="text-sm text-gray-500">{data.aqi}</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaTemperatureHigh className="text-4xl text-yellow-500" />
              <span className="text-xl font-semibold">{data.temperature}˚C</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">{data.weather}</p>
            <p className="text-gray-500">
              Local Time: {format(new Date(data.localTime), 'HH:mm | yyyy-MM-dd')}
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">Health Advice</h3>
          <div className="grid grid-cols-2 gap-4">
            <AdviceCard icon={<FaMask />} text="Wear Mask" advice={data.healthTips.wearMask} />
            <AdviceCard icon={<FaHome />} text="Stay Indoor" advice={data.healthTips.stayIndoor} />
            <AdviceCard icon={<FaDoorOpen />} text="Windows" advice={data.healthTips.windows} />
            <AdviceCard icon={<FaWind />} text="Use Purifier" advice={data.healthTips.usePurifier} />
            <AdviceCard icon={<FaPeopleArrows />} text="Family" advice={data.healthTips.family} />
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Weather Forecast</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.forecast.map((day, index) => (
              <ForecastCard key={index} day={day} />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500">Failed to fetch data. Please try again later.</p>
      )}
    </div>
  );
};

const AdviceCard = ({ icon, text, advice }) => (
  <div className="flex items-center p-2 border rounded shadow-sm">
    <div className="text-xl text-gray-600 mr-2">{icon}</div>
    <div className="text-left">
      <p className="text-sm font-medium">{text}</p>
      <p className="text-sm text-gray-500">{advice}</p>
    </div>
  </div>
);

const ForecastCard = ({ day }) => (
  <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg shadow-md">
    <p className="text-sm font-medium text-gray-700">{day.day}</p>
    <p className="text-xs text-gray-500">{day.condition}</p>
    <p className="text-sm font-semibold text-gray-800">{day.temp}˚C</p>
    <p className="text-xs text-gray-600">{day.humidity}%</p>
  </div>
);

export default AQIPage;
