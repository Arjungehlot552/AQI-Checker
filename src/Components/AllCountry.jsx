import React, { useState } from 'react';

// Expanded list of cities in Delhi
const delhiCities = [
  'Connaught Place', 'Chandni Chowk', 'Karol Bagh', 'Dwarka', 'Vasant Vihar',
  'Saket', 'Rohini', 'Janakpuri', 'Pitampura', 'Greater Kailash',
  'Hauz Khas', 'Lajpat Nagar', 'Nehru Place', 'Shahdara', 'Rajouri Garden',
  'Mayur Vihar', 'South Extension', 'Okhla', 'Punjabi Bagh', 'Paschim Vihar',
  'Ashok Vihar', 'Model Town', 'Shalimar Bagh', 'Kalkaji', 'Munirka',
  'Anand Vihar', 'Geeta Colony', 'Mehrauli', 'Nangloi', 'Najafgarh',
  'Palam Vihar', 'Vikaspuri', 'Tilak Nagar', 'Ramesh Nagar', 'Adarsh Nagar',
  'Malviya Nagar', 'Sarita Vihar', 'Inder Puri', 'Kirti Nagar', 'Keshav Puram'
];

const AllCities = () => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 8, delhiCities.length));
  };

  const handleShowLess = () => {
    setVisibleCount(prevCount => Math.max(prevCount - 8, 8));
  };

  return (
    <div
      style={{ backgroundColor: 'rgb(5, 8, 22)' }}
      className="min-h-screen flex flex-col items-center py-6"
    >
      <header className="text-center mt-8 mb-10">
        <h1 className="text-4xl font-bold text-[#289BD1] text-center">
          Air Quality in Delhi Cities
        </h1>
        <p className="mt-2 text-lg text-white">
          Real-time air quality and weather data in Delhi
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full cursor-pointer max-w-7xl px-4">
        {delhiCities.slice(0, visibleCount).map((city, index) => (
          <div
            className="bg-gray-900 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
            key={index}
          >
            <h2 className="text-xl font-semibold text-white">{city}</h2>
            <p className="mt-2 text-white">Air Quality Index: --</p>
            <p className="text-white">Weather: --</p>
          </div>
        ))}
      </div>
      {/* Buttons Section */}
      <div className="mt-6 flex space-x-4">
        {visibleCount < delhiCities.length && (
          <button
            onClick={handleShowMore}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Show More
          </button>
        )}
        {visibleCount > 8 && (
          <button
            onClick={handleShowLess}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default AllCities;
