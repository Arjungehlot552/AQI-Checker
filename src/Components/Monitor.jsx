import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MoreWeather from "./MoreWeather";
import HealthAdvice from "./HealthAdvice";
import Cigarette from "./Cigarette";
import { fetchingData } from "./CustomMapPath";
// import MonitorMap from './MonitorMap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyAQIMap = () => {
  const [location, setLocation] = useState("");
  const [aqiData, setAqiData] = useState(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: getNextThirtyDays(),
    datasets: [
      {
        label: "10-Day AQI Forecast",
        data: Array(30).fill(0),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  });

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "#8cf28c"; // Light Green - Good
    if (aqi <= 100) return "#fff3a3"; // Light Yellow - Moderate
    if (aqi <= 150) return "#ffb974"; // Light Orange - Unhealthy for sensitive groups
    if (aqi <= 200) return "#ff9898"; // Light Red - Unhealthy
    if (aqi <= 300) return "#d9a0d9"; // Light Purple - Very Unhealthy
    return "#b58ea5"; // Light Maroon - Hazardous
  };

  const aqiColor = getAQIColor(aqiData?.currentAQI || 0);

  // Helper function to calculate the next 10 days’ dates
  function getNextThirtyDays() {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      );
    }
    return dates;
  }
  const formatCityName = (cityName) => {
    // Regular expression to capture the city name up to the first non-letter sequence (ignoring extra details)
    const match = cityName.match(/^([A-Za-z\s]+)/);
    return match ? match[0].trim() : "Unknown City";
  };

  const fetchAQIData = async (locationQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.waqi.info/feed/${locationQuery}/?token=d2f68773-3e35-4212-b2f9-05610209d21e`
      );
      const data = await response.json();
      if (data && data.status === "ok") {
        const cityName = formatCityName(
          data.data?.city?.name || "Unknown City"
        );

        // Use this city name in your state setting
        setAqiData({
          currentAQI: data.data?.aqi || 0,
          city: cityName,
          quality:
            data?.aqi <= 50
              ? "Good"
              : data?.aqi <= 100
                ? "Moderate"
                : "Unhealthy",
          pm25: data?.iaqi?.pm25?.v || 0,
          pm10: data?.iaqi?.pm10?.v || 0,
          lastUpdated: data?.time?.s || new Date(),
        });

        const aqiValues = fetchingData(aqiData.city, "PM10")

        setChartData({
          labels: getNextThirtyDays(),
          datasets: [
            {
              label: "30-Day AQI Forecast",
              data: aqiValues,
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
          ],
        });

        if (map && data.data.city.geo) {
          const [lat, lng] = data.data.city.geo;
          map.setCenter({ lat, lng });
        }
      } else {
        setAqiData(null);
      }
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      setAqiData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    const initMap = () => {
      const googleMap = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: 21.2369408, lng: 71.3400064 },
          zoom: 3,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        }
      );

      const waqiMapOverlay = new window.google.maps.ImageMapType({
        getTileUrl: (coord, zoom) =>

          `https://tiles.waqi.info/tiles/asean-pm10/${zoom}/${coord.x}/${coord.y}.png?token=d2f68773-3e35-4212-b2f9-05610209d21e`,
        name: "Air Quality",
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
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Chart options and events
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            // Show AQI value on hover
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value} AQI`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div
        style={{ backgroundColor: "rgb(5, 8, 22)" }}
        className="pl-20 pr-20  text-white min-h-screen"
      >
        <div
          style={{ backgroundColor: "rgb(5, 8, 22)" }}
          className=" text-white min-h-screen"
        >
          <div className="text-center">
            <p className="text-4xl p-10 mt-20 font-serif font-bold text-gradient">
              Live AQI Stations Around the World
            </p>
            {/* <div className="h-1 mt-2 rounded-xl bg-gradient-to-r from-white via-green-300 to-white relative" /> */}
          </div>

          {/* <MonitorMap /> */}

          <div className="flex justify-center items-center space-x-4 mb-8">
            {/* <input
              type="text"
              onKeyDown={handleKeyPress}
              className="w-full sm:w-1/2 p-3 text-xl rounded-md bg-transparent border text-white "
              placeholder="Enter a city or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
            >
              Search
            </button> */}
          </div>

          <div
            id="map"
            style={{ height: "380px" }}
            className="w-full bg-white shadow-lg rounded-3xl mb-8"
          ></div>

          {/* <div
            className="min-h-screen rounded-3xl flex flex-col items-center"
            style={{ backgroundColor: "rgb(5, 8, 22)" }}
          > */}
            {/* Header Section
            <header className="text-center mt-10 px-5">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate__animated animate__fadeIn">
                Real-time Weather and AQI Information
              </h1>
              <p className="text-4xl font-bold text-white mt-4">
                {location} Live AQI{" "}
                <span
                  style={{
                    color: aqiColor,
                  }}
                >
                  {aqiData?.currentAQI || "N/A"}
                </span>
              </p>
            </header> */}

            {/* AQI Details Section
            <div className="flex items-center ml-96 -mr-40 mt-10 justify-center">
              <section className="grid grid-cols-1 items-center sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 w-full max-w-6xl">
                <div className="bg-gray-800 bg-opacity-70 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Air Quality Index (AQI)
                  </h2>
                  {loading ? (
                    <p className="text-gray-400">Loading AQI data...</p>
                  ) : aqiData ? (
                    <>
                      <p className="text-lg" style={{ color: aqiColor }}>
                        Current AQI: {aqiData.currentAQI}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-500">AQI data unavailable</p>
                  )}
                </div>
              </section>
            </div> */}

            {/* Graph Section */}
            {/* <div
              className="mt-10 w-full max-w-4xl p-5 rounded-lg shadow-lg bg-gray-900"
              style={{
                background: `linear-gradient(to right, ${aqiColor}, #000)`,
              }}
            >
              <Line data={chartData} options={chartOptions} />
            </div> */}

            {/* Learn More Link */}
            {/* <Link
              to="/more-weather"
              className="mt-10 mb-10  text-lg font-bold text-white underline hover:text-gray-300 transition-colors"
            >
              Learn More
            </Link>
          </div> */}
          <MoreWeather />
          {/* <Cigarette /> */}
          <HealthAdvice />
        </div>

        <section className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore More</h2>
          <div className="flex justify-center space-x-6">
            <Link to="/aqi-data">
              <button className="bg-blue-500 mb-12 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                View AQI Data
              </button>
            </Link>
            <Link to={'/monitor'} className="bg-blue-500 mb-12 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
              View Weather Data
            </Link>
            <Link to={'/blog'} className="bg-blue-500 mb-12 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
              Blogs
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyAQIMap;
