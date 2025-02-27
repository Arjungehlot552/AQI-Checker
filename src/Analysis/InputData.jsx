import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PollutionAnalysis() {
  const [industries, setIndustries] = useState(0);
  const [schools, setSchools] = useState(0);
  const [colleges, setColleges] = useState(0);
  const [construction, setConstruction] = useState(0);
  const [events, setEvents] = useState(0);
  const [trafficZones, setTrafficZones] = useState(0);
  const [aqi] = useState(0);
  const [finalAqi, setFinalAqi] = useState(null);
  const [remainingAqi, setRemainingAqi] = useState(null);
  const [fluctuatedAqi, setFluctuatedAqi] = useState(null);
  const [myaqivalue, setmyaqivalue] = useState(0);
  const [customDirection, setCustomDirection] = useState("");
  const [latitude, setLatitude] = useState(null); // State for latitude
  const [longitude, setLongitude] = useState(null); // State for longitude
  // Declare state for error handling
  const [locationError, setLocationError] = useState("");
  const role = localStorage.getItem("role");
  useEffect(() => {
    const aqiValue = localStorage.getItem("aqiValue");
    if (aqiValue) {
      setmyaqivalue(Number(aqiValue));
    }
  }, []);
  if (role !== "admin") {
    return (
      <div className="text-white text-center text-3xl font-bold">
        You are not authorized to access this page
      </div>
    );
  }

  // Function to handle location permission request
  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Successfully got the location, you can use position.coords.latitude and position.coords.longitude
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLatitude(lat);
          setLongitude(lon);
        },
        (error) => {
          // Handle errors (e.g., user denies location access)
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError("You denied the location permission.");
          } else {
            setLocationError("An error occurred while retrieving location.");
          }
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  // Fetch AQI value from localStorage on component mount

  const handleGetAQI = () => {
    const aqiValue = localStorage.getItem("aqiValue");
    if (aqiValue) {
      setmyaqivalue(Number(aqiValue));
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (
      industries === -1 ||
      schools === -1 ||
      colleges === -1 ||
      construction === -1 ||
      events === -1 ||
      trafficZones === -1 ||
      aqi === -1
    ) {
      toast.error(
        "Please fill in all the required fields for accurate AQI analysis!"
      );
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
    const finalAqiValue = myaqivalue;
    const remainingAqiValue =
      myaqivalue -
      industryImpact -
      schoolImpact -
      collegeImpact -
      constructionImpact -
      eventImpact -
      trafficImpact;
    const fluctuatedAqi = finalAqiValue - remainingAqiValue;
    // Display success message and update final AQI state
    setFinalAqi(finalAqiValue);
    setRemainingAqi(remainingAqiValue);
    setFluctuatedAqi(fluctuatedAqi);

    toast.success(
      `Final AQI Value: ${finalAqiValue} (Impact from factors considered)`
    );
  };

  return (
    <div
      style={{ backgroundColor: "rgb(5, 8, 22)" }}
      className="md:min-h-screen mt-20 flex items-center justify-center p-2  to-blue-700"
    >
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 rounded-lg  space-y-4 md:space-y-0 md:space-x-6">
          <h2 className="text-white text-center text-3xl font-semibold">
            Pollution Analysis & AQI Calculation
          </h2>
          <div>
            {/* Button to request location access */}
            <button
              onClick={handleLocationPermission}
              className="bg-blue-500 text-white border py-3 px-6 rounded-lg text-lg font-bold shadow-md transform transition hover:bg-green-600 hover:text-white hover:scale-105"
            >
              Auto Fill
            </button>
            {/* Show latitude and longitude if available */}
            {latitude && longitude && (
              <h3 className="mt-4 text-lg font-semibold text-green-500">
                Lat: {latitude} <br></br> Long: {longitude}
              </h3>
            )}
            {/* Error message if location access is denied */}
            {locationError && (
              <p className="mt-4 text-red-500 text-lg">{locationError}</p>
            )}
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Industries nearby:
            </label>
            <input
              type="number"
              min="0"
              value={industries}
              onChange={(e) => setIndustries(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 bg-transparent text-white rounded-md w-1/2 "
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Schools nearby:
            </label>
            <input
              type="number"
              min="0"
              value={schools}
              onChange={(e) => setSchools(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md bg-transparent text-white w-1/2 "
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Colleges nearby:
            </label>
            <input
              type="number"
              min="0"
              value={colleges}
              onChange={(e) => setColleges(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md bg-transparent text-white w-1/2 "
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Construction sites:
            </label>
            <input
              type="number"
              min="0"
              value={construction}
              onChange={(e) => setConstruction(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md bg-transparent text-white w-1/2 "
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Events nearby:
            </label>
            <input
              type="number"
              min="0"
              value={events}
              onChange={(e) => setEvents(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md bg-transparent text-white w-1/2 "
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Traffic zones:
            </label>
            <input
              type="number"
              min="0"
              value={trafficZones}
              onChange={(e) => setTrafficZones(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md bg-transparent text-white w-1/2 "
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Wind Speed &#40; in km/h &#41;:
            </label>
            <input
              type="number"
              min="0"
              placeholder="In km/h"
              className="px-4 py-2 border border-gray-300 bg-transparent text-white rounded-md w-1/2 "
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-semibold">
              Wind Direction:
            </label>
            <select className="px-4 py-2 border border-gray-300 bg-transparent text-white rounded-md w-1/2 ">
              <option className="text-black " value="all">
                Directions
              </option>
              <option className="text-black " value="east-west">
                North
              </option>
              <option className="text-black " value="east-west">
                North-East
              </option>
              <option className="text-black " value="east-west">
                East
              </option>
              <option className="text-black " value="west-east">
                South-East
              </option>
              <option className="text-black " value="north-west">
                South
              </option>
              <option className="text-black " value="south-east">
                South-West
              </option>
              <option className="text-black " value="south-east">
                West
              </option>
              <option className="text-black " value="south-east">
                North-West
              </option>
            </select>
          </div>


          {/* Optional: Allow user to specify a custom direction */}
          {trafficZones === "custom" && (
            <div className="mt-4">
              <label className="text-lg text-white font-semibold">
                Enter Custom Direction:
              </label>
              <input
                type="text"
                placeholder="e.g., Northeast to Southwest"
                value={customDirection}
                onChange={(e) => setCustomDirection(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-600 mt-2"
              />
            </div>
          )}
        </form>

        <div className="flex flex-col md:flex-row justify-center items-center p-4 mb-5 mt-5  space-y-4 md:space-y-0 md:space-x-6">
          <h2 className="text-white text-center text-3xl font-semibold">
            This is your Nearest Station AQI Value
          </h2>
          <button
            onClick={handleGetAQI}
            type="button"
            className="border text-white py-3 px-6 rounded-lg text-lg font-bold bg-blue-500 transform transition hover:bg-green-600 hover:text-white hover:scale-105"
          >
            Get AQI
          </button>
        </div>

        <div className="flex justify-between items-center">
          <label className="text-lg  text-white font-semibold">
            Current AQI:
          </label>
          <input
            type="number"
            value={myaqivalue} // Set the input value from state
            onChange={(e) => setmyaqivalue(Number(e.target.value))} // Allow user edits
            className="px-4 py-2 border border-gray-300 rounded-md w-1/2 text-white bg-transparent"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 md:ml-48 mb-14  text-white py-2 px-3 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300  mx-auto mt-6"
        >
          Analyze Pollution Impact
        </button>
        {/* Display the result */}
        {finalAqi !== null && (
          <div className=" text-center bg-gradient-to-r from-blue-600 to-indigo-900 p-2 rounded-lg shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-6 animate__animated animate__fadeIn">
              Final AQI Calculation
            </h2>

            <div className="text-4xl font-extrabold text-blue-400 mb-6">
              <p>
                <span className="text-xl text-white font-medium">
                  Station value:
                </span>{" "}
                <span className="text-3xl">{myaqivalue}</span>
              </p>
              <p>
                <span className="text-xl text-white font-medium">
                  Fluctuated Value:
                </span>{" "}
                <span className="text-3xl">{fluctuatedAqi}</span>
              </p>
              <hr className="my-4 border-t-2 border-blue-600"></hr>
              <p>
                <span className="text-xl text-white font-medium">
                  Actual value:
                </span>{" "}
                <span className="text-3xl text-green-500 ">
                  {Math.abs(remainingAqi)}
                </span>
              </p>
            </div>

            <div className="text-lg text-white mt-6 space-y-4">
              <strong className="text-xl">Impact Breakdown:</strong>
              <ul className="list-disc pl-8">
                <li className="hover:text-blue-300">
                  Industries: {industries} industries contributing{" "}
                  {industries * 10.0} AQI
                </li>
                <li className="hover:text-blue-300">
                  Schools: {schools} schools contributing {schools * 5.0} AQI
                </li>
                <li className="hover:text-blue-300">
                  Colleges: {colleges} colleges contributing {colleges * 5.0}{" "}
                  AQI
                </li>
                <li className="hover:text-blue-300">
                  Construction: {construction} sites contributing{" "}
                  {construction * 8.0} AQI
                </li>
                <li className="hover:text-blue-300">
                  Events: {events} events contributing {events * 6.0} AQI
                </li>
                <li className="hover:text-blue-300">
                  Traffic Zones: {trafficZones} zones contributing{" "}
                  {trafficZones * 6.0} AQI
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* <Meter /> */}
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default PollutionAnalysis;
