import React from "react";

const AQITable = () => {
  const data = [
    { location: "Bagsewaniya", status: "Poor", AQI: 125, pm25: 62, pm10: 137, temp: 20, humidity: 42 },
    { location: "Kasera Bazar", status: "Poor", AQI: 118, pm25: 60, pm10: 128, temp: 21, humidity: 44 },
    { location: "Rusalli", status: "Poor", AQI: 125, pm25: 62, pm10: 137, temp: 20, humidity: 41 },
    { location: "Sector D Industrial Area", status: "Poor", AQI: 128, pm25: 59, pm10: 142, temp: 20, humidity: 42 },
    { location: "TT Nagar", status: "Poor", AQI: 125, pm25: 63, pm10: 137, temp: 20, humidity: 43 },
  ];

  return (
    <div className="min-h-screen w-full  text-white flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-wide text-blue-400">Delhi's Air Quality</h1>
        <p className="text-lg text-gray-300 mt-2">Real-time Air Pollution Levels by Location</p>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-6xl bg-gray-800 rounded-xl shadow-2xl p-6 overflow-x-auto border border-gray-700">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300">
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">AQI</th>
              <th className="px-4 py-3 text-left">PM2.5 (µg/m³)</th>
              <th className="px-4 py-3 text-left">PM10 (µg/m³)</th>
              <th className="px-4 py-3 text-left">Temp. (°C)</th>
              <th className="px-4 py-3 text-left">Humi. (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gradient-to-r hover:from-blue-600 hover:to-gray-700 ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } transition duration-300`}
              >
                <td className="px-4 py-3">{item.location}</td>
                <td className="px-4 py-3">
                  <span
                    className={`py-1 px-3 rounded-md text-sm font-semibold ${
                      item.status === "Poor"
                        ? "bg-red-600 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">{item.AQI}</td>
                <td className="px-4 py-3">{item.pm25}</td>
                <td className="px-4 py-3">{item.pm10}</td>
                <td className="px-4 py-3">{item.temp}</td>
                <td className="px-4 py-3">{item.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="mt-10 text-gray-400">
        <p>Data provided by the local pollution monitoring system.</p>
        <p className="text-sm mt-1">Last Updated: Just Now</p>
      </div>
    </div>
  );
};

export default AQITable;
