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
  const [fluctuatedAqi, setFluctuatedAqi] = useState(null);

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
    const finalAqiValue = aqi;
    const remainingAqiValue = aqi - industryImpact - schoolImpact - collegeImpact - constructionImpact - eventImpact - trafficImpact;
    const fluctuatedAqi = finalAqiValue - remainingAqiValue;
    // Display success message and update final AQI state
    setFinalAqi(finalAqiValue);
    setRemainingAqi(remainingAqiValue);
    setFluctuatedAqi(fluctuatedAqi);

    toast.success(`Final AQI Value: ${finalAqiValue} (Impact from factors considered)`);
  };

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="min-h-screen flex items-center justify-center p-8  to-blue-700">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-full max-w-3xl">

        <div className="flex flex-col md:flex-row mb-10 justify-center items-center  p-4 rounded-lg  space-y-4 md:space-y-0 md:space-x-6">
          <h2 className="text-white text-center text-3xl font-semibold">
            Pollution Analysis & AQI Calculation
          </h2>
          <button className="bg-blue text-white border py-3 px-2 rounded-lg text-lg font-bold shadow-md transform transition hover:bg-green-600 hover:text-white hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none">
            Auto Fill
          </button>
        </div>
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
          <div className="flex flex-col md:flex-row justify-center items-center p-4 mb-8  space-y-4 md:space-y-0 md:space-x-6">
            <h2 className="text-white text-center text-3xl font-semibold">
              This is your Nearest Station AQI Value
            </h2>
            <button className="border text-white py-3 px-6 rounded-lg text-lg font-bold  transform transition hover:bg-green-600 hover:text-white hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none">
              Get AQI
            </button>
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
            className="bg-gradient-to-r from-blue-600 to-indigo-600 ml-48 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 w-72 mx-auto mt-6"
          >
            Analyze Pollution Impact
          </button>

        </form>

        {/* Display the result */}
        {finalAqi !== null && (
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold text-gray-50 mb-4">Final AQI Calculation</h2>
            <div className="text-4xl font-extrabold text-blue-600">
              <p><span className="text-3xl text-white font-light font-sans">Station value :</span> {finalAqi}</p>
              <p><span className="text-3xl text-white font-light font-sans">fluctuate Value :</span> {fluctuatedAqi}</p>
              <hr></hr>
              <p><span className="text-3xl text-green-500 font-bold font-sans">Actual value :</span> {remainingAqi}</p>

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
