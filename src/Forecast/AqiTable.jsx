import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PollutionAnalysis() {
  const [industries, setIndustries] = useState(0);
  const [schools, setSchools] = useState(0);
  const [colleges, setColleges] = useState(0);
  const [construction, setConstruction] = useState(0);
  const [events, setEvents] = useState(0);
  const [trafficZones, setTrafficZones] = useState(0);
  const [aqi, setAqi] = useState(0);
  const [finalAqi, setFinalAqi] = useState(null);
  const [fluctuatedAqi, setFluctuatedAqi] = useState(null);

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate input data
    if (industries === 0 || schools === 0 || colleges === 0 || construction === 0 || events === 0 || trafficZones === 0 || aqi === 0) {
      toast.error("Please fill in all the required fields for accurate AQI analysis!");
      return;
    }

    // Pollution impact calculation for each category
    const industryImpact = industries * 10;
    const schoolImpact = schools * 5;
    const collegeImpact = colleges * 5;
    const constructionImpact = construction * 8;
    const eventImpact = events * 6;
    const trafficImpact = trafficZones * 12; // Traffic zones impact

    // Subtracting the pollution contributions from the current AQI value
    const adjustedAqi = aqi - (industryImpact + schoolImpact + collegeImpact + constructionImpact + eventImpact + trafficImpact);

    // Random fluctuation for the AQI based on data analysis
    const fluctuation = Math.random() * 20 - 10; // Random fluctuation between -10 and +10
    const fluctuatedAqiValue = adjustedAqi + fluctuation;

    // Display success message and update final AQI and fluctuated AQI states
    setFinalAqi(adjustedAqi);
    setFluctuatedAqi(fluctuatedAqiValue);
    toast.success(`Final AQI Value: ${adjustedAqi.toFixed(2)} (Impact from factors considered)`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(5, 8, 22)" }}>
      <div className="text-white p-10 rounded-lg shadow-xl w-full max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">Pollution Analysis & AQI Calculation</h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="flex justify-between">
            <label className="text-lg font-semibold">Enter the number of industries nearby:</label>
            <input
              type="number"
              min="0"
              value={industries}
              onChange={(e) => setIndustries(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between">
            <label className="text-lg font-semibold">Enter the number of schools nearby:</label>
            <input
              type="number"
              min="0"
              value={schools}
              onChange={(e) => setSchools(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between">
            <label className="text-lg font-semibold">Enter the number of colleges nearby:</label>
            <input
              type="number"
              min="0"
              value={colleges}
              onChange={(e) => setColleges(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between">
            <label className="text-lg font-semibold">Enter the number of construction sites nearby:</label>
            <input
              type="number"
              min="0"
              value={construction}
              onChange={(e) => setConstruction(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between">
            <label className="text-lg font-semibold">Enter the number of events nearby:</label>
            <input
              type="number"
              min="0"
              value={events}
              onChange={(e) => setEvents(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between">
            <label className="text-lg font-semibold">Enter the number of traffic zones:</label>
            <input
              type="number"
              min="0"
              value={trafficZones}
              onChange={(e) => setTrafficZones(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between">
            <label className="text-lg font-semibold">Enter the current AQI value:</label>
            <input
              type="number"
              value={aqi}
              onChange={(e) => setAqi(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-3 rounded-md w-full text-lg mt-6 hover:bg-blue-700 transition"
          >
            Analyze Pollution Impact
          </button>
        </form>

        {finalAqi !== null && (
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Final AQI Calculation</h2>
            <div className="text-4xl font-extrabold text-yellow-400 mb-4">
              Real AQI: {finalAqi.toFixed(2)}
            </div>
            <div className="text-4xl font-extrabold text-green-300">
              Fluctuated AQI: {fluctuatedAqi.toFixed(2)}
            </div>

            <div className="text-lg mt-4">
              <strong>Impact Breakdown:</strong>
              <ul className="list-disc pl-6 space-y-2">
                <li>Industries: {industries} industries contributing {industries * 10} AQI</li>
                <li>Schools: {schools} schools contributing {schools * 5} AQI</li>
                <li>Colleges: {colleges} colleges contributing {colleges * 5} AQI</li>
                <li>Construction: {construction} sites contributing {construction * 8} AQI</li>
                <li>Events: {events} events contributing {events * 6} AQI</li>
                <li>Traffic Zones: {trafficZones} zones contributing {trafficZones * 12} AQI</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default PollutionAnalysis;
