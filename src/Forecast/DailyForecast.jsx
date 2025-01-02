import React, { useEffect, useState } from "react";
import MyGraph from "./MyGraph";
import Calender from "./Calender";
import { useLocation } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ForeCast from "../Components/ForeCast";

const DailyForecast = () => {

    // Random AQI between 250 to 480
    const [data, setData] = useState({});
    const [aqi, setAqi] = useState(0);
   
    const [weather, setWeather] = useState({});
    const apiKey = "b63160ff-205c-40cc-a6c6-aea3ab7d6aa1"; // Replace with your API key


    const location = useLocation().pathname.split('/').at(-1);
    localStorage.setItem("arjun",data)

    
    const fetchAQI = async () => {
        try {
            const response = await fetch(`https://api.waqi.info/feed/${location}/?token=2957d73d72e0f99e73a757c6c091c83fd6415f7c`);
            const res = await response.json();
            if (res.status == 'ok') {
                setData(res.data);
                setAqi(res.data.aqi);
            }
            else {
                console.log("Error fetching data");
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchAQI();
    }, [location]);

    // Determine Air Quality Category
    let airQuality = "";
    if (aqi <= 50) airQuality = "Good";
    else if (aqi <= 100) airQuality = "Moderate";
    else if (aqi <= 200) airQuality = "Poor";
    else if (aqi <= 300) airQuality = "Unhealthy";
    else if (aqi <= 400) airQuality = "Severe";
    else airQuality = "Hazardous";

    // Calculate gradient based on AQI value
    const getGradient = (aqi) => {
        if (aqi <= 50) {
            return "from-green-700 to-green-300"; // Good AQI
        } else if (aqi <= 100) {
            return "from-yellow-700 to-yellow-300"; // Moderate AQI
        } else if (aqi <= 200) {
            return "from-orange-700 to-orange-300"; // Poor AQI
        } else if (aqi <= 300) {
            return "from-red-700 to-red-300"; // Unhealthy AQI
        } else if (aqi <= 400) {
            return "from-red-700 to-red-300"; // Severe AQI
        } else {
            return "from-purple-700 to-purple-300"; // Hazardous AQI
        }
    };


    return (
        <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" mx-auto lg:pr-20 lg:pl-20 px-4 py-12 pt-32 w-full  text-white">
            {/* Live AQI Section */}
            <div className=" text-white  p-3 rounded-lg mb-6">
                <div className="bg-red-600 flex border-2 border-white p-1 h-10 w-16 text-center rounded-lg mb-2"> <div className="h-2 w-2 bg-white rounded-full m-auto"></div> <h2 className="text-md m-auto  ">Live</h2></div>
                <p className="text-3xl mb-3">{location.toUpperCase()} Air Quality Index (AQI) | Air Pollution</p>
                <p className="mb-1">Real-time PM2.5, PM10 air pollution level in India</p>
                <p>Last Updated: {new Date().toString()}</p>
            </div>

            {/* AQI Details Section and Map Section in Single Row */}
            <div className="flex flex-row mt-10 w-[100%] justify-between gap-8">
                {/* AQI Details Div */}
                <div className={`bg-gradient-to-t rounded-3xl w-[68%] h-[50vh] p-6 shadow-lg mb-6 ${getGradient(aqi)}`}>
                    <div className="flex flex-row items-center mb-4">
                        <div className="h-2 w-2 bg-red-600 rounded-full animate-ping mr-3"></div>
                        <h3 className="text-2xl font-semibold text-white">Live AQI</h3>
                    </div>

                    <div className="text-6xl font-bold ml-4 -mt-2 text-white mb-4">{aqi}</div>

                    <div className="flex flex-row items-center mb-4">
                        <span className="text-lg font-medium text-white">Air Quality is:</span>
                        <div className="text-xl font-bold p-4 ml-4 rounded-xl bg-lightgray text-black">{airQuality}</div>
                    </div>

                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="text-lg text-white mb-2">PM10: {data?.iaqi?.pm10?.v} µg/m³</p>
                            <p className="text-lg text-white">PM2.5: {data?.iaqi?.pm25?.v} µg/m³</p>
                        </div>

                        <div className="bg-transparent p-4 w-56 -mt-28 rounded-lg ">
                            <p className="text-2xl font-semibold text-white">14°C clear</p>
                            <p className="text-lg text-white">Humidity: {Math.floor(Math.random() * 50) + 40} %</p>
                            <p className="text-lg text-white">Wind Speed: {Math.floor(Math.random() * 15) + 5} km/h</p>
                            <p className="text-lg text-white">UV Index: {Math.floor(Math.random() * 10)}</p>
                        </div>
                    </div>



                    <div className="flex flex-col items-center justify-center">
                        <div className="w-[50%]">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Good</span>
                                <span>Poor</span>
                                <span>Very Poor</span>
                                <span>Hazardous</span>
                            </div>
                            <Slider
                                min={0}
                                max={500}
                                value={aqi}
                                handleStyle={{ border: "2px solid black" }}
                                trackStyle={{ background: "transparent" }}
                                railStyle={{ background: "linear-gradient(to right, #4caf50, #ffeb3b, #f44336 )", height: 14 }}
                                className="flex items-center justify-center bg-transparent"
                                disabled
                            />
                            <div className="flex mt-2 justify-between text-sm text-white">
                                <span>0</span>
                                <span>50</span>
                                <span>100</span>
                                <span>200</span>
                                <span>300</span>
                                <span>400</span>
                                <span>500+</span>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Map Div with iframe */}
                <div className="bg-gray-800 w-[30%] h-[50vh] rounded-3xl flex justify-center items-center shadow-xl">
                    <iframe
                        title="daily-forecast"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.721268543415!2d139.6917!3d35.6895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188e3f0b7f85e5%3A0x82c4261b0e80ab26!2s${location}!5e1!3m2!1sen!2sjp!4v1638899183151`}
                        width="100%"
                        height="100%"
                        style={{ border: 0, rounded: "10px" }}
                        allowFullScreen=""
                        loading="lazy"
                        zoom="2"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl"
                    ></iframe>
                </div>
            </div>
            <ForeCast />
            <Calender />
            <MyGraph />
        </div>
    );
};


export default DailyForecast;
