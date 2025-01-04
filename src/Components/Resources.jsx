import React, { useState } from 'react';

const api = {
    key: "59b3e3201bb813c0b51f78631d5b30c8",
    base: "https://api.openweathermap.org/data/2.5/",
};

const Header = ({ search, setSearch, searchPressed }) => (
    <header
        className="flex h-[60vh] w-full flex-col justify-center items-center text-white p-6 relative"
    >
        {/* Background image */}
        <div
            className="absolute inset-0 bg-cover bg-center hidden md:block bg-no-repeat z-0"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/premium-photo/artificial-intelligence-hand-dark-background-digital-hologram-futuristic-concept-generative-ai_77190-10876.jpg')",
            }}
        ></div>

        {/* Content */}
        <div className="text-center space-y-6 z-10 bg-black bg-opacity-50 p-6 rounded-lg">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Real-time Temperature Check
            </h1>
            <p className="text-lg text-gray-300">
                Get accurate temperature and air quality insights instantly.
            </p>
            <div className="flex items-center w-full max-w-md mx-auto">
                <input
                    type="text"
                    className="w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search by Location, City, or Country"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={searchPressed}
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                    Search
                </button>
            </div>
        </div>
    </header>
);


const SearchResult = ({ weather, aqiData }) => (
    <section className="mb-6 px-6 py-8 border bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {weather.main ? (
            <div className="flex items-center flex-wrap">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                    className="w-16 h-16"
                />
                <div className="ml-4">
                    <h3 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h3>
                    <p className="capitalize text-gray-300">{weather.weather[0].description}</p>
                    <p className="text-orange-500 text-lg font-bold">{weather.main.temp}°C</p>
                    {aqiData?.air_quality ? (
                        <div className="mt-4 space-y-1">
                            <p className="text-lg font-bold">AQI: {aqiData.air_quality['us-epa-index']}</p>
                            <p>CO: {aqiData.air_quality.co.toFixed(2)} μg/m³</p>
                            <p>NO2: {aqiData.air_quality.no2.toFixed(2)} μg/m³</p>
                            <p>O3: {aqiData.air_quality.o3.toFixed(2)} μg/m³</p>
                            <p>SO2: {aqiData.air_quality.so2.toFixed(2)} μg/m³</p>
                            <p>PM2.5: {aqiData.air_quality.pm2_5.toFixed(2)} μg/m³</p>
                            <p>PM10: {aqiData.air_quality.pm10.toFixed(2)} μg/m³</p>
                        </div>
                    ) : (
                        <p className="text-gray-400">AQI data is currently unavailable.</p>
                    )}
                </div>
            </div>
        ) : (
            <p className="text-gray-400">Enter a location to see weather details.</p>
        )}
    </section>
);

const TemperatureRanking = ({ data, deleteEntry }) => (
    <aside className="mb-8 px-6 py-6 bg-gray-900 text-white rounded-lg border shadow-lg w-full max-w-sm mx-auto lg:mx-0">
        <h2 className="text-2xl font-bold mb-4">Search History</h2>
        <div className="space-y-4">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="bg-gray-800 px-4 py-3 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold">{item.name}, {item.country}</p>
                            <p className="text-orange-500 text-sm">{item.temp}°C</p>
                            <p className="text-gray-400 text-sm">{item.weatherDescription}</p>
                        </div>
                        <button
                            onClick={() => deleteEntry(index)}
                            className="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-400">No search history available.</p>
            )}
        </div>
    </aside>
);

const Resources = () => {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [aqiData, setAqiData] = useState({});
    const [searchHistory, setSearchHistory] = useState([]);

    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then((result) => {
                setWeather(result);
                if (result && result.coord) {
                    fetch(`https://api.weatherapi.com/v1/current.json?key=cf49f073deb74befa6271611241411&q=${result.coord.lat},${result.coord.lon}`)
                        .then(aqiRes => aqiRes.json())
                        .then(aqiResult => {
                            setAqiData(aqiResult);
                            if (result.main && !searchHistory.some(item => item.name === result.name)) {
                                const newHistoryItem = {
                                    name: result.name,
                                    country: result.sys.country,
                                    temp: result.main.temp,
                                    weatherDescription: `${result.weather[0].main} - ${result.weather[0].description}`,
                                };
                                setSearchHistory([...searchHistory, newHistoryItem]);
                            }
                        });
                }
            });
    };

    const deleteEntry = (index) => {
        const updatedHistory = [...searchHistory];
        updatedHistory.splice(index, 1);
        setSearchHistory(updatedHistory);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-12">
            <Header search={search} setSearch={setSearch} searchPressed={searchPressed} />
            <div className="flex flex-col lg:flex-row w-full max-w-6xl mt-8 gap-6 px-4">
                <div className="flex-grow">
                    <SearchResult weather={weather} aqiData={aqiData} />
                </div>
                <div className="lg:w-1/3">
                    <TemperatureRanking data={searchHistory} deleteEntry={deleteEntry} />
                </div>
            </div>
        </div>
    );
};

export default Resources;
