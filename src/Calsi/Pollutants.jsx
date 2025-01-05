import React, { useState } from "react";

function Pollutants() {
  const [data, setData] = useState({
    location: "",
    transportation: "",
    electricity: "",
    waste: "",
    pollutants: [],
  });

  const [carbonResult, setCarbonResult] = useState(null);
  const [pollutantAnalysis, setPollutantAnalysis] = useState(null);
  const role = localStorage.getItem('role');
  if (role !== 'admin') {
      return <div className='text-white text-center text-3xl font-bold'>You are not authorized to access this page</div>
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePollutant = (pollutant) => {
    setData((prev) => ({
      ...prev,
      pollutants: prev.pollutants.includes(pollutant)
        ? prev.pollutants.filter((p) => p !== pollutant)
        : [...prev.pollutants, pollutant],
    }));
  };

  const calculateCarbonFootprint = () => {
    const { transportation, electricity, waste } = data;

    const transportationEmission = parseFloat(transportation || 0) * 2.31;
    const electricityEmission = parseFloat(electricity || 0) * 0.92;
    const wasteEmission = parseFloat(waste || 0) * 0.85;

    const totalCarbonFootprint =
      transportationEmission + electricityEmission + wasteEmission;

    setCarbonResult({
      carbonFootprint: totalCarbonFootprint.toFixed(2),
    });
  };

  const analyzePollutantSources = () => {
    const baseSources = {
      vehicles: 0,
      industries: 0,
      agriculture: 0,
      natural: 0,
    };

    const analysis = { ...baseSources };

    if (data.pollutants.includes("NOx")) analysis.vehicles += 10;
    if (data.pollutants.includes("PM2.5")) analysis.industries += 5;

    setPollutantAnalysis({
      location: data.location,
      analysis,
    });
  };

  return (
    <div className="min-h-screen md:mt-20 bg-[#050816] pt-36 flex flex-col items-center p-2 md:p-8">
      <div className="border p-4 md:p-12 rounded-lg shadow-2xl w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center tracking-tight">
          Carbon Footprint & Pollutant Analysis
        </h2>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateCarbonFootprint();
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-base font-medium text-white mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg shadow-sm bg-transparent text-white"
              placeholder="Enter your city or region"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-white mb-1">
              Transportation (km/week)
            </label>
            <input
              type="number"
              name="transportation"
              value={data.transportation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg shadow-sm bg-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-white mb-1">
              Electricity Usage (kWh/month)
            </label>
            <input
              type="number"
              name="electricity"
              value={data.electricity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg shadow-sm bg-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-white mb-1">
              Waste Produced (kg/week)
            </label>
            <input
              type="number"
              name="waste"
              value={data.waste}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg shadow-sm bg-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-white mb-1">
              Select Pollutants
            </label>
            <div className="flex flex-wrap gap-4 mt-2">
              {["PM2.5", "NOx", "SO2", "CO", "O3"].map((pollutant) => (
                <label key={pollutant} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={pollutant}
                    onChange={() => togglePollutant(pollutant)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-white font-medium">{pollutant}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Calculate Carbon Footprint
          </button>
        </form>

        {/* Display Results */}
        {carbonResult && (
          <div className="mt-8 p-6 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center">
            <p className="text-lg">
              Your estimated carbon footprint is
              <span className="font-bold"> {carbonResult.carbonFootprint} </span>
              kg CO2 per year.
            </p>
          </div>
        )}

        <button
          onClick={analyzePollutantSources}
          className="w-full mt-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
        >
          Analyze Pollutant Sources
        </button>

        {pollutantAnalysis && (
          <div className="mt-8 p-6 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg">
            <h3 className="text-xl font-bold">Pollutant Source Breakdown</h3>
            <ul className="mt-4 space-y-2">
              {Object.entries(pollutantAnalysis.analysis).map(
                ([source, percentage]) => (
                  <li key={source}>
                    <span className="font-medium capitalize">{source}</span>: {percentage}%
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pollutants;
