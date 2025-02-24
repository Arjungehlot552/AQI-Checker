import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modi from "../Images/Modi.png"

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
    <footer className="px-4 bg-gray-900 text-white py-12">
      <div className="container  mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo Section */}
          <div className="mb-6 flex flex-col items-center justify-start  ml- md:mb-0">
            <img src={Modi} alt="AQI India Logo" className="h-[10rem] w-[10rem] lg:ml-6 border-b" />
            <p className="mt-8 text-gray-400">Real-time Air Quality Monitoring</p>
          </div>
          
          <div className='flex flex-row gap-20 justify-between'>

         
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
          <div className="mb-6 hidden md:block md:mb-0">
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
      </div>
    </footer>
  );
};

export default Footer;
