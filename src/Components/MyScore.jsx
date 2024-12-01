import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyScore = () => {
  const [score, setScore] = useState(320); // Initial score
  const navigate = useNavigate();
  const location = useLocation();

  // Update score if there's an updatedScore in location.state
  useEffect(() => {
    if (location.state?.updatedScore !== undefined) {
      setScore(location.state.updatedScore);
    }
  }, [location.state]);

  const products = [
    { 
      id: 1, 
      name: "Electric Bill Redemption", 
      points: 150, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Redeem points to pay your electric bills."
    },
    { 
      id: 2, 
      name: "Water Bill Redemption", 
      points: 100, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Use your points to pay your water bills."
    },
    { 
      id: 3, 
      name: "Government Bill Redemption", 
      points: 200, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Redeem points for various government bills, such as tax, fines, and more."
    },
    { 
      id: 4, 
      name: "Gift Voucher", 
      points: 250, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Redeem points for a gift voucher that can be used at various retailers."
    },
    { 
      id: 5, 
      name: "Government Travelers Discount", 
      points: 300, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Get a discount on government traveler services such as trains, buses, and flights."
    },
    { 
      id: 6, 
      name: "Tax Benefits", 
      points: 350, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Redeem points for tax benefits such as rebates or deductions."
    },
    { 
      id: 7, 
      name: "Mobile Bill Payment", 
      points: 80, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Pay your mobile phone bills using your redeemed points."
    },
    { 
      id: 8, 
      name: "Internet Bill Payment", 
      points: 120, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Use points to pay your internet provider bills."
    },
    { 
      id: 9, 
      name: "Healthcare Discount", 
      points: 220, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Redeem points for healthcare services, including doctor visits and medications."
    },
    { 
      id: 10, 
      name: "Restaurant Discount", 
      points: 180, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Get a discount at select restaurants using your points."
    },
    { 
      id: 11, 
      name: "Online Shopping Discount", 
      points: 130, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Redeem points for discounts on online shopping sites."
    },
    { 
      id: 12, 
      name: "Electric Vehicle Charging Discount", 
      points: 200, 
      image: "https://img.freepik.com/premium-photo/red-satin-bow-tied-with-red-ribbon-black-background_118124-328584.jpg?w=1380",
      description: "Use points to get discounts on electric vehicle charging."
    }
  ];

  const handleRedeemClick = (product) => {
    if (score >= product.points) {
      navigate(`/myredeem`, { state: { product, score } });
    } else {
      toast.error(`Insufficient points to redeem ${product.name}.`);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="p-6 mt-20 lg:pl-24 lg:pr-24 shadow-lg">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />

      <h2 className="text-3xl font-semibold mb-4 text-blue-600 text-center">My Score</h2>
      <p className="text-xl mb-8 text-white text-center">Current Points: <span className="font-bold">{score}</span></p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <img src={product.image} alt={product.name} className="w-full h-[10rem] rounded mb-4" />
            <h3 className="text-xl font-semibold text-white text-center">{product.name}</h3>
            <p className="text-lg text-gray-50 text-center">Points Needed: {product.points}</p>
            <button
              onClick={() => handleRedeemClick(product)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyScore;
