import axios from "axios";
import React, { useState } from "react";

const BACKEND_URI = process.env.BACKEND_URI || "https://aqi-6w1g.onrender.com/predict";

const username = "admin";
const password = "password123";

const CustomMapPath = () => {
  const [responses, setResponses] = useState([]); // Store responses from the API

  const handleButton = async () => {
    const baseDate = new Date(2024, 10, 29); // Start date: 29/11/2024 (Month is 0-indexed in JS)
    const newResponses = []; // Temporary storage for new responses

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i); // Increment the date by `i` days

      const formattedDate = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`; // Format date as DD/MM/YYYY

      try {
        const response = await axios.post(
          BACKEND_URI,
          {
            date: formattedDate,
            prominent_pollutant: "PM2.5",
          },
          {
            auth: {
              username: username,
              password: password,
            },
          }
        );
        newResponses.push(response.data); // Add each response to the list
        // console.log(`Response for ${formattedDate}:`, response.data);
      } catch (error) {
        console.error(`Error for ${formattedDate}:`, error);
        newResponses.push({ error: error.message }); // Add error details
      }
    }

    setResponses(newResponses); // Update state with all responses
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <button
        onClick={handleButton}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Get AQI
      </button>
      <div className="bg-white p-4 rounded shadow-md w-3/4 max-h-96 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Responses:</h2>
        <pre className="text-sm text-gray-700">
          {responses.length > 0
            ? JSON.stringify(responses, null, 2)
            : "Click the button to fetch AQI data."}
        </pre>
      </div>
    </div>
  );
};

export default CustomMapPath;
