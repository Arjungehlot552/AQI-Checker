import React from 'react';
import { useLocation } from 'react-router-dom';

const GetSubscribe = () => {
  const location = useLocation(); // Access the location state
  const { selectedPlan } = location.state || {}; // Get the selected plan from state

  if (!selectedPlan) {
    return <div>Error: No plan selected!</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-20 min-h-screen">
      <header className="bg-gradient-to-r from-blue-700 to-purple-700 py-8 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold text-white">Subscription Details</h1>
        <p className="text-gray-200 mt-2 text-lg">
          You're about to subscribe to the {selectedPlan.name} plan.
        </p>
      </header>
      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">{selectedPlan.name} Plan</h2>
          <p className="text-xl mb-6 text-white">{selectedPlan.price}</p>
          <h3 className="text-2xl font-bold text-blue-500 mb-4">Features:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-400 mr-2">✔</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Add any subscription logic like payment here */}
          <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white py-2 px-6 rounded-lg font-semibold mt-6">
            Proceed to Payment
          </button>
        </div>
      </main>
    </div>
  );
};

export default GetSubscribe;
