import React, { useState } from 'react';
import LOGO from '../Images/LOGO.png';
import Google from '../Images/Google1.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 py-10 px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full transition-transform transform hover:scale-105">
        <div className="text-center mb-8">
          <img
            src={LOGO} // Replace with your logo URL
            alt="Logo"
            className="w-24 mx-auto mb-6 drop-shadow-lg"
          />
          <h2 className="text-4xl mb-4 font-extrabold text-gray-100 tracking-wide">
            {isLogin ? 'Login' : 'Signup'}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {isLogin
              ? 'Welcome back! Please login to your account.'
              : 'Create your account to get started.'}
          </p>
        </div>

        {/* Auth Form */}
        <form className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border text-white bg-transparent border-gray-300 rounded-lg  transition duration-200"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border text-white bg-transparent border-gray-300 rounded-lg  transition duration-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border text-white bg-transparent border-gray-300 rounded-lg  transition duration-200"
            required
          />

          {/* Social Authentication Buttons */}
          <div className="flex justify-around items-center mt-6">
            <button className="hover:scale-110 transition-transform">
              <img
                src={Google}
                alt="Google"
                className="h-10 rounded-full shadow-lg"
              />
            </button>
            <button className="hover:scale-110 transition-transform">
              <img
                src="https://cdn-icons-png.flaticon.com/128/25/25657.png"
                alt="GitHub"
                className="h-10 rounded-full shadow-lg"
              />
            </button>
            <button className="hover:scale-110 transition-transform">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                alt="Facebook"
                className="h-10 rounded-full shadow-lg"
              />
            </button>
            <button className="hover:scale-110 transition-transform">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png"
                alt="Twitter"
                className="h-10 rounded-full shadow-lg"
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 transition duration-200"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleAuthMode}
              className="text-blue-500 font-semibold ml-1 hover:underline"
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
