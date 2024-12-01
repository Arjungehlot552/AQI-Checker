import React, { useState } from 'react';
import LOGO from '../Images/LOGO.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-gray-100 py-10 px-4">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full transition-transform transform hover:scale-105">
        <div className="text-center mb-8">
          <img
            src={LOGO} // Replace with your logo URL
            alt="Logo"
            className="w-32 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800">{isLogin ? 'Login' : 'Signup'}</h2>
          <p className="text-gray-600 mt-2">{isLogin ? 'Welcome back! Please login to your account.' : 'Create your account to get started.'}</p>
        </div>

        {/* Social Authentication Buttons */}
        <div className="flex justify-around mb-6">
          <button >
            <img
              src="https://cdn-icons-png.flaticon.com/128/11516/11516196.png"
              alt="Google"
              className="h-[5rem] mr-2"
            />
          </button>
          <button >
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25657.png"
              alt="GitHub"
              className="h-9 mr-2"
            />
          </button>
          <button >
            <img
              src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
              alt="Facebook"
              className="h-9 mr-2"
            />
          </button>
          <button >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png"
              alt="Twitter"
              className="h-9 mr-2"
            />
          </button>
        </div>

        {/* Auth Form */}
        <form className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleAuthMode}
              className="text-blue-600 font-semibold ml-1"
            >
              {isLogin ? 'Signup' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
