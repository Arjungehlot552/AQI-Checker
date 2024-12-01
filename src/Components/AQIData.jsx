import React from "react";
import "animate.css";
import { FaArrowDown } from "react-icons/fa"; // Optional: For adding a scroll down icon

const AqiData = () => {
  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="min-h-screen mt-6 text-white p-10">
      {/* Header Section with Animation */}
      <div className="text-center mb-10">
        <h1 style={{ color: '#24a0d1' }} className="text-5xl  font-bold text-gradient mt-10 animate__animated animate__fadeInDown">
          AQI Data for Delhi
        </h1>
        <p className="mt-4 text-xl animate__animated animate__fadeInUp">
          Real-time Air Quality Information and Insights
        </p>
      </div>

      {/* Introduction Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <p className="leading-relaxed text-lg animate__animated animate__fadeInUp">
          Delhi has been struggling with severe air pollution for years. The air quality index (AQI) helps measure the concentration of pollutants like PM2.5, PM10, NO2, SO2, CO, and ozone. Poor air quality can have serious health effects, particularly for vulnerable populations. Let’s dive into a detailed analysis of the current AQI levels and their impacts on the residents of Delhi.
        </p>
      </div>

      {/* AQI Data Cards with Hover Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl animate__animated animate__zoomIn">
          <h2 className="text-2xl font-semibold">PM 2.5</h2>
          <p className="mt-2 text-lg">Current Value: 45 µg/m³</p>
          <p className="mt-2 text-sm">Good Air Quality</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl animate__animated animate__zoomIn">
          <h2 className="text-2xl font-semibold">PM 10</h2>
          <p className="mt-2 text-lg">Current Value: 85 µg/m³</p>
          <p className="mt-2 text-sm">Moderate Air Quality</p>
        </div>
        <div className="bg-gradient-to-r from-gray-500 via-gray-700 to-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl animate__animated animate__zoomIn">
          <h2 className="text-2xl font-semibold">NO2</h2>
          <p className="mt-2 text-lg">Current Value: 38 µg/m³</p>
          <p className="mt-2 text-sm">Moderate Air Quality</p>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="text-center mb-10">
        <h2 style={{ color: '#24a0d1' }} className="text-4xl font-semibold mb-5 animate__animated animate__fadeInUp">
          Detailed Insights on AQI
        </h2>
        <p className="text-lg max-w-2xl mx-auto animate__animated animate__fadeInUp">
          The AQI (Air Quality Index) is a scale used to measure the air quality and pollution levels in the atmosphere.
          An AQI value of 0-50 means the air is considered healthy. As the AQI number increases, the air quality decreases
          and may be harmful to people with certain health conditions.
        </p>
      </div>

      {/* Scroll down indicator */}
      <div className="flex justify-center animate__animated animate__fadeInUp">
        <a href="#detailed-section">
          <FaArrowDown size={30} className="text-white cursor-pointer hover:scale-125 transform transition-all duration-300" />
        </a>
      </div>

      {/* The Detailed AQI Data Section */}
      <div id="detailed-section" className="bg-gray-800 p-10 text-center mb-10 rounded-lg mt-16">
        <h2  className="text-4xl font-bold text-center mb-5 animate__animated animate__fadeInUp">
          Detailed Overview of Delhi AQI
        </h2>
        <p className="leading-relaxed text-lg animate__animated animate__fadeInUp">
          The air quality in Delhi has been a growing concern, with high levels of particulate matter and other pollutants
          affecting the city's environment.
          <br></br> Here’s a closer look at the AQI trends, current levels, and their impact on health.
        </p>

        {/* High Pollutant Areas in Delhi */}
        <div className="mt-8">
          <h3 style={{ color: '#24a0d1' }} className="text-4xl font-bold text-center mb-5 animate__animated animate__fadeInUp">
            High Pollutant Areas in Delhi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate__animated animate__fadeInUp">
              <img src="https://live.staticflickr.com/8390/8677153355_6db2fa8f77_b.jpg" alt="Area 1" className="w-full h-64 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-semibold">Industrial Area (Okhla)</h3>
              <p className="text-sm">This area is heavily affected by emissions from nearby factories and vehicles.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate__animated animate__fadeInUp">
              <img src="https://imagesvs.oneindia.com/img/2023/11/jam-01-1699640884.jpg" alt="Area 2" className="w-full h-64 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-semibold">Traffic Congestion (Karol Bagh)</h3>
              <p className="text-sm">High vehicle density makes this area one of the worst for air pollution.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate__animated animate__fadeInUp">
              <img src="https://www.constructionweekonline.in/cloud/2021/11/25/AfU740ZB-construction-site-3432379_1920-21-1200x800.jpg" alt="Area 3" className="w-full h-64 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-semibold">Construction Sites (Dwarka)</h3>
              <p className="text-sm">Construction dust contributes to the AQI degradation in these regions.</p>
            </div>
          </div>
        </div>

        {/* Key Polluting Industries in Delhi */}
        <div className="mt-8">
          <h3 style={{ color: '#24a0d1' }} className="text-4xl font-bold text-center mb-5 animate__animated animate__fadeInUp">
            Major Polluting Industries in Delhi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate__animated animate__fadeInUp">
              <img src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/Y6OH3DONHFLVFHUM4WEAANAMFY.jpg" alt="Area 1" className="w-full h-64 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-semibold">Industrial Area (Okhla)</h3>
              <p className="text-sm">This area is heavily affected by emissions from nearby factories and vehicles.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate__animated animate__fadeInUp">
              <img src="https://thepatriot.in/wp-content/uploads/2023/10/India-Gate-Pollution-e1727690559625.jpg" alt="Area 2" className="w-full h-64 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-semibold">Traffic Congestion (Karol Bagh)</h3>
              <p className="text-sm">High vehicle density makes this area one of the worst for air pollution.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate__animated animate__fadeInUp">
              <img src="https://www.metropolisindia.com/upgrade/blog/upload/23/11/image1700476928.webp" alt="Area 3" className="w-full h-64 object-cover rounded-lg mb-4"/>
              <h3 className="text-xl font-semibold">Construction Sites (Dwarka)</h3>
              <p className="text-sm">Construction dust contributes to the AQI degradation in these regions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AqiData;
