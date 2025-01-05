import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion
import sensor1 from "../Images/Sensor1.jpg";
import sensor2 from "../Images/Sensor2.jpg";
import sensor3 from "../Images/Sensor3.jpg";
import sensor4 from "../Images/Sensor4.jpg";

const AboutSensor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      style={{ backgroundColor: "rgb(5, 8, 22)" }}
      className="min-h-screen flex flex-col justify-center py-10 px-6 lg:px-20"
    >
      {/* Header Section */}
      <motion.header
        className="text-center mb-10 mt-16"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={fadeInUp}
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-[#289BD1] leading-tight">
          Air Quality Sensor
        </h1>
        <p className="mt-5 text-base lg:text-lg text-white max-w-2xl mx-auto leading-relaxed">
          Learn more about the Air Quality Sensor and its benefits in monitoring
          air quality levels.
        </p>
      </motion.header>

      {/* Sensor Sections */}
      {[{
        title: "Temperature & Humidity Monitoring",
        content: "Our sensor provides real-time temperature and humidity data to monitor your environment's air quality. This data helps you adjust your living or working space for better comfort and health.",
        imgSrc: sensor1,
        alt: "Sensor 1",
      },
      {
        title: "Gas Detection (CO, CO2)",
        content: "Our sensors also detect harmful gases like carbon monoxide (CO) and carbon dioxide (CO2). The sensor monitors these gases, providing early warnings to ensure safety in enclosed spaces.",
        imgSrc: sensor2,
        alt: "Sensor 2",
      },
      {
        title: "AQI Monitoring & Alerts",
        content: "The Air Quality Index (AQI) is a measurement of how clean or polluted your air is. Our sensors track AQI in real-time, giving you alerts when air quality drops to unhealthy levels.",
        imgSrc: sensor3,
        alt: "Sensor 3",
      },
      {
        title: "Multi-Gas Detection",
        content: "Advanced sensors capable of detecting multiple harmful gases, ensuring safety in a variety of environments.",
        imgSrc: sensor4,
        alt: "Sensor 4",
      }].map((sensor, index) => (
        <motion.section
          key={index}
          className={`w-full mb-16 flex flex-wrap items-center ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
        >
          <div className="w-full lg:w-1/2 p-4">
            <img
              src={sensor.imgSrc}
              alt={sensor.alt}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 text-white">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              {sensor.title}
            </h2>
            <p className="mb-4">{sensor.content}</p>
            <p className="mb-4">
              Current Temperature: <span className="font-bold">26.8°C</span>
              <br />
              Current Humidity: <span className="font-bold">45%</span>
            </p>
          </div>
        </motion.section>
      ))}

      {/* Conclusion Section */}
      <motion.section
        className="text-center w-full mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-semibold text-gray-50 mb-4">
          Why Monitor Air Quality?
        </h2>
        <p className="text-lg text-gray-50 max-w-xl mx-auto leading-relaxed mb-6">
          Monitoring air quality helps you take necessary actions to protect
          your health and ensure your living or working environment remains safe
          and comfortable.
        </p>
        <button
          onClick={() => (window.location.href = "/air-quality")}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Learn More About Air Quality
        </button>
      </motion.section>
    </div>
  );
};

export default AboutSensor;
