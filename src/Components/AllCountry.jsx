import React, { useState } from 'react';

const countries = [
  'Afghanistan', 'Algeria', 'Andorra', 'Argentina', 'Armenia', 'Australia',
  'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belgium', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Bulgaria', 'Burkina Faso',
  'Burma', 'Canada', 'Chad', 'Chile', 'China', 'Colombia', 'Congo Kinshasa',
  'Costa Rica', 'Cote DIvoire', 'Croatia', 'Curacao', 'Cyprus', 'Czechia',
  'Denmark', 'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia',
  'Finland', 'France', 'French Guiana', 'Gabon', 'Georgia', 'Germany',
  'Ghana', 'Gibraltar', 'Greece', 'Guadeloupe', 'Guatemala', 'Guinea',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Macedonia', 'Madagascar', 'Malaysia', 'Mali', 'Malta',
  'Martinique', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
  'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Niger',
  'Nigeria', 'North Korea', 'Norway', 'Pakistan', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania',
  'Russia', 'Rwanda', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea',
  'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland', 'Taiwan',
  'Tajikistan', 'Thailand', 'Trinidad And Tobago', 'Turkey', 'Turkmenistan',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Uzbekistan', 'Vietnam',
];

const AllCountry = () => {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 20);
  };
  // bg-gradient-to-r from-blue-100 to-gray-100
  return (
    <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className="min-h-screen flex flex-col items-center py-6">
      <header className="text-center mt-8 mb-10">
        <h1 className="text-4xl font-bold text-[#289BD1] text-center">Air Quality Around the World</h1>
        <p className="mt-2 text-lg text-white">Real-time air quality and weather data around the world</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full cursor-pointer max-w-7xl px-4">
        {countries.slice(0, visibleCount).map((country, index) => (
          <div className="bg-gray-900 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105" key={index}>
            <h2 className="text-xl font-semibold text-white">{country}</h2>
            <p className="mt-2 text-white">Air Quality Index: --</p>
            <p className="text-white">Weather: --</p>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {visibleCount < countries.length && (
        <button
          onClick={handleShowMore}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default AllCountry;
