
import { Button } from '@mui/material';
import React from 'react';


const SubscriptionModel = () => {

  const subscriptionData = [
    {
      title: 'User Subscription',
      description:
        'Stay informed and take care of your health with real-time AQI updates, personalized health advice, and pre-alerts for highly polluted areas.',
      features: [
        'Real-time AQI updates',
        'Health advice and mask alerts',
        'Pre-alerts for polluted areas',
        'Personalized care recommendations',
        'Location tracking for AQI insights',
      ],
      plans: [
        { name: 'Basic', price: '9.99/month', features: ['Real-time AQI updates', 'Mask alerts'], popular: false },
        { name: 'Standard', price: '19.99/month', features: ['All Basic features', 'Personalized care'], popular: true },
        { name: 'Premium', price: '29.99/month', features: ['All Standard features', 'Location tracking'], popular: false },
      ],
    },
    {
      title: 'Government Subscription',
      description:
        'Empower governments with advanced AQI insights, industrial zone data, and actionable solutions to minimize pollution.',
      features: [
        'Industrial area AQI data',
        'Traffic zone pollution monitoring',
        'Drone-based daily data collection',
        'Month-wise AQI comparison',
        'AQI forecast values',
      ],
      plans: [
        { name: 'Local', price: '199.99/month', features: ['Industrial AQI data', 'Traffic monitoring'], popular: false },
        { name: 'State', price: '499.99/month', features: ['All Local features', 'Drone data collection'], popular: true },
        { name: 'National', price: '999.99/month', features: ['All State features', 'Forecast values'], popular: false },
      ],
    },
    {
      title: 'Company Subscription',
      description:
        'Support businesses selling air purifiers, masks, and electric vehicles with targeted AQI insights and advertising opportunities.',
      features: [
        'Market insights for air quality products',
        'Targeted advertising opportunities',
        'Collaborative campaigns with AQI data',
        'Access to user preference analytics',
      ],
      plans: [
        { name: 'Starter', price: '99.99/month', features: ['Market insights', 'Basic analytics'], popular: false },
        { name: 'Growth', price: '299.99/month', features: ['All Starter features', 'Ad campaigns'], popular: true },
        { name: 'Enterprise', price: '599.99/month', features: ['All Growth features', 'User preference analytics'], popular: false },
      ],
    },
    {
      title: 'Public Awareness Partnerships',
      description:
        'Collaborate with NGOs or organizations running environmental campaigns and charge for sponsored content or banners.',
      features: [
        'Sponsored content opportunities',
        'Campaign collaborations',
        'Banner advertisement placements',
        'Environmental impact analysis',
      ],
      plans: [
        { name: 'Basic Partnership', price: '49.99/month', features: ['Sponsored content'], popular: false },
        { name: 'Enhanced Partnership', price: '149.99/month', features: ['All Basic features', 'Banner ads'], popular: true },
        { name: 'Premium Partnership', price: '299.99/month', features: ['All Enhanced features', 'Impact analysis'], popular: false },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-20 min-h-screen">
      <header className="bg-gradient-to-r from-blue-700 to-purple-700 py-8 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold text-white">Subscription Models</h1>
        <p className="text-gray-200 mt-2 text-lg">
          Discover the best plan tailored to your needs.
        </p>
      </header>
      <main className="max-w-7xl mx-auto py-12 px-6">
        {subscriptionData.map((section, index) => (
          <section key={index} className="mb-16">
            <h2 className="text-4xl font-bold mb-4 border-b-2 border-blue-600 pb-2">{section.title}</h2>
            <p className="text-gray-300 mb-8">{section.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {section.plans.map((plan, planIndex) => (
                <div
                  key={planIndex}
                  className={`relative bg-gray-800 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl p-8 ${plan.popular ? 'ring-4 ring-blue-500' : ''
                    }`}
                >
                  {plan.popular && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">{plan.name}</h3>
                  <p className="text-xl font-extrabold mb-6 text-white">{plan.price}</p>
                  <ul className="text-gray-300 space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <span className="text-green-400">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    to="/subscribe"
                    state={{ selectedPlan: plan }} // Passing the selected plan data as state
                    className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white py-2 px-6 rounded-lg font-semibold"
                  >
                    Subscribe Now
                  </Button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default SubscriptionModel;