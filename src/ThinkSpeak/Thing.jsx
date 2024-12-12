import { useEffect, useState } from "react";
import axios from "axios";

const THING_SPEAK_API =
  process.env.THING_SPEAK_API ||
  "https://api.thingspeak.com/channels/1899264/feeds/last.json?api_key=RM077HSBKWZR970D";
const BACKEND_API =
  process.env.BACKEND_API || "https://smartaqi.onrender.com/api/create";

const Thing = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAQI = async () => {
      try {
        const response = await axios.get(THING_SPEAK_API);
        setData({
          created_at: response?.data?.created_at,
          entry_id: response?.data?.entry_id,
          temperature: response?.data?.field1,
          humidity: response?.data?.field2,
          CO: response?.data?.field3,
          aqi: response?.data?.field6,
          latitude: parseFloat(response?.data?.field7.replace(/"/g, "")),
          longitude: parseFloat(response?.data?.field8.replace(/"/g, "")),
        });
        setLoading(false);
        setError("");

        // Send data to the backend
        await axios.post(BACKEND_API, data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    getAQI();

    const interval = setInterval(getAQI, 30 * 1000); // Fetch data every 30 seconds
    return () => clearInterval(interval);
  }, [data]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          AQI Data Dashboard
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-800"></div>
            <p className="ml-4 text-gray-600">Fetching data...</p>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DataCard title="Created At" value={data?.created_at} />
            <DataCard title="Entry ID" value={data?.entry_id} />
            <DataCard title="Temperature" value={`${data?.temperature} °C`} />
            <DataCard title="Humidity" value={`${data?.humidity} %`} />
            <DataCard title="CO" value={`${data?.CO}`} />
            <DataCard title="AQI" value={data?.aqi} />
            <DataCard
              title="Location"
              value={
                <>
                  <span>Lat: {data?.latitude}</span>
                  <br />
                  <span>Long: {data?.longitude}</span>
                </>
              }
            />

          </div>
        )}
      </div>
    </main>
  );
};

const DataCard = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-xl text-gray-800 font-bold mt-2">{value}</p>
  </div>
);

export default Thing;
