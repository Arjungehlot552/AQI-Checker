import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyAQIMap = () => {
    const [location, setLocation] = useState('');
    const [aqiData, setAqiData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAQIData = async (locationQuery) => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.waqi.info/feed/${locationQuery}/?token=2957d73d72e0f99e73a757c6c091c83fd6415f7c`);
            const data = await response.json();
            if (data && data.status === 'ok') {
                const currentAQI = data.data.aqi;

                setAqiData({
                    currentAQI,
                    city: data.data.city.name,
                    quality: currentAQI <= 50 ? "Good" : currentAQI <= 100 ? "Moderate" : "Unhealthy",
                    pm25: data.data.iaqi.pm25?.v,
                    pm10: data.data.iaqi.pm10?.v,
                    lastUpdated: data.data.time.s
                });

                if (map && data.data.city.geo) {
                    const [lat, lng] = data.data.city.geo;
                    map.setCenter({ lat, lng });
                }

                generateRandomForecast(currentAQI); // Generate random forecast data based on current AQI
            } else {
                setAqiData(null);
            }
        } catch (error) {
            console.error("Error fetching AQI data:", error);
            setAqiData(null);
        }
        setLoading(false);
    };

    const generateRandomForecast = (currentAQI) => {
        const forecast = [];
        for (let i = 1; i <= 10; i++) {
            const variation = Math.floor(Math.random() * 41) - 10; // Generates a value between -10 and +30
            forecast.push({
                date: `Day ${i}`,
                condition: "Approximate Prediction",
                temp: currentAQI + variation
            });
        }
        setForecastData(forecast);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js`;
        script.async = true;
        script.onload = () => initMap();
        document.head.appendChild(script);

        const initMap = () => {
            const googleMap = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 51.505, lng: -0.09 },
                zoom: 11,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            });

            const waqiMapOverlay = new window.google.maps.ImageMapType({
                getTileUrl: (coord, zoom) =>
                    `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=2957d73d72e0f99e73a757c6c091c83fd6415f7c`,
                name: 'Air Quality',
            });

            googleMap.overlayMapTypes.insertAt(0, waqiMapOverlay);
            setMap(googleMap);
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleSearch = () => {
        if (location) {
            fetchAQIData(location);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const chartData = {
        labels: forecastData.map(day => day.date),
        datasets: [
            {
                label: '10-Day AQI Forecast',
                data: forecastData.map(day => day.temp),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    return (
        <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" text-white min-h-screen">
            <div className="text-center mb-8">
                <p className="text-4xl mt-10 font-serif font-bold text-gradient">Air Quality Index Map</p>
                <div className="h-1 mt-2 rounded-xl bg-gradient-to-r from-white via-green-300 to-white relative" />
            </div>

            <div className="flex justify-center items-center space-x-4 mb-8">
                <input
                    type="text"
                    onKeyDown={handleKeyPress}
                    className="w-full sm:w-1/2 p-4 text-xl rounded-md text-black border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter a city or area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="p-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                >
                    Search
                </button>
            </div>

            <div id="map" style={{ height: '380px' }} className="w-full bg-white shadow-md rounded-md mb-8"></div>

            <div className="mt-[5.5rem]">
                <div className="relative min-h-screen bg-gray-900">
                    <video
                        src="https://www.aqi.in/media/weather-videos/4.mp4"
                        autoPlay
                        loop
                        muted
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />

                    <div className="relative z-10 text-white py-10 px-5 sm:px-10">
                        <header className="text-center mb-8 animate__animated animate__fadeIn">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
                                Real-time Weather and AQI Information
                            </h1>
                            <p className="text-3xl font-bold text-red-800">{location || "Delhi, NCR, India"}</p>
                        </header>

                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-opacity-70 bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate__animated animate__fadeIn">
                                <h2 className="text-2xl font-bold mb-2 flex items-center">
                                    Air Quality Index (AQI)
                                </h2>
                                {loading ? (
                                    <p>Loading AQI data...</p>
                                ) : aqiData ? (
                                    <>
                                        <p className="text-xl text-red-500">Current AQI: {aqiData.currentAQI}</p>
                                        <p className="text-lg">Air Quality: {aqiData.quality}</p>
                                        <p className="text-sm">PM2.5: {aqiData.pm25} | PM10: {aqiData.pm10}</p>
                                        <p className="text-sm">Last Updated: {aqiData.lastUpdated}</p>
                                    </>
                                ) : (
                                    <p className="text-red-500">AQI data unavailable</p>
                                )}
                            </div>

                            <div className="bg-opacity-70 bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate__animated animate__fadeIn">
                                <h2 className="text-2xl font-bold mb-2">Weather Conditions</h2>
                                {loading ? (
                                    <p>Loading weather data...</p>
                                ) : weatherData && weatherData.main ? (
                                    <>
                                        <p className="text-xl">Current Temperature: {weatherData.main.temp}°C</p>
                                        <p className="text-lg">Feels Like: {weatherData.main.feels_like}°C</p>
                                        <p className="text-sm">Wind: {weatherData.wind.speed} km/h</p>
                                        <p className="text-sm">Humidity: {weatherData.main.humidity}%</p>
                                        <p className="text-sm">Pressure: {weatherData.main.pressure} mb</p>
                                    </>
                                ) : (
                                    <p className="text-red-500">Weather data unavailable</p>
                                )}
                            </div>

                            <div className="bg-opacity-70 bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate__animated animate__fadeIn">
                                <h2 className="text-2xl font-bold mb-2">10-Day AQI Forecast</h2>
                                <ul className="space-y-2">
                                    {forecastData.length ? (
                                        forecastData.map((day, index) => (
                                            <li key={index} className="text-lg">
                                                {day.date}: {day.temp} (AQI Prediction)
                                            </li>
                                        ))
                                    ) : (
                                        <li>Loading forecast...</li>
                                    )}
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
                <h2 className="text-xl font-bold mb-4 text-center">AQI Forecast Chart</h2>
                <Line data={chartData} />
            </div>

            {/* Explore More */}
            <div className="flex justify-center mt-12">
                <div className="flex gap-5">
                    <Link to="/explore" className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all">
                        Explore More
                    </Link>
                    <Link to="/explore" className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
                        Explore More
                    </Link>
                    <Link to="/explore" className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all">
                        Explore More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyAQIMap;
