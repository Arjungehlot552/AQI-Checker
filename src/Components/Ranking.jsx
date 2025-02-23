import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const App = () => {
  const [location, setLocation] = useState("India");
  const [rankingType, setRankingType] = useState("AQI Ranking");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const citiesPerPage = 10;


  const aqiData = [
    { rank: 1, city: "Ghaziabad", aqi: 489, status: "Hazardous" },
    { rank: 2, city: "Rohtak", aqi: 451, status: "Hazardous" },
    { rank: 3, city: "Jodhpur", aqi: 450, status: "Hazardous" },
    { rank: 4, city: "Sonipat", aqi: 449, status: "Hazardous" },
    { rank: 5, city: "New Delhi", aqi: 430, status: "Hazardous" },
    { rank: 6, city: "Amritsar", aqi: 412, status: "Hazardous" },
    { rank: 7, city: "Pali", aqi: 400, status: "Severe" },
    { rank: 8, city: "Ahmedabad", aqi: 394, status: "Severe" },
    { rank: 9, city: "Khem Karan", aqi: 383, status: "Severe" },
    { rank: 10, city: "Bali", aqi: 378, status: "Severe" },
    { rank: 11, city: "Phalodi", aqi: 375, status: "Severe" },
    { rank: 12, city: "Noida", aqi: 373, status: "Severe" },
    { rank: 13, city: "Bhiwani", aqi: 370, status: "Severe" },
    { rank: 14, city: "Kamarhati", aqi: 365, status: "Severe" },
    { rank: 15, city: "Bikaner", aqi: 365, status: "Severe" },
    { rank: 16, city: "Lucknow", aqi: 364, status: "Severe" },
    { rank: 17, city: "Meerut", aqi: 360, status: "Severe" },
    { rank: 18, city: "Bhiwadi", aqi: 349, status: "Severe" },
    { rank: 19, city: "Hapur", aqi: 348, status: "Severe" },
    { rank: 20, city: "Muzaffarnagar", aqi: 344, status: "Severe" },
    { rank: 21, city: "Shrirampur", aqi: 344, status: "Severe" },
    { rank: 22, city: "Jalandhar", aqi: 342, status: "Severe" },
    { rank: 23, city: "Panipat", aqi: 341, status: "Severe" },
    { rank: 24, city: "Faridabad", aqi: 340, status: "Severe" },
    { rank: 25, city: "Kanpur", aqi: 335, status: "Severe" },
    { rank: 26, city: "Jammu", aqi: 330, status: "Severe" },
    { rank: 27, city: "Chandigarh", aqi: 320, status: "Severe" },
    { rank: 28, city: "Patiala", aqi: 315, status: "Severe" },
    { rank: 29, city: "Gurugram", aqi: 310, status: "Severe" },
    { rank: 30, city: "Ambala", aqi: 305, status: "Severe" },
    { rank: 31, city: "Agra", aqi: 300, status: "Severe" },
    { rank: 32, city: "Bhopal", aqi: 295, status: "Severe" },
    { rank: 33, city: "Indore", aqi: 290, status: "Severe" },
    { rank: 34, city: "Chennai", aqi: 280, status: "Very Unhealthy" },
    { rank: 35, city: "Bhubaneswar", aqi: 270, status: "Very Unhealthy" },
    { rank: 36, city: "Kolkata", aqi: 260, status: "Very Unhealthy" },
    { rank: 37, city: "Pune", aqi: 250, status: "Very Unhealthy" },
    { rank: 38, city: "Nagpur", aqi: 240, status: "Very Unhealthy" },
    { rank: 39, city: "Jaipur", aqi: 230, status: "Very Unhealthy" },
    { rank: 40, city: "Surat", aqi: 220, status: "Very Unhealthy" },
    { rank: 41, city: "Vadodara", aqi: 210, status: "Very Unhealthy" },
    { rank: 42, city: "Ludhiana", aqi: 200, status: "Very Unhealthy" },
    { rank: 43, city: "Gwalior", aqi: 190, status: "Very Unhealthy" },
    { rank: 44, city: "Agartala", aqi: 180, status: "Very Unhealthy" },
    { rank: 45, city: "Bhilai", aqi: 141, status: "Unhealthy for Sensitive Groups" },
    { rank: 46, city: "Raipur", aqi: 150, status: "Unhealthy" },
    { rank: 47, city: "Chhattisgarh", aqi: 135, status: "Unhealthy for Sensitive Groups" },
    { rank: 48, city: "Vidisha", aqi: 110, status: "Moderate" },
    { rank: 49, city: "Itarsi", aqi: 105, status: "Moderate" },
    { rank: 50, city: "Nashik", aqi: 120, status: "Unhealthy" }
  ];

  const weatherData = [
    { rank: 1, city: "Mumbai", temp: 32, humidity: 80 },
    { rank: 2, city: "Delhi", temp: 28, humidity: 60 },
    { rank: 3, city: "Chennai", temp: 34, humidity: 70 },
    { rank: 4, city: "Kolkata", temp: 30, humidity: 85 },
    { rank: 5, city: "Bangalore", temp: 25, humidity: 65 },
    { rank: 6, city: "Hyderabad", temp: 29, humidity: 72 },
    { rank: 7, city: "Ahmedabad", temp: 33, humidity: 50 },
    { rank: 8, city: "Pune", temp: 27, humidity: 55 },
    { rank: 9, city: "Jaipur", temp: 31, humidity: 40 },
    { rank: 10, city: "Lucknow", temp: 30, humidity: 52 },
    { rank: 11, city: "Kanpur", temp: 28, humidity: 48 },
    { rank: 12, city: "Nagpur", temp: 35, humidity: 60 },
    { rank: 13, city: "Indore", temp: 26, humidity: 58 },
    { rank: 14, city: "Thane", temp: 33, humidity: 75 },
    { rank: 15, city: "Bhopal", temp: 27, humidity: 54 },
    { rank: 16, city: "Visakhapatnam", temp: 30, humidity: 80 },
    { rank: 17, city: "Vadodara", temp: 32, humidity: 45 },
    { rank: 18, city: "Ghaziabad", temp: 29, humidity: 52 },
    { rank: 19, city: "Ludhiana", temp: 28, humidity: 65 },
    { rank: 20, city: "Agra", temp: 31, humidity: 60 },
    { rank: 21, city: "Nashik", temp: 24, humidity: 50 },
    { rank: 22, city: "Patna", temp: 29, humidity: 68 },
    { rank: 23, city: "Meerut", temp: 27, humidity: 53 },
    { rank: 24, city: "Faridabad", temp: 30, humidity: 55 },
    { rank: 25, city: "Rajkot", temp: 34, humidity: 42 },
    { rank: 26, city: "Amritsar", temp: 26, humidity: 62 },
    { rank: 27, city: "Allahabad", temp: 30, humidity: 58 },
    { rank: 28, city: "Vijayawada", temp: 32, humidity: 78 },
    { rank: 29, city: "Gwalior", temp: 28, humidity: 50 },
    { rank: 30, city: "Ranchi", temp: 25, humidity: 60 },
    { rank: 31, city: "Chandigarh", temp: 29, humidity: 64 },
    { rank: 32, city: "Mysore", temp: 24, humidity: 72 },
    { rank: 33, city: "Guwahati", temp: 30, humidity: 82 },
    { rank: 34, city: "Coimbatore", temp: 28, humidity: 68 },
    { rank: 35, city: "Jodhpur", temp: 33, humidity: 40 },
    { rank: 36, city: "Raipur", temp: 31, humidity: 59 },
    { rank: 37, city: "Kota", temp: 30, humidity: 47 },
    { rank: 38, city: "Bhubaneswar", temp: 29, humidity: 70 },
    { rank: 39, city: "Salem", temp: 30, humidity: 67 },
    { rank: 40, city: "Warangal", temp: 32, humidity: 61 },
    { rank: 41, city: "Bareilly", temp: 28, humidity: 54 },
    { rank: 42, city: "Moradabad", temp: 30, humidity: 52 },
    { rank: 43, city: "Gorakhpur", temp: 29, humidity: 65 },
    { rank: 44, city: "Solapur", temp: 35, humidity: 48 },
    { rank: 45, city: "Tiruchirappalli", temp: 31, humidity: 70 },
    { rank: 46, city: "Jalandhar", temp: 27, humidity: 62 },
    { rank: 47, city: "Ajmer", temp: 32, humidity: 41 },
    { rank: 48, city: "Siliguri", temp: 25, humidity: 78 },
    { rank: 49, city: "Dhanbad", temp: 29, humidity: 66 },
    { rank: 50, city: "Jammu", temp: 27, humidity: 60 },
    { rank: 51, city: "Panipat", temp: 28, humidity: 59 },
    { rank: 52, city: "Rourkela", temp: 30, humidity: 73 },
    { rank: 53, city: "Dehradun", temp: 25, humidity: 68 },
    { rank: 54, city: "Guntur", temp: 32, humidity: 76 },
    { rank: 55, city: "Kozhikode", temp: 30, humidity: 85 },
    { rank: 56, city: "Thrissur", temp: 28, humidity: 80 },
    { rank: 57, city: "Aligarh", temp: 29, humidity: 54 },
    { rank: 58, city: "Hubli", temp: 31, humidity: 62 },
    { rank: 59, city: "Shimla", temp: 20, humidity: 72 },
    { rank: 60, city: "Shillong", temp: 22, humidity: 75 },
    { rank: 61, city: "Muzaffarnagar", temp: 29, humidity: 60 },
    { rank: 62, city: "Haridwar", temp: 27, humidity: 70 },
    { rank: 63, city: "Noida", temp: 28, humidity: 58 },
    { rank: 64, city: "Udaipur", temp: 30, humidity: 50 },
    { rank: 65, city: "Nanded", temp: 34, humidity: 65 },
    { rank: 66, city: "Imphal", temp: 25, humidity: 80 },
    { rank: 67, city: "Thiruvananthapuram", temp: 29, humidity: 88 },
    { rank: 68, city: "Madurai", temp: 33, humidity: 60 },
    { rank: 69, city: "Puducherry", temp: 30, humidity: 72 },
    { rank: 70, city: "Varanasi", temp: 28, humidity: 63 },
    { rank: 71, city: "Bhilai", temp: 28, humidity: 35 },
    { rank: 72, city: "Raipur", temp: 30, humidity: 40 },
    { rank: 73, city: "Chhattisgarh", temp: 29, humidity: 42 },
    { rank: 74, city: "Delhi", temp: 25, humidity: 50 },
    { rank: 75, city: "Bhopal", temp: 27, humidity: 37 },
    { rank: 76, city: "Vidisha", temp: 26, humidity: 34 },
    { rank: 77, city: "Itarsi", temp: 28, humidity: 36 },
  ];





  const historicData = [
    { rank: 1, city: "Kanpur", avgAqi: 450 },
    { rank: 2, city: "Delhi", avgAqi: 420 },
    { rank: 3, city: "Lucknow", avgAqi: 410 },
    { rank: 4, city: "Ghaziabad", avgAqi: 400 },
    { rank: 5, city: "Varanasi", avgAqi: 390 },
    { rank: 6, city: "Patna", avgAqi: 380 },
    { rank: 7, city: "Agra", avgAqi: 370 },
    { rank: 8, city: "Meerut", avgAqi: 385 },
    { rank: 9, city: "Amritsar", avgAqi: 380 },
    { rank: 10, city: "Firozabad", avgAqi: 375 },
    { rank: 11, city: "Bhiwadi", avgAqi: 370 },
    { rank: 12, city: "Jodhpur", avgAqi: 365 },
    { rank: 13, city: "Raipur", avgAqi: 360 },
    { rank: 14, city: "Jaipur", avgAqi: 355 },
    { rank: 15, city: "Faridabad", avgAqi: 350 },
    { rank: 16, city: "Noida", avgAqi: 340 },
    { rank: 17, city: "Kolkata", avgAqi: 335 },
    { rank: 18, city: "Mumbai", avgAqi: 330 },
    { rank: 19, city: "Nagpur", avgAqi: 325 },
    { rank: 20, city: "Pune", avgAqi: 320 },
    { rank: 21, city: "Hyderabad", avgAqi: 315 },
    { rank: 22, city: "Chennai", avgAqi: 310 },
    { rank: 23, city: "Bengaluru", avgAqi: 305 },
    { rank: 24, city: "Chandigarh", avgAqi: 300 },
    { rank: 25, city: "Ahmedabad", avgAqi: 295 },
    { rank: 26, city: "Surat", avgAqi: 290 },
    { rank: 27, city: "Vadodara", avgAqi: 285 },
    { rank: 28, city: "Indore", avgAqi: 280 },
    { rank: 29, city: "Bhopal", avgAqi: 275 },
    { rank: 30, city: "Nashik", avgAqi: 270 },
    { rank: 31, city: "Aurangabad", avgAqi: 265 },
    { rank: 32, city: "Thane", avgAqi: 260 },
    { rank: 33, city: "Rajkot", avgAqi: 255 },
    { rank: 34, city: "Coimbatore", avgAqi: 250 },
    { rank: 35, city: "Madurai", avgAqi: 245 },
    { rank: 36, city: "Tiruchirappalli", avgAqi: 240 },
    { rank: 37, city: "Kochi", avgAqi: 235 },
    { rank: 38, city: "Thiruvananthapuram", avgAqi: 230 },
    { rank: 39, city: "Vijayawada", avgAqi: 225 },
    { rank: 40, city: "Visakhapatnam", avgAqi: 220 },
    { rank: 41, city: "Guwahati", avgAqi: 215 },
    { rank: 42, city: "Shillong", avgAqi: 210 },
    { rank: 43, city: "Imphal", avgAqi: 205 },
    { rank: 44, city: "Aizawl", avgAqi: 200 },
    { rank: 45, city: "Gangtok", avgAqi: 195 },
    { rank: 46, city: "Itanagar", avgAqi: 190 },
    { rank: 47, city: "Pondicherry", avgAqi: 185 },
    { rank: 48, city: "Srinagar", avgAqi: 180 },
    { rank: 49, city: "Shimla", avgAqi: 175 },
    { rank: 50, city: "Dehradun", avgAqi: 170 },
    { rank: 51, city: "Haridwar", avgAqi: 165 },
    { rank: 52, city: "Rishikesh", avgAqi: 160 },
    { rank: 53, city: "Udaipur", avgAqi: 155 },
    { rank: 54, city: "Ajmer", avgAqi: 150 },
    { rank: 55, city: "Alwar", avgAqi: 145 },
    { rank: 56, city: "Bikaner", avgAqi: 140 },
    { rank: 57, city: "Gwalior", avgAqi: 135 },
    { rank: 58, city: "Jhansi", avgAqi: 130 },
    { rank: 59, city: "Satna", avgAqi: 125 },
    { rank: 60, city: "Rewa", avgAqi: 120 },
    { rank: 61, city: "Bilaspur", avgAqi: 115 },
    { rank: 62, city: "Korba", avgAqi: 110 },
    { rank: 63, city: "Durg", avgAqi: 105 },
    { rank: 64, city: "Bhilai", avgAqi: 100 },
    { rank: 65, city: "Raigarh", avgAqi: 95 },
    { rank: 66, city: "Haldwani", avgAqi: 90 },
    { rank: 67, city: "Bareilly", avgAqi: 85 },
    { rank: 68, city: "Moradabad", avgAqi: 80 },
    { rank: 69, city: "Aligarh", avgAqi: 75 },
    { rank: 70, city: "Mathura", avgAqi: 70 }
  ];


  // Select data based on ranking type
  const dataMap = {
    "AQI Ranking": aqiData,
    "Weather Ranking": weatherData,
    "Historic Ranking": historicData,
  };

  const selectedData = dataMap[rankingType];

  // Filter cities based on search term
  const filteredCities = selectedData.filter((data) =>
    data.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity);

  // Handle chart data
  const chartData = {

    labels: currentCities.map((data) => data.city),
    datasets: [
      {
        label: rankingType === "AQI Ranking" ? "AQI" : rankingType === "Weather Ranking" ? "Temperature (°C)" : "Avg AQI",
        data: currentCities.map((data) =>
          rankingType === "AQI Ranking"
            ? data.aqi
            : rankingType === "Weather Ranking"
              ? data.temp
              : data.avgAqi
        ),
        backgroundColor: currentCities.map(() =>
          rankingType === "AQI Ranking"
            ? "rgba(255, 99, 132, 0.6)"
            : rankingType === "Weather Ranking"
              ? "rgba(54, 162, 235, 0.6)"
              : "rgba(153, 102, 255, 0.6)"
        ),
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage * citiesPerPage < filteredCities.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" mt-20 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Top 50 Polluted Cities Analysis
        </h1>

        {/* Location and Ranking Selector */}
        <div className="flex justify-center space-x-6 mb-6">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-800 p-2 rounded-lg text-white"
          >
            <option value="India">India</option>
            <option value="Foreign">Foreign</option>
          </select>

          <select
            value={rankingType}
            onChange={(e) => setRankingType(e.target.value)}
            className="bg-gray-800 p-2 rounded-lg text-white"
          >
            <option value="AQI Ranking">AQI Ranking</option>
            <option value="Weather Ranking">Weather Ranking</option>
            <option value="Historic Ranking">Historic Ranking</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Search City"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white w-1/2"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-center py-6 mb-2 md:gap-6">
          {/* Chart Display */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-[800px] w-[100%] h-[400px] md:h-[500px] my-auto"
          >
            <h2 className="text-2xl font-semibold text-white text-center mb-4">
              {rankingType} Chart
            </h2>
            <Bar
              className="pb-14"
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: "#ffffff", // Label color
                      font: {
                        size: 14, // Font size
                      },
                    },
                  },
                  title: {
                    display: true,
                    text: `${rankingType} Overview`,
                    color: "#ffffff", // Title color
                    font: {
                      size: 18, // Font size
                      weight: "bold",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#ffffff", // X-axis label color
                    },
                    grid: {
                      display: false, // Hide X-axis gridlines
                    },
                  },
                  y: {
                    ticks: {
                      color: "#ffffff", // Y-axis label color
                    },
                    grid: {
                      color: "#4a5568", // Y-axis gridline color
                    },
                  },
                },
              }}
            />
          </div>

          {/* City List */}
          <div className="mt-8 lg:mt-0 flex flex-col lg:w-80">
            <ul className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold text-center mb-4">
                {rankingType} List
              </h2>
              {currentCities.map((data) => (
                <li key={data.city} className="p-2 border-b border-gray-600">
                  <strong>
                    {data.rank}. {data.city}
                  </strong>{" "}
                  -{" "}
                  {rankingType === "AQI Ranking"
                    ? `AQI: ${data.aqi} (${data.status})`
                    : rankingType === "Weather Ranking"
                      ? `Temp: ${data.temp}°C, Humidity: ${data.humidity}%`
                      : `Avg AQI: ${data.avgAqi}`}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-row justify-center gap-4">
          <button
            onClick={handlePreviousPage}
            className="p-3 w-20 rounded-lg bg-gray-700 hover:bg-gray-600"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="p-3  w-20 rounded-lg bg-gray-700 hover:bg-gray-600"
            disabled={currentPage * citiesPerPage >= filteredCities.length}
          >
            Next
          </button>
        </div>




      </div>
    </div>
  );
};

export default App;
