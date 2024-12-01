import React from "react";

const Cigarette = () => {
  return (
    <div
      style={{ backgroundColor: "rgb(5, 8, 22)" }}
      className="text-white min-h-screen w-full flex flex-col items-center py-12 px-4"
    >
      {/* Header Section */}
      <div className="text-center mb-12 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Health Advice for People Living In
        </h1>
        <p className="text-xl sm:text-2xl font-bold mt-6 text-blue-500">
          TT Nagar
        </p>
      </div>

      {/* Content Wrapper */}
      <div className="border-2 border-white rounded-xl w-full max-w-7xl p-6">
        {/* Cigarette Image Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center mb-12">
          <div className="relative">
            <img
              className="w-24 sm:w-28 h-24 mr-20 sm:h-28"
              src="https://www.aqi.in/media/sections/health-advice/cigarette.svg"
              alt="Cigarette"
            />
            {/* Smoke Animation */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-smoke">
              <div className="w-2 h-8 bg-white rounded-full opacity-50 mb-2 animate-smoke-bounce"></div>
              <div className="w-2 h-8 bg-white rounded-full opacity-30 mb-4 animate-smoke-bounce delay-100"></div>
              {/* <div className="w-2 h-8 bg-white rounded-full opacity-20 mb-6 animate-smoke-bounce delay-200"></div> */}
            </div>
          </div>

          <div className="ml-0 sm:ml-8 mt-8 sm:mt-0 text-center sm:text-left">
            <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">
              3.6
            </div>
            <p className="text-lg mb-2">Cigarettes per day</p>
            <p className="text-sm text-gray-300">
              Breathing the air in this location is as <br />
              harmful as smoking 3.6 cigarettes a day.
            </p>
          </div>
        </div>

        {/* Weekly and Monthly Consumption */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12 mb-12">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full sm:w-72 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Weekly Consumption</h3>
            <div className="text-4xl font-bold text-red-600">25.2</div>
            <p className="text-sm text-gray-100">Cigarettes per week</p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full sm:w-72 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Monthly Consumption</h3>
            <div className="text-4xl font-bold text-red-600">108.0</div>
            <p className="text-sm text-gray-100">Cigarettes per month</p>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-6">Solutions for Current AQI</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Air Purifier", "Car Filter", "N95 Mask", "Stay Indoor"].map((item, index) => (
              <button
                key={index}
                className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-transform duration-300 transform hover:scale-105"
              >
                {item} <span className="text-red-500 font-bold">Must</span>
              </button>
            ))}
          </div>
        </div>

        {/* Prevent Health Problems Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6">
            Prevent Health Problems: Understand Your Risks
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Cigarette;
