import React, { useState, useEffect } from "react";
// import LOGO from "../Images/LOGO.png";
// import Modi_ji from "../Images/Modi-Ji.png"
// import SIH from "../Images/SIH_logo_2024.png"
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, redirect, Router, useLocation, useNavigate } from "react-router-dom";
import Moon from "../Images/Moon.png"
import { CiSearch } from "react-icons/ci";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const path = useLocation();

  // Effect to apply dark mode based on the state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark'); // Enable dark mode
    } else {
      document.documentElement.classList.remove('dark'); // Disable dark mode
    }
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      fetchForecastAQI();
    }
  };

  const fetchForecastAQI = () => {
    const query = searchQuery;
    setSearchQuery("");
    navigate(`/CustomMapPath/${query}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false); // Close the menu after navigation
  };
  const handleLogout = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.location.reload();
  }

  const getLinkClasses = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold transition" // Active link styling
      : "hover:text-blue-600 transition";

  return (
    <div onMouseLeave={setShowDropdown.bind(this, false)}>
      <nav className="bg-gray-900 shadow-md fixed top-0 w-full z-50 py-5">
        <div className="container flex items-center justify-between px-6 lg:px-12 mx-auto">
          {/* Logo and Search */}
          <div className="flex items-center space-x-6">
            {/* <img
              src={SIH}
              alt="AQI Logo"
              className="w-32 "
            /> */}
            <Link to={'/'} className="flex items-center select-none cursor-pointer">
              <span className="text-yellow-500 font-bold text-2xl">Smart</span>
              <span className="text-white font-bold text-2xl">AQI</span>
            </Link>
            <div className="relative hidden lg:flex lg:flex-row lg:items-center w-[30rem] px-4 space-x-2 border border-white rounded-full">
              <CiSearch color="white" />
              <input
                type="text"
                placeholder="Search Location City or Area"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-[#111827] flex-1 text-white py-2 px-2 rounded-full outline-none border-none transition duration-300"
              />
            </div>
          </div>


          <div className="flex items-center text-white space-x-8">
            <div className="hidden lg:flex text-md items-center space-x-5">
              <div className="flex flex-row items-center space-x-2">
                <span className="hidden lg:block text-white">IND</span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                  alt="India Flag"
                  className="hidden lg:block h-5 w-5"
                />
              </div>
              <Link to="/" className={getLinkClasses("/")}>
                Home
              </Link>
              <Link to="/Ranking" className={getLinkClasses("/Ranking")}>
                Ranking
              </Link>
              <Link to="/Monitor" className={getLinkClasses("/Monitor")}>
                Monitors
              </Link>
              <div className="relative">
                <button
                  className={`${getLinkClasses("/Resources")} flex items-center`}
                  onMouseEnter={setShowDropdown.bind(this, true)}
                >
                  More
                  <span className="ml-1 mt-1">
                    {showDropdown ? <BiSolidUpArrow className="text-[0.6rem]" /> : <BiSolidDownArrow className="text-[0.6rem]" />}
                  </span>
                </button>
                {showDropdown && (
                  <div onMouseLeave={setShowDropdown.bind(this, false)} className="absolute p-3 bg-white border text-gray-700 text-md border-gray-200 shadow-md w-56 rounded-md mt-2">
                    <Link to="/resources" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      Resources
                    </Link>
                    <Link to="/Doctor" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      Doctor
                    </Link>
                    <Link to="/ngos" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      NGOs
                    </Link>
                    <Link to="/aqi-info" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      AQI Calculation
                    </Link>
                    <Link to="/pollutants" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      Pollutants Calculator
                    </Link>
                    {role !== 'admin' ? (<></>) : (<Link to="/compare" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      Comparisons
                    </Link>)}
                    {role !== 'admin' ? (<></>) : (<Link to="/heatmap" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      Heat Map
                    </Link>)}
                    {role !== 'admin' ? (<></>) : (<Link to="/thing" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      SmartAQI
                    </Link>)}
                    {role !== 'admin' ? (<></>) : (<Link to="/letter" className="flex items-center hover:bg-gray-200 border-b h-12 px-4 py-1 rounded-md">
                      Letter
                    </Link>)}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="flex items-center rounded-full text-white transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="transition-all duration-300 ease-in-out">
                {darkMode ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/10480/10480648.png" // Replace with your sun icon
                    alt="Light Mode"
                    className="h-6 w-6"
                  />
                ) : (
                  <img
                    src={Moon} // Replace with your moon icon
                    alt="Dark Mode"
                    className="h-6 w-6"
                  />
                )}
              </span>

            </button>
            {email ? (
              <div className="relative">
                {/* Profile Button */}
                <div
                  className="flex items-center lg:mr-10 justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold cursor-pointer sm:ml-20"
                  onClick={() => setShowProfileMenu((prev) => !prev)} // Toggle the visibility of the menu on click
                >
                  {localStorage.getItem("email") ? localStorage.getItem("email")[0].toUpperCase() : ""}
                </div>

                {/* Options Menu */}
                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2 transition-all transform origin-top-right scale-95 animate-fade-in"
                    onMouseEnter={() => setShowProfileMenu(true)} // Keep the menu visible when hovering over the menu itself
                    onMouseLeave={() => setTimeout(() => setShowProfileMenu(false), 3000)} // Hide after 3 seconds when mouse leaves the menu
                  >
                    <div
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNavigation("/MyProfile")}
                    >
                      Edit Profile
                    </div>
                    <div
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNavigation("/Dashboard")}
                    >
                      Dashboard
                    </div>
                    {/* <div
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNavigation("/MyScore")}
                    >
                      MyScore
                    </div> */}
                    <div
                      onClick={handleLogout}
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Log Out
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to={'/auth'}
                className="text-blue-500"
              >
                Log In
              </Link>
            )}


          </div>



          {/* Hamburger Menu Icon for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="h-8 w-8 animate-cross" />
              ) : (
                <MenuIcon className="h-8 w-8 animate-hamburger" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className="lg:hidden top-0 fixed w-full bg-gray-800 mt-20 text-white py-8 px-6 rounded-lg shadow-lg space-y-4 z-50"
          style={{
            maxHeight: "calc(100vh - 80px)", // Adjust max height to fit the screen
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          {/* Search Input */}
          <div className="flex flex-row items-center w-full px-4 py-2 space-x-2 border border-white rounded-full bg-[#111827]">
            <input
              type="text"
              placeholder="Search Location City or Area"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                // Check if the key pressed is "Enter"
                if (e.key === "Enter") {
                  // Call fetchForecastAQI immediately
                  fetchForecastAQI();

                  // Introduce a delay for toggleMenu
                  setTimeout(() => {
                    toggleMenu();
                  }, 500); // 800ms delay
                }
              }}
              className="bg-transparent flex-1 text-white placeholder-gray-400 py-2 px-2 rounded-full outline-none"
            />

          </div>

          {/* Navigation Links */}
          <Link
            to="/"
            className="flex items-center py-2 px-4 h-12 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/Ranking"
            className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Ranking
          </Link>
          <Link
            to="/Monitor"
            className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Monitors
          </Link>
          <Link
            to="/Resources"
            className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
            onClick={toggleMenu}
          >
            Resources
          </Link>
          <Link
            to="/Doctor"
            onClick={toggleMenu}
            className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Doctor
          </Link>
          <Link
            to="/ngos"
            onClick={toggleMenu}
            className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            NGOs
          </Link>
          <Link
            to="/aqi-info"
            onClick={toggleMenu}
            className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            AQI Calculation
          </Link>
          <Link
            to="/pollutants"
            onClick={toggleMenu}
            className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Pollutants Calculator
          </Link>
          {role !== "admin" ? null : (
            <>
              <Link
                to="/compare"
                onClick={toggleMenu}
                className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Comparisons
              </Link>
              <Link
                to="/heatmap"
                onClick={toggleMenu}
                className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Heat Map
              </Link>
              <Link
                to="/thing"
                onClick={toggleMenu}
                className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
              >
                SmartAQI
              </Link>
              <Link
                to="/letter"
                onClick={toggleMenu}
                className="flex items-center h-12 py-2 px-4 bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Letter
              </Link>
            </>
          )}
        </div>
      )}



    </div>
  );
};

export default Navbar;
