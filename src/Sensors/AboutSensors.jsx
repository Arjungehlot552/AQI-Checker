// AboutSensor.js
import React, { useEffect } from 'react';
import { Fade } from 'react-reveal';
import sensor1 from '../Images/Sensor1.jpg';
import sensor2 from '../Images/Sensor2.jpg';
import sensor3 from '../Images/Sensor3.jpg';
import sensor4 from '../Images/Sensor4.jpg';

const AboutSensor = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); // This will run once when the component mounts
  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <header className="text-center mb-10 mt-16">
        <h1 className="text-5xl font-bold mt-5 text-[#289BD1] leading-tight">
          Air Quality Sensor
        </h1>
        <p className="mt-5 text-lg text-white max-w-xl mx-auto leading-relaxed">
          Learn more about the Air Quality Sensor and its benefits in monitoring air quality levels.
        </p>
      </header>

      {/* First Sensor Section with Left Image and Right Description */}
      <section className="w-full max-w-6xl mb-16">
        <div className="flex flex-wrap justify-between items-center mb-12">
         
          <Fade right>
            <div className="w-full md:w-6/12 lg:w-6/12 text-white">
              <h2 className="text-3xl font-semibold mb-4">Temperature & Humidity Monitoring</h2>
              <p className="mb-4">
                Our sensor provides real-time temperature and humidity data to monitor your environment's air quality. This data helps you adjust your living or working space for better comfort and health.
              </p>
              <p className="mb-4">
                Current Temperature: <span className="font-bold">26.8°C</span><br />
                Current Humidity: <span className="font-bold">45%</span>
              </p>
            </div>
          </Fade>
          <Fade left>
            <div className="w-full md:w-5/12 lg:w-5/12 mb-8 md:mb-0">
              <img
                className="w-full h-auto rounded-lg shadow-lg"
                src={sensor1} // Replace with your image
                alt="Air Quality Sensor 1"
              />
            </div>
          </Fade>
        </div>
      </section>

      {/* Second Sensor Section with Right Image and Left Description */}
      <section className="w-full max-w-6xl mb-16">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <Fade left>
            <div className="w-full md:w-5/12 lg:w-5/12 mb-8 md:mb-0">
              <img
                className="w-[20rem] h-[20rem] rounded-lg shadow-lg"
                src={sensor2} // Replace with your image
                alt="Air Quality Sensor 2"
              />
            </div>
          </Fade>
          <Fade right>
            <div className="w-full md:w-6/12 lg:w-6/12 text-white">
              <h2 className="text-3xl font-semibold mb-4">Gas Detection (CO, CO2)</h2>
              <p className="mb-4">
                Our sensors also detect harmful gases like carbon monoxide (CO) and carbon dioxide (CO2). The sensor monitors these gases, providing early warnings to ensure safety in enclosed spaces.
              </p>
              <p className="mb-4">
                Current CO Level: <span className="font-bold">1.14 ppm</span><br />
                Current CO2 Level: <span className="font-bold">73.4 ppm</span>
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* Third Sensor Section with Left Image and Right Description */}
      <section className="w-full max-w-6xl mb-16">
        <div className="flex flex-wrap justify-between items-center mb-12">
          
          <Fade right>
            <div className="w-full md:w-6/12 lg:w-6/12 text-white">
              <h2 className="text-3xl font-semibold mb-4">AQI Monitoring & Alerts</h2>
              <p className="mb-4">
                The Air Quality Index (AQI) is a measurement of how clean or polluted your air is. Our sensors track AQI in real-time, giving you alerts when air quality drops to unhealthy levels.
              </p>
              <p className="mb-4">
                Current AQI Level: <span className="font-bold">73.4</span><br />
                Location: <span className="font-bold">23.2601516, 77.4133993</span>
              </p>
            </div>
          </Fade>
          <Fade left>
            <div className="w-full md:w-5/12 lg:w-5/12 mb-8 md:mb-0">
              <img
                className="w-[20rem] h-[20rem] rounded-lg shadow-lg"
                src={sensor3} // Replace with your image
                alt="Air Quality Sensor 3"
              />
            </div>
          </Fade>
        </div>
      </section>
      {/* Third Sensor Section with Left Image and Right Description */}
      <section className="w-full max-w-6xl mb-16">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <Fade left>
            <div className="w-full md:w-5/12 lg:w-5/12 mb-8 md:mb-0">
              <img
                className="w-[20rem] h-[20rem] rounded-lg shadow-lg"
                src={sensor4} // Replace with your image
                alt="Air Quality Sensor 3"
              />
            </div>
          </Fade>
          <Fade right>
            <div className="w-full md:w-6/12 lg:w-6/12 text-white">
              <h2 className="text-3xl font-semibold mb-4">AQI Monitoring & Alerts</h2>
              <p className="mb-4">
                The Air Quality Index (AQI) is a measurement of how clean or polluted your air is. Our sensors track AQI in real-time, giving you alerts when air quality drops to unhealthy levels.
              </p>
              <p className="mb-4">
                Current AQI Level: <span className="font-bold">73.4</span><br />
                Location: <span className="font-bold">23.2601516, 77.4133993</span>
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="text-center w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-semibold text-gray-50 mb-4">Why Monitor Air Quality?</h2>
        <p className="text-lg text-gray-50 max-w-xl mx-auto leading-relaxed mb-6">
          Monitoring air quality helps you take necessary actions to protect your health and ensure your living or working environment remains safe and comfortable.
        </p>
        <button
          onClick={() => window.location.href = '/air-quality'}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Learn More About Air Quality
        </button>
      </section>
    </div>
  );
};

export default AboutSensor;
