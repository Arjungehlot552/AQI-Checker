// api.js
export async function fetchProfileData() {
    return {
      name: "John Doe",
      email: "john@example.com",
      location: "New York, USA",
    };
  }
  
  export async function fetchSubscriptionData() {
    return [
      { id: 1, name: "Basic Health Plan", status: "Active", expiryDate: "2025-12-31" },
    ];
  }
  
  export async function fetchPollutionData() {
    return [
      { id: 1, location: "Downtown", aqi: 180, recommendation: "Avoid if possible" },
      { id: 2, location: "City Park", aqi: 150, recommendation: "Reduce exposure" },
    ];
  }
  