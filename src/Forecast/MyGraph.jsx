import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MyGraph = () => {
  const [aqiData, setAqiData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  const generateRandomData = (length, min, max) =>
    Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);

  // Update data dynamically
  useEffect(() => {
    setAqiData(generateRandomData(7, 100, 200));
    setForecastData(generateRandomData(10, 50, 150));
  }, []);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true, // Maintains fixed aspect ratio
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: "#ffffff" }, grid: { color: "#444444" } },
      y: { ticks: { color: "#ffffff" }, grid: { color: "#444444" } },
    },
  };

  const historyData = {
    labels: ["03 AM", "06 AM", "09 AM", "12 PM", "03 PM", "06 PM", "09 PM"],
    datasets: [
      {
        label: "AQI",
        data: aqiData,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.3)",
        fill: true,
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const forecastChartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Forecast AQI",
        data: forecastData,
        borderColor: "#1e90ff",
        backgroundColor: "rgba(30, 144, 255, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const columnChartData = {
    labels: ["PM10", "PM2.5", "SO2", "NO2", "CO"],
    datasets: [
      {
        label: "Concentration",
        data: generateRandomData(5, 50, 200),
        backgroundColor: ["#ff4500", "#ffa500", "#32cd32", "#1e90ff", "#9400d3"],
      },
    ],
  };


  const polarData = {
    labels: ["Humidity", "Temperature", "Wind Speed", "UV Index"],
    datasets: [
      {
        data: generateRandomData(4, 10, 50),
        backgroundColor: ["#2196f3", "#ff5722", "#8bc34a", "#ffc107"],
      },
    ],
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-10 overflow-y-auto">
      <h1 className="text-3xl font-bold text-center mb-10">Air Quality Monitoring Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Historical AQI Data */}
        <div className="p-5 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-5">Historical AQI Data</h2>
          <div className="h-80">
            <Line data={historyData} options={commonOptions} />
          </div>
        </div>
        
        {/* Forecast Data */}
        <div className="p-5 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-5">10-Day AQI Forecast</h2>
          <div className="h-80">
            <Line data={forecastChartData} options={commonOptions} />
          </div>
        </div>

        {/* Column Chart */}
        <div className="p-5 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-5">Gas Concentration</h2>
          <div className="h-80">
            <Bar data={columnChartData} options={commonOptions} />
          </div>
        </div>


        {/* Polar Area Chart */}
        <div className="p-5 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-5">Weather Metrics</h2>
          <div className="h-80  text-white">
            <PolarArea data={polarData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGraph;
