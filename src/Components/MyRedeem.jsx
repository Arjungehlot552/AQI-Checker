import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to generate a 7-letter voucher code
const generateVoucherCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let voucherCode = '';
  for (let i = 0; i < 7; i++) {
    voucherCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return voucherCode;
};

const MyRedeem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, score } = location.state;
  const [voucherCode, setVoucherCode] = useState('');
  const [userScore, setUserScore] = useState(score);

  // Handle the Redeem Now click
  const handleRedeemNowClick = () => {
    const code = generateVoucherCode();
    setVoucherCode(code);
    const newScore = userScore - product.points;
    setUserScore(newScore);

    toast.success(`🎉 Congratulations! You've redeemed ${product.name}. Your remaining score is ${newScore} points.`);
  };

  // Handle Copy functionality
  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    toast.success('✅ Voucher code copied to clipboard!');
  };

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="flex mt-16 items-center justify-center min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      
      <div className="p-6 bg-gray-900 rounded-lg shadow-lg w-[30rem] transition-all transform hover:scale-105 duration-300 ease-in-out">
        <h2 className="text-3xl font-semibold mb-4 text-blue-600 text-center">Redeem Points</h2>
        
        <div className="p-4  mb-6">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
          <h3 className="text-2xl text-white font-semibold text-center">{product.name}</h3>
          <p className="text-lg text-gray-50 mb-2 text-center">Points Needed: {product.points}</p>
          <p className="text-lg text-white mb-4 text-center">{product.description || "This is a great product you can redeem!"}</p>
          
          {!voucherCode ? (
            <button
              onClick={handleRedeemNowClick}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all transform hover:scale-105"
            >
              Redeem Now
            </button>
          ) : (
            <div>
              <p className="text-lg text-gray-50 mb-4 text-center">Voucher Code: <h2 className='text-2xl font-semibold text-blue-600'>{voucherCode}</h2></p>
              <button
                onClick={handleCopyCode}
                className="w-[40%] ml-7 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all transform hover:scale-105 mb-4"
              >
                Copy Voucher Code
              </button>
              <button
                onClick={() => navigate("/myscore", { state: { updatedScore: userScore } })}
                className="w-[40%] ml-5 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all transform hover:scale-105"
              >
                Back to MyScore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRedeem;
