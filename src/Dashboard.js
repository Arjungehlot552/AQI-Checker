import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch user data from the backend API
    fetch("http://localhost:5000/user") // Ensure this matches your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  if (loading) {
    return (
      <Box style={{ backgroundColor: "rgb(5, 8, 22)" }} className="h-screen flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="dashboard-container mt-20 min-h-screen p-8">
      {userData ? (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-semibold text-center text-[#289BD1] mb-8">
            Welcome to your Dashboard, {userData.name}!
          </h1>

          <div className="bg-gray-900 shadow-lg rounded-lg p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-50">
                  <strong>Full Name:</strong> {userData.name} {userData.surname}
                </p>
                <p className="text-lg font-medium text-gray-50">
                  <strong>Age:</strong> {userData.age}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-50">
                  <strong>Contact Number:</strong> {userData.contactNumber}
                </p>
                <p className="text-lg font-medium text-gray-50">
                  <strong>Email:</strong> {userData.email}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-50">
                <strong>Address:</strong>
              </p>
              <p className="text-gray-50">{userData.address}</p>
            </div>
          </div>
        </div>
      ) : (
        <Box className="h-screen flex flex-col items-center justify-center">
          <p className="text-xl text-gray-50">No user data found.</p>
        </Box>
        
       
      )}
    </div>
    </>
  );
};

export default Dashboard;
