import React, { useState, useEffect } from 'react';
import LOGO from '../Images/LOGO.png';
import Google from '../Images/Google1.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [userRole, setUserRole] = useState('user');

  const backgroundImages = [
    'https://png.pngtree.com/thumb_back/fh260/background/20230415/pngtree-ai-robot-innovation-high-tech-ppt-robot-template-background-image-image_2207016.jpg',
    'https://www.shutterstock.com/image-vector/ai-sustainable-development-goals-futuristic-600nw-2476521095.jpg',
    'https://worldpermacultureassociation.com/wp-content/uploads/vibrant_permaculture_field_with_various_types_of_AI_systems-893x510.png',
    'https://bsmedia.business-standard.com/_media/bs/img/article/2024-10/24/full/1729766964-8261.jpg?im=FeatureCrop,size=(826,465)',
    'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202411/67414010563e6-delhi-air-pollution-23380341-16x9.jpg?size=948:533',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ userRole, isLogin });
  };

  return (
    <div
      className="flex items-center justify-center py-10 px-4"
      style={{
        backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 3s ease-in-out',
        
      }}
    >
      <div className="bg-gray-900 bg-opacity-75 rounded-2xl shadow-xl p-8 max-w-md w-full ">
        <div className="text-center mb-8">
          <img src={LOGO} alt="Logo" className="w-24 mx-auto mb-6 drop-shadow-lg" />
          <h2 className="text-4xl mb-4 font-extrabold text-gray-300 tracking-wide">
            {isLogin ? 'Login' : 'Signup'}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {isLogin
              ? 'Welcome back! Please login to your account.'
              : 'Create your account to get started.'}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border text-white bg-transparent border-gray-300 rounded-lg transition duration-200"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border text-white bg-transparent border-gray-300 rounded-lg transition duration-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border text-white bg-transparent border-gray-300 rounded-lg transition duration-200"
            required
          />
          <div className="mt-4">
            <label className="text-gray-400">Login as:</label>
            <div className="flex justify-start items-center space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="user"
                  checked={userRole === 'user'}
                  onChange={() => setUserRole('user')}
                  className="focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-200">User</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="admin"
                  checked={userRole === 'admin'}
                  onChange={() => setUserRole('admin')}
                  className="focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-200">Admin</span>
              </label>
            </div>
          </div>
          <div className="flex justify-around items-center mt-6">
            <button className="hover:scale-110 transition-transform">
              <img src={Google} alt="Google" className="h-10 rounded-full shadow-lg" />
            </button>
            {/* Other buttons */}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 transition duration-200"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
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
