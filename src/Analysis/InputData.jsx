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
  const [remainingAqi, setRemainingAqi] = useState(null);

  // Function to handle form submission
  const handleSubmit = () => {
    if (industries === -1 || schools === -1 || colleges === -1 || construction === -1 || events === -1 || trafficZones === -1 || aqi === 0) {
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

    // Final AQI Calculation after considering the impacts
    const finalAqiValue = aqi + industryImpact + schoolImpact + collegeImpact + constructionImpact + eventImpact + trafficImpact;
    const remainingAqiValue = aqi - industryImpact - schoolImpact - collegeImpact - constructionImpact - eventImpact - trafficImpact;

    // Display success message and update final AQI state
    setFinalAqi(finalAqiValue);
    setRemainingAqi(remainingAqiValue);
    toast.success(`Final AQI Value: ${finalAqiValue} (Impact from factors considered)`);
  };

  return (
    <div  style={{ backgroundColor: "rgb(5, 8, 22)" }}  className="min-h-screen flex items-center justify-center p-8  to-blue-700">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">Pollution Analysis & AQI Calculation</h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">Industries nearby:</label>
            <input
              type="number"
              min="0"
              value={industries}
              onChange={(e) => setIndustries(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">Schools nearby:</label>
            <input
              type="number"
              min="0"
              value={schools}
              onChange={(e) => setSchools(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">Colleges nearby:</label>
            <input
              type="number"
              min="0"
              value={colleges}
              onChange={(e) => setColleges(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">Construction sites:</label>
            <input
              type="number"
              min="0"
              value={construction}
              onChange={(e) => setConstruction(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">Events nearby:</label>
            <input
              type="number"
              min="0"
              value={events}
              onChange={(e) => setEvents(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">Traffic zones:</label>
            <input
              type="number"
              min="0"
              value={trafficZones}
              onChange={(e) => setTrafficZones(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">Current AQI:</label>
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

        {/* Display the result */}
        {finalAqi !== null && (
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold text-gray-50 mb-4">Final AQI Calculation</h2>
            <div className="text-4xl font-extrabold text-blue-600">
              <p><span className="text-lg">Wrong value:</span> {finalAqi}</p>
              <p><span className="text-lg">Actual value:</span> {remainingAqi}</p>
            </div>
            <div className="text-lg text-gray-50 mt-4">
              <strong>Impact Breakdown:</strong>
              <ul className="list-disc pl-6 text-white space-y-2">
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
