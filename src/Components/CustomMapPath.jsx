import axios from "axios";

// Set your backend URI and credentials here
const BACKEND_URI =
  process.env.BACKEND_URI || "https://newmodelaqi.onrender.com/predict-aqi";
const username = "admin";
const password = "password123";

// Function to fetch data and return it
export const fetchingData = async (city, pollutant, count) => {
  const responses = []; // Array to store the responses
  city = city.toLowerCase().replace(/^\w/, (char) => char.toUpperCase()); // Capitalize the first letter of the city
  const baseDate = new Date(2024, 10, 29); // Start date: 29/11/2024 (Month is 0-indexed in JS)

  for (let i = 0; i < count; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + i); // Increment the date by `i` days
    const formattedDate = `${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}${String(currentDate.getMonth() + 1).padStart(2, "0")}${String(
      currentDate.getFullYear()
    ).slice(-2)}`; // Format date as DDMMYY

    try {
      const response = await axios.post(
        BACKEND_URI,
        {
          city: city,
          date_ddmmyy: formattedDate,
          prominent_pollutant: pollutant,
        },
        {
          auth: {
            username: username,
            password: password,
          },
        }
      );
      responses.push(response.data); // Add each response to the list
    } catch (error) {
      console.error(`Error for ${formattedDate}:`, error);
      responses.push({ error: error.message }); // Add error details if there's an issue
    }
  }
  console.log(responses)

  return responses; // Return the array of responses
};


