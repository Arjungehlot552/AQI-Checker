import React, { useState } from 'react';
import AirMeter from '../Images/air-quality-description-2.png';

const api = {
  key: "59b3e3201bb813c0b51f78631d5b30c8",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherApp = ({}) => {
  const [aqi, setAqi] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [weather, setWeather] = useState(null);
  const [showData, setShowData] = useState(false);

  // Get AQI category based on value
  const getAqiCategory = (value) => {
    if (value <= 50) return { category: 'Good', advice: 'Air quality is satisfactory.' };
    if (value <= 100) return { category: 'Moderate', advice: 'Air quality is acceptable.' };
    if (value <= 150) return { category: 'Unhealthy for Sensitive Groups', advice: 'Health effects may occur.' };
    if (value <= 200) return { category: 'Unhealthy', advice: 'Everyone may experience health effects.' };
    if (value <= 300) return { category: 'Very Unhealthy', advice: 'Increased health effects for everyone.' };
    return { category: 'Hazardous', advice: 'Emergency conditions; everyone is likely to be affected.' };
  };

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${pinCode},IN&appid=${api.key}`);
      const data = await response.json();
      if (data.lat && data.lon) {
        fetchAQI(data.lat, data.lon);
        fetchWeather(data.lat, data.lon);
      } else {
        alert("Invalid Pin Code");
      }
    } catch (error) {
      alert("Failed to fetch data. Please try again.");
    }
  };

  const fetchAQI = async (lat, lon) => {
    try {
      const response = await fetch(`${api.base}air_pollution?lat=${lat}&lon=${lon}&appid=${api.key}`);
      const data = await response.json();
      if (data.list && data.list[0].main.aqi) {
        setAqi(data.list[0].main.aqi);
      } else {
        alert("AQI Data Unavailable");
      }
    } catch (error) {
      alert("Failed to fetch AQI data.");
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`);
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].description,
        windSpeed: data.wind.speed,
        localTime: new Date(data.dt * 1000).toLocaleTimeString(),
      });
    } catch (error) {
      alert("Failed to fetch weather data.");
    }
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setShowData(false);
    fetchCoordinates().then(() => setShowData(true));
  };

  const aqiDetails = getAqiCategory(aqi);

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="p-6  w-full  border-emerald-200 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Check weather according to your pincode</h1>
      <p className="mb-6 text-center">
        Stay updated on the current air pollution levels and weather conditions in your area, <br />
        with detailed information on major pollutants.
      </p>
      <form onSubmit={handleCheck} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter Pin Code"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="mb-4 p-2 rounded text-black"
        />
        <button className="bg-blue-700 p-2 rounded hover:bg-blue-800 transition-all">
          Check
        </button>
      </form>

      {showData && aqi && (
        <div className="grid lg:grid-cols-3 gap-8 mt-10 w-full max-w-4xl text-black">
          {/* AQI Info Section */}
          <div className="bg-gray-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">AQI Meter</h2>
            <img src={AirMeter} alt="AQI Meter" className="w-30 h-30 mb-4" />
            <p className="text-5xl font-bold">{aqi}</p>
            <p className="text-lg">{aqiDetails.category}</p>
            <p className="text-sm mt-4">{aqiDetails.advice}</p>
          </div>

          {/* Weather Details Section */}
          {weather && (
            <div className="bg-gray-600 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Weather Details</h2>
              <img src="https://img.freepik.com/premium-vector/weather-forecast-widget-collection-icon-mobile-application-program-with-rain-cloud-sun-snowing-windy-sunlight-symbol-vector-illustration-concept_38364-159.jpg" alt="AQI Meter" className="w-30 h-[9rem] mb-4" />
              <p className='mt-24'>Temperature: {weather.temperature}°C</p>
              <p>Condition: {weather.condition}</p>
              <p>Wind Speed: {weather.windSpeed} km/h</p>
              <p>Local Time: {weather.localTime}</p>
            </div>
          )}

          {/* Health Advice Section */}
          <div className="bg-gray-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Health Advice</h2>
            <img src="https://blog.taskarmall.com/uploads/images/202304/image_750x_643f66cc7db7d.jpg" alt="Health Advice" className="w-30 h-30 mb-4" />
            <ul className="list-disc mt-20 ml-5">
              <li>Wear Mask: {aqi < 100 ? 'Not Required' : 'Required'}</li>
              <li>Stay Indoor: {aqi < 150 ? 'Not Required' : 'Required'}</li>
              <li>Windows: {aqi < 150 ? 'Keep Open' : 'Keep Closed'}</li>
              <li>Use Purifier: {aqi < 150 ? 'Not Required' : 'Required'}</li>
              <li>Family: {aqi < 150 ? 'Allow Outdoor' : 'Limit Outdoor Activities'}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
