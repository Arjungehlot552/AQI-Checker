import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LOGO from "../Images/LOGO.png";

const Footer = () => {

  // useEffect(() => {
  //   const addGoogleTranslateScript = () => {
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     document.body.appendChild(script);
  //   };

  //   const googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       { pageLanguage: "en" },
  //       "google_translate_element"
  //     );
  //   };

  //   window.googleTranslateElementInit = googleTranslateElementInit;
  //   addGoogleTranslateScript();
  // }, []);

  return (
    <footer   className=" px-24 bg-gray-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <img src={LOGO} alt="AQI India Logo" className="h-[5rem]" />
            <p className="mt-2 text-gray-400">Real-time Air Quality Monitoring</p>
          </div>

          {/* Resources Section */}
          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-semibold">RESOURCES</h5>
            <ul className="mt-2">
              <li><a href="/" className="text-gray-400 hover:text-blue-400">Home</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-blue-400">Dashboard</a></li>
              <li><a href="/faqs" className="text-gray-400 hover:text-blue-400">FAQs</a></li>
              <li><a href="/air-quality-monitor" className="text-gray-400 hover:text-blue-400">Air Quality Monitor</a></li>
              <li><a href="/aqi-app" className="text-gray-400 hover:text-blue-400">AQI Mobile App</a></li>
            </ul>
            {/* Google Translate Element */}
            {/* <div id="google_translate_element" className="mr-4"></div> */}
          </div>

          {/* Company Section */}
          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-semibold">COMPANY</h5>
            <ul className="mt-2">
              <li><a href="/about" className="text-gray-400 hover:text-blue-400">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-blue-400">Contact Us</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-blue-400">Terms & Conditions</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-blue-400">Blog</a></li>
            </ul>
          </div>

          {/* Location Section */}
          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-semibold">LOCATION</h5>
            <div className="flex items-center mt-2">
              <i className="fas fa-phone mr-2"></i>
              <span className="text-gray-400">+91 8103383910</span>
            </div>
            <div className="flex items-center mt-1">
              <i className="fas fa-envelope mr-2"></i>
              <span className="text-gray-400">AirQualityCheck.in</span>
            </div>
            <div className="flex items-center mt-1">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span className="text-gray-400">706, 7th Floor, Crown Heights, Rohini <br></br> Sec-10, Delhi 110085, INDIA</span>
            </div>
          </div>

          {/* Get Our App Section */}
          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-semibold">GET OUR APP</h5>
            <ul className="mt-2">
              <li>
                <a href="/aqi-ios" className="text-gray-400 hover:text-blue-400">AQI IOS APP</a>
              </li>
              <li>
                <a href="/aqi-android" className="text-gray-400 hover:text-blue-400">AQI ANDROID APP</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-2xl hover:text-blue-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-2xl hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-2xl hover:text-blue-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-2xl hover:text-blue-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
            
        </div>

        {/* Copyright Section */}
        <div className="mt-10 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AQI India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
