
import React from "react";

const ForeCast = () => {
    // Sample data for the forecast
    const hourlyForecast = [
        { time: "Now", aqi: 215, temp: 17, humidity: 40, wind: 5.4, color: "bg-purple-500" },
        { time: "23:30", aqi: 205, temp: 17, humidity: 41, wind: 7.2, color: "bg-purple-400" },
        { time: "00:30", aqi: 195, temp: 16, humidity: 42, wind: 3.6, color: "bg-red-500" },
        { time: "01:30", aqi: 185, temp: 16, humidity: 43, wind: 3.6, color: "bg-red-400" },
        { time: "02:30", aqi: 178, temp: 15, humidity: 44, wind: 3.2, color: "bg-orange-500" },
        { time: "03:30", aqi: 169, temp: 15, humidity: 45, wind: 2.8, color: "bg-orange-400" },
        { time: "04:30", aqi: 160, temp: 14, humidity: 46, wind: 2.5, color: "bg-yellow-500" },
        { time: "05:30", aqi: 152, temp: 14, humidity: 47, wind: 2.0, color: "bg-yellow-400" },
        { time: "06:30", aqi: 140, temp: 13, humidity: 50, wind: 1.8, color: "bg-green-500" },
        { time: "07:30", aqi: 130, temp: 14, humidity: 52, wind: 2.0, color: "bg-green-400" },
        { time: "08:30", aqi: 120, temp: 15, humidity: 54, wind: 2.5, color: "bg-blue-500" },
        { time: "09:30", aqi: 115, temp: 16, humidity: 56, wind: 3.0, color: "bg-blue-400" },
        { time: "10:30", aqi: 170, temp: 17, humidity: 58, wind: 3.5, color: "bg-red-600" },  // Unhealthy
        { time: "11:30", aqi: 185, temp: 18, humidity: 60, wind: 4.0, color: "bg-red-700" },  // Unhealthy
        { time: "12:30", aqi: 200, temp: 19, humidity: 62, wind: 4.5, color: "bg-purple-500" },  // Very Unhealthy
        { time: "01:30", aqi: 215, temp: 20, humidity: 64, wind: 5.0, color: "bg-purple-600" },  // Very Unhealthy
        { time: "02:30", aqi: 230, temp: 21, humidity: 66, wind: 5.5, color: "bg-purple-700" },  // Very Unhealthy
        { time: "03:30", aqi: 250, temp: 22, humidity: 68, wind: 6.0, color: "bg-purple-800" },  // Very Unhealthy
        { time: "04:30", aqi: 265, temp: 23, humidity: 70, wind: 6.5, color: "bg-purple-900" },  // Very Unhealthy
        { time: "05:30", aqi: 275, temp: 24, humidity: 72, wind: 7.0, color: "bg-gray-800" },  // Hazardous
        { time: "06:30", aqi: 290, temp: 25, humidity: 74, wind: 7.5, color: "bg-gray-800" },  // Hazardous
        { time: "07:30", aqi: 305, temp: 26, humidity: 76, wind: 8.0, color: "bg-gray-900" },  // Hazardous
        { time: "08:30", aqi: 275, temp: 27, humidity: 78, wind: 8.5, color: "bg-gray-800" },  // Hazardous
        { time: "09:30", aqi: 250, temp: 28, humidity: 80, wind: 9.0, color: "bg-purple-800" },  // Very Unhealthy
        { time: "10:30", aqi: 230, temp: 29, humidity: 82, wind: 9.5, color: "bg-purple-700" },  // Very Unhealthy
        { time: "11:30", aqi: 210, temp: 30, humidity: 84, wind: 10.0, color: "bg-purple-600" },  // Very Unhealthy
        { time: "12:30", aqi: 190, temp: 31, humidity: 86, wind: 10.5, color: "bg-red-600" },  // Unhealthy
        { time: "01:30", aqi: 170, temp: 32, humidity: 88, wind: 11.0, color: "bg-red-500" },  // Unhealthy
        { time: "02:30", aqi: 150, temp: 33, humidity: 90, wind: 11.5, color: "bg-red-400" },  // Unhealthy
    ];


    const dailyForecast = [
        { day: "Today", aqi: 188, tempMax: 26, tempMin: 15, wind: 10.8, humidity: 26 },
        { day: "Thu", aqi: 104, tempMax: 25, tempMin: 13, wind: 14.4, humidity: 29 },
        { day: "Fri", aqi: 112, tempMax: 24, tempMin: 12, wind: 14.4, humidity: 24 },
        { day: "Sat", aqi: 98, tempMax: 27, tempMin: 16, wind: 12.6, humidity: 30 },
        { day: "Sun", aqi: 92, tempMax: 28, tempMin: 17, wind: 11.2, humidity: 33 },
        { day: "Mon", aqi: 115, tempMax: 26, tempMin: 18, wind: 9.4, humidity: 28 },
        { day: "Tue", aqi: 130, tempMax: 25, tempMin: 19, wind: 8.6, humidity: 35 },
        { day: "Wed", aqi: 120, tempMax: 27, tempMin: 18, wind: 10.0, humidity: 32 },
        { day: "Next Thu", aqi: 140, tempMax: 24, tempMin: 17, wind: 13.0, humidity: 30 },
        { day: "Next Fri", aqi: 125, tempMax: 23, tempMin: 16, wind: 11.5, humidity: 31 },
        { day: "Next Sat", aqi: 110, tempMax: 22, tempMin: 15, wind: 12.8, humidity: 29 },
        { day: "Next Sun", aqi: 100, tempMax: 21, tempMin: 14, wind: 14.0, humidity: 32 }
    ];

    const airPollutants = {
        pm25: "139.5 µg/m³",
        pm10: "299.5 µg/m³",
        o3: "50 µg/m³",
        no2: "75 µg/m³",
    };

    return (
        <div className="p-6  min-h-screen w-full text-gray-200">

            {/* Hourly Forecast */}
            <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="rounded-lg shadow p-4 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Hourly Forecast</h2>
                <p className="text-gray-400 mb-4 text-center">Bhopal air quality index (AQI<sup>*</sup>) forecast</p>
                <div className="flex  space-x-4 overflow-x-auto">
                    {hourlyForecast.map((data, index) => (
                        <div
                            key={index}
                            className={`text-center p-3  rounded-lg shadow hover:scale-105 transition-all ${data.color} text-white`}
                        >
                            <p>{data.time}</p>
                            <p className="text-3xl font-bold">{data.aqi}</p>
                            <p>{data.temp}°</p>
                            <div className="flex justify-center items-center space-x-2">
                                {/* <i className="fas fa-wind text-white"></i> */}
                                <p>{data.wind} <br></br>  km/h</p>
                            </div>
                            <div className="flex justify-center items-center mb-8 space-x-2">
                                <i className="fas fa-tint text-white"></i>
                                <p>{data.humidity}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Daily Forecast */}
            <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" rounded-lg shadow p-4 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Daily Forecast</h2>
                <p className="text-gray-400 mb-4 text-center">Bhopal air quality index (AQI<sup>*</sup>) forecast</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {dailyForecast.map((data, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-gray-800 p-6 items-center rounded-lg shadow hover:scale-105 transition-all"
                        >
                            <p className="font-bold text-white">{data.day}</p>
                            <p className="text-lg font-bold text-red-400">{data.aqi}</p>
                            <div className="flex space-x-2">
                                <i className="fas fa-cloud-sun text-yellow-400"></i>
                                <p>{data.tempMax}° / {data.tempMin}°</p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <i className="fas fa-wind text-white"></i>
                                <p>{data.wind} km/h</p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <i className="fas fa-tint text-white"></i>
                                <p>{data.humidity}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Air Pollutants */}
            <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" rounded-lg shadow p-4">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Air Pollutants</h2>
                <p className="text-gray-400 mb-4 text-center">What is the current air quality in Bhopal?</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition-all">
                        <p className="text-gray-400">PM2.5</p>
                        <p className="text-lg font-bold">{airPollutants.pm25}</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition-all">
                        <p className="text-gray-400">PM10</p>
                        <p className="text-lg font-bold">{airPollutants.pm10}</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition-all">
                        <p className="text-gray-400">O₃</p>
                        <p className="text-lg font-bold">{airPollutants.o3}</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition-all">
                        <p className="text-gray-400">NO₂</p>
                        <p className="text-lg font-bold">{airPollutants.no2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForeCast;
