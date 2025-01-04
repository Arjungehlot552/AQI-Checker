import React from "react";
import contactimg from "../Images/Contact.png";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col mt-5 bg-gray-900 md:flex-row items-center justify-center ">
           {/* Right Side: Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center m-4">
        <img
          src={contactimg}
          alt="Contact Illustration"
          className="max-w-full h-[25rem]  transform hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
      {/* Left Side: Contact Form */}
      <div className="w-full md:w-1/2 bg-gray-800 p-8 shadow-lg rounded-xl m-4 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-4xl font-bold text-gray-50 mb-6 text-center">
          Get In Touch
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-50 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full mt-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-50 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-50 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Type your message here"
              rows="4"
              className="w-full mt-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-200"
          >
            Send Message
          </button>
        </form>
      </div>

   
    </div>
  );
};

export default Contact;
