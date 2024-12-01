import React, { useState } from "react";
import LOGO from "../Images/LOGO.png";
import search from "../Images/search.png";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchForecastAQI();
    }
  };

  const fetchForecastAQI = () => {
    if (searchQuery) {
      navigate(`/CustomMapPath/${searchQuery}`);
      setSearchQuery("");
    }
  }

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false); // Close the menu after navigation
  };

  const getLinkClasses = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold transition" // Active link styling
      : "hover:text-blue-600 transition";

  return (
    <div>
      <nav className="bg-gray-900 shadow-md fixed top-0 w-full z-50 py-3">
        <div className="container flex items-center justify-between px-6 lg:px-12 mx-auto">
          {/* Logo and Search */}
          <div className="flex items-center space-x-6">
            <img
              src={LOGO}
              alt="AQI Logo"
              className="h-16 w-20 mb-4 mt-[-1rem]"
            />
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search Location City or Area"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-10 pr-4 py-2 w-[30rem] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
              <img
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                src={search}
                alt="Search icon"
              />
            </div>
          </div>

          <div className="flex items-center text-white space-x-5">
            <span className="hidden lg:block text-white">IND</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="India Flag"
              className="hidden lg:block h-5 w-5"
            />
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className={getLinkClasses("/")}>
                Home
              </Link>
              <Link to="/Ranking" className={getLinkClasses("/Ranking")}>
                Ranking
              </Link>
              <Link to="/Monitor" className={getLinkClasses("/Monitor")}>
                Monitors
              </Link>
              <Link to="/Resources" className={getLinkClasses("/Resources")}>
                Resources
              </Link>
            </div>
            {isAuthenticated ? (
              <div className="relative">
                {/* Profile Button */}
                <div
                  className="flex items-center lg:mr-10 justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold cursor-pointer sm:ml-20"
                  onClick={() => setShowProfileMenu((prev) => !prev)} // Toggle the visibility of the menu on click
                >
                  {user?.name?.slice(0, 2).toUpperCase()}
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
                    <div
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNavigation("/Activity")}
                    >
                      Activity
                    </div>
                    <div
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNavigation("/ProblemArise")}
                    >
                      Problem Arise
                    </div>
                    <div
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleNavigation("/MyScore")}
                    >
                      MyScore
                    </div>
                    <div
                      className="text-gray-800 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                    >
                      Log Out
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="text-blue-500"
              >
                Log In
              </button>
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
        <div className="lg:hidden bg-gray-800 mt-20 text-white py-1 px-6">
          <Link
            to="/"
            className="block py-2 hover:text-blue-400"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/Ranking"
            className="block py-2 hover:text-blue-400"
            onClick={toggleMenu}
          >
            Ranking
          </Link>
          <Link
            to="/Monitor"
            className="block py-2 hover:text-blue-400"
            onClick={toggleMenu}
          >
            Monitors
          </Link>
          <Link
            to="/Resources"
            className="block py-2 hover:text-blue-400"
            onClick={toggleMenu}
          >
            Resources
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
