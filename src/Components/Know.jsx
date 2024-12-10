import React from 'react';
import { useNavigate } from 'react-router-dom';

const Know = () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  const navigation = useNavigate();
  return (
    <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" min-h-screen flex flex-col items-center justify-center p-6">
      <header className="text-center mb-10 mt-16">
        <h1 className="text-5xl font-bold text-[#289BD1] leading-tight">
          Know What You Breathe
        </h1>
        <p className="mt-5 text-lg text-white  max-w-xl mx-auto leading-relaxed">
          Prana Air and AQI are one-stop solution providers for indoor and outdoor air quality problems.
          Protecting our health and well-being from air pollution.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <img className='h-[11rem] w-full' src="https://media.licdn.com/dms/image/D4D12AQGIw-72Qbiqig/article-cover_image-shrink_600_2000/0/1717560808802?e=2147483647&v=beta&t=LzvEAmWS-c09yUwrm8s_l4ydtlpkp2iASKBBp9iiBFE" alt="" />
          <h2 className="text-xl font-semibold mt-5 text-gray-50">Air Quality Monitor</h2>
          <p className="mt-2 text-gray-50">Air quality monitors to keep track of your indoor environment.</p>
          <a onClick={scrollToTop} href="/" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Know More</a>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition-transform transform hover:scale-105" onClick={() => navigation('/air-quality')}>
            <img className='h-[11rem] w-full' src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Air-Quality-Index-Monitoring-System-Top.jpg" alt="" />
          <h2 className="text-xl mt-5 font-semibold text-gray-50">Air Quality Sensor</h2>
          <p className="mt-2 text-gray-50">Advanced sensors for accurate air quality measurements.</p>
          {/* Replace href */}
          <a href='/' onClick={() => navigation('/air-quality')} className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Know More</a>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <img className='h-[11rem] w-full' src="https://cdn.prod.website-files.com/6281f31808e2aa515581d87e/668e1e87ff6693162009d7c4_best-air-qulaity-apis-desktop.webp" alt="" />
          <h2 className="text-xl mt-5 font-semibold text-gray-50">AQI API Service</h2>
          <p className="mt-2 text-gray-50">Access real-time AQI data through our API service.</p>
          <a href="/" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Know More</a>
        </div>
      </section>
    </div>
  );
};

export default Know;