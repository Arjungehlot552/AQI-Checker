import React, { useState } from 'react';
import WeatherApp from './WeatherApp';
import { capitalizeFirstLetter } from '../utils';

const api = {
    key: "59b3e3201bb813c0b51f78631d5b30c8",
    base: "https://api.openweathermap.org/data/2.5/",
};

const Header = ({ search, setSearch, searchPressed }) => (
    <header className="bg-cover bg-center h-[60vh] w-full flex flex-col justify-center items-end text-white p-4"
        style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/artificial-intelligence-hand-dark-background-digital-hologram-futuristic-concept-generative-ai_77190-10876.jpg')" }}>
        <div className='flex flex-col w-[40%] items-center'>
        <h1 className="text-4xl font-bold mb-8">Real-time Temperature Check</h1>
        <div className="flex items-center w-[60%]">
            <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-transparent border"
                placeholder="Search by Location, City, or Country"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchPressed} className="bg-blue-500 text-white ml-4 py-2 px-4 rounded-lg w-full sm:w-auto">Search</button>
        </div>
        </div>
    </header>   
);

const SearchResult = ({ weather, aqiData }) => (
    <section className="mb-6 px-10 py-8 text-white rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-2xl text-white font-semibold mb-4">Search Results</h2>
        {weather.main ? (
            <div className="flex items-center text-white flex-wrap">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                    className="w-12 h-12"
                />
                <div className="ml-4 text-white ">
                    <h3 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h3>
                    <p className="text-gray-500">{capitalizeFirstLetter(weather.weather[0].description)}</p>
                    <p className="text-orange-600 font-bold text-lg">{weather.main.temp}°C</p>

                    {aqiData && aqiData.air_quality ? (
                        <div>
                            <p className="text-lg text-white  font-bold">AQI: {aqiData.air_quality['us-epa-index']}</p>
                            <p>CO: {aqiData.air_quality.co.toFixed(2)} μg/m³</p>
                            <p>NO2: {aqiData.air_quality.no2.toFixed(2)} μg/m³</p>
                            <p>O3: {aqiData.air_quality.o3.toFixed(2)} μg/m³</p>
                            <p>SO2: {aqiData.air_quality.so2.toFixed(2)} μg/m³</p>
                            <p>PM2.5: {aqiData.air_quality.pm2_5.toFixed(2)} μg/m³</p>
                            <p>PM10: {aqiData.air_quality.pm10.toFixed(2)} μg/m³</p>
                        </div>
                    ) : (
                        <p className="text-gray-50">AQI data is currently unavailable.</p>
                    )}
                </div>
            </div>
        ) : (
            <p className="text-gray-50">Enter a location to see weather details.</p>
        )}
    </section>
);

const TemperatureRanking = ({ data, deleteEntry }) => (
    <aside className=" mb-7 px-8 pt-6 pb-10 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm mx-auto lg:mx-0">
        <h2 className="text-2xl text-white  font-semibold mb-4">Search History</h2>
        <div className="space-y-4">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="bg-gray-900 px-6 py-4 rounded-lg shadow flex justify-between items-center">
                        <div className='flex flex-col space-y-1'>
                            <p className="font-bold">{item.name}, {item.country}</p>
                            <p className="text-sm text-orange-600">{item.temp}°C</p>
                            <p className="text-sm text-gray-300">{item.weatherDescription}</p>
                        </div>
                        <button
                            onClick={() => deleteEntry(index)}
                            className="text-red-500 hover:text-red-700 font-bold"
                        >
                            Delete
                        </button>
                    </div>
                ))) : (
                <p className="text-gray-50">No search history available.</p>)}
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
                                    weatherDescription: `${result.weather[0].main} - ${result.weather[0].description}`
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
        <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="flex flex-col pb-8 text-white pt-20 w-full items-center">
            
            <Header search={search} setSearch={setSearch} searchPressed={searchPressed} />
            <div className="flex flex-col text-white lg:flex-row w-full max-w-6xl mt-8">
                <div className="text-white  border rounded-xl flex-grow max-h-60">
                    <SearchResult weather={weather} aqiData={aqiData} />
                </div>
                <div className="lg:ml-4 text-white  w-full lg:w-1/3">
                    <TemperatureRanking data={searchHistory} deleteEntry={deleteEntry} />
                </div>
            </div>
            {/* <WeatherApp />  */}
        </div>
    );
};

export default Resources;
