import React, { useState } from "react";

// Mock Data: Replace with your actual API or dataset
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];

const mockAQIData = {
  2024: {
    November: {
      AQI: [
        [1, 50],
        [2, 138],
        [3, 137],
        [4, 123],
        [5, 125],
        [6, 150],
        [7, 189],
        [8, 208],
        [9, 189],
        [10, 137],
        [11, 160],
        [12, 166],
        [13, 209],
        [14, 158],
        [15, 167],
        [16, 181],
        [17, 183],
        [18, 188],
        [19, 216],
        [20, 210],
        [21, 152],
        [22, 207],
        [23, 187],
        [24, 161],
        [25, 158],
        [26, 147],
        [27, 161],
        [28, 134],
        [29, 180],
        [30, 275],
      ],
    },
  },
};

const getColor = (value) => {
  if (value === null) return "bg-gray-300 text-gray-500"; // No data
  if (value <= 50) return "bg-green-400 text-green-900"; // Good (0-50)
  if (value <= 100) return "bg-yellow-400 text-yellow-900"; // Moderate (51-100)
  if (value <= 150) return "bg-orange-400 text-orange-900"; // Unhealthy for Sensitive Groups (101-150)
  if (value <= 200) return "bg-red-500 text-red-900"; // Unhealthy (151-200)
  if (value <= 300) return "bg-purple-500 text-purple-900"; // Very Unhealthy (201-300)
  if (value <= 400) return "bg-purple-700 text-purple-100"; // Hazardous (301-400)
  if (value <= 500) return "bg-maroon-600 text-maroon-100"; // Severe (401-500)
  return "bg-maroon-800 text-maroon-200"; // Critical (More than 500)
};

const CalendarPage = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("November");
  const [selectedPollutant, setSelectedPollutant] = useState("AQI");

  const monthData =
    mockAQIData[selectedYear]?.[selectedMonth]?.[selectedPollutant] || [];

  // Generate calendar grid
  const firstDayOfMonth = new Date(selectedYear, months.indexOf(selectedMonth), 1).getDay();
  const daysInMonth = new Date(selectedYear, months.indexOf(selectedMonth) + 1, 0).getDate();

  const calendarGrid = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <div
      style={{ backgroundColor: "rgb(5, 8, 22)" }}
      className="min-h-screen flex flex-col justify-center items-center py-5 px-4 text-gray-300"
    >
      <h1 className="text-4xl font-extrabold mb-10 text-white">Air Quality Calendar</h1>
      <div className="bg-gray-800/90 shadow-lg rounded-xl p-6 w-full max-w-4xl">
        {/* Calendar Title */}
        <h2 className="text-xl font-semibold text-center text-gray-300 mb-6">
          {selectedMonth} {selectedYear} - Bhopal - {selectedPollutant}
        </h2>

        {/* Header Section */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Year Selector */}
            <div className="flex flex-col">
              <label htmlFor="year" className="block text-sm mb-2 text-gray-50 font-medium">
                Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 10 }, (_, index) => 2015 + index).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {/* Month Selector */}
            <div className="flex flex-col">
              <label htmlFor="month" className="block text-sm mb-2 text-gray-50 font-medium">
                Month
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            {/* Pollutant Selector */}
            <div className="flex flex-col">
              <label htmlFor="pollutant" className="block text-sm mb-2 text-gray-50 font-medium">
                Pollutant
              </label>
              <select
                id="pollutant"
                value={selectedPollutant}
                onChange={(e) => setSelectedPollutant(e.target.value)}
                className="bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="AQI">AQI Values</option>
                <option value="PM2.5">PM2.5 - Fine Particulate Matter</option>
                <option value="PM10">PM10 - Coarse Particulate Matter</option>
                <option value="CO">CO - Carbon Monoxide</option>
                <option value="NO2">NO2 - Nitrogen Dioxide</option>
                <option value="O3">O3 - Ozone</option>
                <option value="SO2">SO2 - Sulfur Dioxide</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="overflow-hidden rounded-lg">
          <table className="w-full p-2">
            
            <thead>
              <tr className="bg-gray-800">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <th key={day} className="p-3 text-sm text-gray-200 font-medium">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {calendarGrid.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                    const data = monthData.find((entry) => entry[0] === day);
                    return (
                      <td
                        key={dayIndex}
                        className={`p-3 text-center text-sm font-semibold ${day ? getColor(data?.[1]) : "bg-gray-600 text-gray-400"}`}
                      >
                        {day}
                        <div>{data?.[1] || ""}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
