import React from 'react';
import appStore from './../Images/app-store1.webp';
import googlePlay from './../Images/Google_Play.png';
import Mobileapp from './../Images/Mobileapp.png';

const AQIAppPage = () => {
  return (
    <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className="min-h-screen  flex flex-col items-center py-6">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-[#289BD1] text-center mb-4">AQI Air Quality App</h1>
        <p className="mt-4 text-lg text-white">Free AQI Mobile App For Your IOS, Android, And Smart TV Devices</p>
      </header>

      {/* Responsive Layout for App Image and Features */}
      <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="flex flex-col md:flex-row  items-center justify-center w-full max-w-7xl px-4">
        
        {/* App Image Section */}
        <div className="flex justify-center mb-4 md:mb-0 md:w-1/2">
          <img
            src={Mobileapp}
            alt="AQI Mobile App"
            className="max-w-xs md:max-w-md h-[32rem] rounded-lg "
          />
        </div>

        {/* Features and Download Section */}
        <div className="text-center md:text-left md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Features</h2>
          <p className="mt-2 text-lg text-white">Real-time air quality API for accurate global data</p>
          <p className="mt-2 text-lg text-white">World air pollution map and weather map</p>
          <p className="mt-2 text-lg text-white">Insightful Air quality monitoring dashboard</p>

          {/* Download Buttons */}
          <div className="mt-10 flex flex-col md:flex-row justify-center md:justify-start gap-4">
            <a href="/" className="hover:opacity-80">
              <img src={googlePlay} alt="Download on Google Play" className="w-40 mt-3 text-white" />
            </a>
            <a href="/" className="hover:opacity-80">
              <img src={appStore} alt="Download on App Store" className="w-40" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIAppPage;
