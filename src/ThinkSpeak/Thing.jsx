import { useEffect, useState } from "react";
import axios from "axios";

const THING_SPEAK_API =
  process.env.THING_SPEAK_API ||
  "https://api.thingspeak.com/channels/1899264/feeds/last.json?api_key=RM077HSBKWZR970D";
const BACKEND_API =
  process.env.BACKEND_API || "https://smartaqi.onrender.com/api/create";
const Thing = () => {
  const [data, setData] = useState({
    created_at: "",
    entry_id: "",
    temperature: "",
    humidity: "",
    pressure: "",
    aqi: "",
    gas: "",
    field6: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const getAQI = async () => {
      try {
        const response = await axios.get(THING_SPEAK_API);
        console.log(response);
        setData(() => {
          return {
            created_at: response?.data?.created_at,
            entry_id: response?.data?.entry_id,
            temperature: response?.data?.field1,
            humidity: response?.data?.field2,
            pressure: response?.data?.field3,
            aqi: response?.data?.field4,
            gas: response?.data?.field5,
            field6: response?.data?.field6,
            latitude: parseFloat(response?.data?.field7.replace(/"/g, "")),
            longitude: parseFloat(response?.data?.field8.replace(/"/g, "")),
          };
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setData(null);
      }
      if (data) {
        axios
          .post(BACKEND_API, data)
          .then((response) => {
            console.log("Data sent to backend:", response.data);
          })
          .catch((error) => {
            console.error("Error sending data to backend:", error);
          });
      }
    };
    setTimeout(getAQI, 30 * 1000);

    return () => {
      clearTimeout(getAQI);
    };
  }, [data]);
};

export default Thing;