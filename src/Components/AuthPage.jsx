import { useState, useContext, useEffect } from "react";

import { redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AuthPage = () => {
  useEffect(() => {
    if (localStorage.getItem("email")) {
      redirect("/");
    }
  });

  const [toggle, setToggle] = useState(true); // Toggle between login/register
  const [forget, setForget] = useState(false); // Forget password toggle
  const { userDetails, setUserDetails, loginUser, registerUser, updateUser } =
    useContext(UserContext); // Context methods
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Error state

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    if (forget) {
      // Handle Forget Password Logic
      if (!userDetails.email || !userDetails.password) {
        setError("Email and new password are required!");
        return;
      }
      // Call resetPassword API (implementation needed)
      // resetPassword(userDetails.email, userDetails.password);
      setForget(false); // Exit forget password mode
      updateUser(userDetails.email);
      alert("Password updated successfully! Please log in.");
      return;
    }

    if (toggle) {
      // Login Logic
      if (!userDetails.email || !userDetails.password) {
        setError("Email and password are required!");
        return;
      }
      try {

        const response = await loginUser(); // Call login function from context
        if (response.status === 400) {
          setError("Invalid Password!.");
          return;
        } else if (response.status === 500) {
          setError("Invalid credentials! Please try again.");
          return;
        } else if (response.code === "ERR_NETWORK") {
          setError("Network Error! Please try again.");
          return;
        } else {
          localStorage.setItem("email", userDetails.email);
          navigate("/");
        }
      } catch (err) {
        console.error("Login failed:", err);
        setError("Something went wrong during login. Please try again.");
      }
    } else {
      // Registration Logic
      if (!userDetails.name || !userDetails.email || !userDetails.password) {
        setError("All fields are required for registration!");
        return;
      }
      try {
        const response = await registerUser(); // Call register function from context
        if (response.status === 400) {
          setError("Email already exists! Please try another email.");
        } else if (response.status === 500) {
          setError("Registration failed. Please try again.");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Registration failed:", err);
        setError("Something went wrong during registration. Please try again.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050816]">
      <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {forget ? "Reset Password" : toggle ? "Welcome Back" : "Join Us"}
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input (only for registration) */}
          {!toggle && !forget && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={userDetails.name || ""}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                className="mt-1 block w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-white focus:border-white"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userDetails.email || ""}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className="mt-1 block w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-white focus:border-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              {forget ? "New Password" : "Password"}
            </label>
            <input
              type="password"
              id="password"
              value={userDetails.password || ""}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              className="mt-1 block w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-white focus:border-white"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-bold bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {forget ? "Reset Password" : toggle ? "Sign In" : "Sign Up"}
          </button>

          {/* Forget Password Option */}
          {toggle && (
            <p
              className="text-yellow-500 text-sm text-center cursor-pointer"
              onClick={() => {
                setForget(!forget)
                setToggle(false); // Reset toggle state
              }
              }
            >
              Forget Password?
            </p>
          )}

          {/* Toggle Between Login and Registration */}
          <p className="text-sm text-center">
            {forget
              ? "Remembered your password?"
              : toggle
                ? "New here?"
                : "Already have an account?"}{" "}
            <span
              className="text-yellow-500 cursor-pointer"
              onClick={() => {
                setToggle(!toggle);
                setForget(false); // Reset forget state
              }}
            >
              {forget ? "Login" : toggle ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default AuthPage;
