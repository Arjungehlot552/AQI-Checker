import React from 'react';

const AQIData = [
  {
    color: 'bg-green-500',
    label: 'Good',
    range: '0 - 100',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  {
    color: 'bg-yellow-500',
    label: 'Moderate',
    range: '100 - 200',
    description: 'Air quality is acceptable; however, there may be a risk for some people.',
  },
  {
    color: 'bg-orange-500',
    label: 'Unhealthy for Sensitive Groups',
    range: '200 - 300',
    description: 'Members of sensitive groups may experience health effects.',
  },
  {
    color: 'bg-red-500',
    label: 'Unhealthy',
    range: '300 - 400',
    description: 'Some members of the general public may experience health effects.',
  },
  {
    color: 'bg-purple-500',
    label: 'Very Unhealthy',
    range: '400 - 500',
    description: 'Health alert: The risk of health effects is increased for everyone.',
  },
  {
    color: 'bg-gray-800',
    label: 'Hazardous',
    range: '501 and higher',
    description: 'Health warning of emergency conditions; everyone is more likely to be affected.',
  },
];

const AQIScale = () => {
  return (
    <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className="flex flex-col  mb-32 mt-32   items-center justify-center">
      <h1 className="text-4xl text-[#289BD1]  font-bold mb-10">Air Quality Index (AQI) Scale</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-full  max-w-5xl">
        {AQIData.map((item, index) => (
        <div
        key={index}
        className={`rounded-lg shadow-lg p-6  cursor-pointer text-white ${item.color} transform transition-transform duration-300 ease-in-out hover:scale-105`}
      >
        <h2 className="text-xl font-semibold">{item.label}</h2>
        <p className="text-lg">{item.range}</p>
        <p className="mt-2">{item.description}</p>
      </div>
      
        ))}
      </div>
    </div>
  );
};

export default AQIScale;