import React, { useState, useEffect } from 'react';
import { LocationMarkerIcon, SearchIcon } from '@heroicons/react/outline';

const EnhancedActivityPage = () => {
    const [search, setSearch] = useState('');
    const [activityData] = useState([
        { id: 1, type: 'Workout', date: '2024-11-18', description: 'Morning run, 5km' },
        { id: 2, type: 'Study', date: '2024-11-17', description: '2 hours of coding practice' },
        { id: 3, type: 'Meeting', date: '2024-11-16', description: 'Team sync-up meeting' },
        { id: 4, type: 'Exercise', date: '2024-11-15', description: 'Yoga session, 1 hour' },
    ]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [currentLocation, setCurrentLocation] = useState('');
    const [locationHistory, setLocationHistory] = useState([]);
    const [reminderMessage, setReminderMessage] = useState('');
    const [reminderTime, setReminderTime] = useState(30); // default reminder in minutes
    const [showAlert, setShowAlert] = useState(false);
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [isNumberDeactivated, setIsNumberDeactivated] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [alertType, setAlertType] = useState('success'); // Set the alert type
    const [alertMessage, setAlertMessage] = useState(''); // Set the alert message

    // LocationIQ API Key
    const API_KEY = 'pk.7e96e92de8ae354829adbff8be4c02c1';

    // Function to fetch location from coordinates using LocationIQ
    const getLocationFromCoordinates = (latitude, longitude) => {
        const url = `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const location = data.display_name;
                setCurrentLocation(location);
                setLocationHistory((prev) => [
                    ...prev,
                    { location, time: new Date().toLocaleTimeString() },
                ]);
                setIsLocationLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching location:', error);
                setCurrentLocation('Unable to fetch location.');
                setIsLocationLoading(false);
            });
    };

    // Function to simulate getting the current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setIsLocationLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getLocationFromCoordinates(latitude, longitude); // Call to get location name using coordinates
                },
                (error) => {
                    setCurrentLocation('Location access denied or failed');
                    setIsLocationLoading(false);
                }
            );
        } else {
            setCurrentLocation('Geolocation is not supported by this browser.');
        }
    };

    // Function to handle reminder setup
    const handleReminderSubmit = () => {
        setReminderMessage(`Reminder activated for every ${reminderTime} minutes!`);
        setAlertMessage(reminderMessage);
        setAlertType('success');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    };

    // Deactivate Number
    const handleDeactivateNumber = () => {
        setIsNumberDeactivated(true);
        setTimeout(() => setIsNumberDeactivated(false), 3000); // Deactivation message disappears after 3 seconds
    };

    useEffect(() => {
        const locationInterval = setInterval(() => {
            const location = `Latitude: ${Math.random() * 90}, Longitude: ${Math.random() * 180}`;
            setCurrentLocation(location);
            const timestamp = new Date().toLocaleTimeString();
            setLocationHistory((prev) => [...prev, { location, time: timestamp }]);
        }, 600000); // 600000ms = 10 minutes

        return () => clearInterval(locationInterval);
    }, []);

    // Filter activities based on search and selected filter
    const filteredActivities = activityData.filter(activity =>
        (selectedFilter === 'All' || activity.type === selectedFilter) &&
        activity.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: "rgb(5, 8, 22)" }}>
        <div   className="max-w-4xl mx-auto px-4 mt-20 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-50">Your Activity Tracker</h1>
                <p className="text-lg mt-5 text-gray-50">Track your activities, locations, and set reminders!</p>
            </div>
              {/* Mobile Number and Reminder Section */}
              <div className="mt-6 p-6 bg-gray-800 border mb-9 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-50">Set Reminder with Mobile Number</h2>
                <div className="space-y-4 mt-4">
                    {/* Mobile Number Input */}
                    <div>
                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-50">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="p-2 border rounded-md w-full mt-2"
                            placeholder="Enter mobile number"
                        />
                    </div>

                    {/* Reminder Time */}
                    <div className="flex items-center text-white space-x-4 mt-4">
                        For Every
                        <input
                            type="number"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                            className="p-2 border ml-4 text-black rounded-md w-20 text-center"
                            placeholder="Time"
                        />
                        <span className="text-gray-50">Minutes</span>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleReminderSubmit}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        Set Reminder
                    </button>
                </div>
            </div>

            {showAlert && (
                <div className={`mt-6 mb-8 h-18 p-4 rounded-md text-white ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {alertMessage}
                </div>
            )}


            {/* Search Bar */}
            <div className="mb-6 flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search your activities..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-3 mr-4 border rounded-l-md w-full sm:w-2/3"
                />
                <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
                    <SearchIcon className="w-5  h-5 inline" />
                </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex justify-center space-x-4">
                {['All', 'Workout', 'Study', 'Meeting'].map((filter) => (
                    <button
                        key={filter}
                        className={`px-4 py-2 rounded-md ${selectedFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Location Tracker */}
            <div className="bg-gray-800 p-6 border mb-6 rounded-lg shadow-lg flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600">Your Current Location</h2>
                    {isLocationLoading ? (
                        <p className="text-xl text-blue-600">Click on the location Icon</p>
                    ) : (
                        <p className="text-xl text-yellow-600">{currentLocation || 'Location not available'}</p>
                    )}
                </div>
                <button
                    onClick={getCurrentLocation}
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    <LocationMarkerIcon className="w-8 h-8" />
                </button>
            </div>

            {/* Location History */}
            <div className="bg-gray-800 border p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-gray-50">Location History</h2>
                <div className="space-y-4 text-white mt-4">
                    {locationHistory.length === 0 ? (
                        <p className="text-center text-gray-50">No location data available</p>
                    ) : (
                        locationHistory.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b pb-2">
                                <p className="text-gray-60">{item.location}</p>
                                <span className="text-sm text-gray-50">{item.time}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Activity List */}
            <div className="space-y-4">
                {filteredActivities.length === 0 ? (
                    <p className="text-center text-gray-50">No activities found</p>
                ) : (
                    filteredActivities.map((activity) => (
                        <div key={activity.id} className="p-4 bg-gray-800 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-50">{activity.type}</h3>
                                <span className="text-sm text-gray-50">{activity.date}</span>
                            </div>
                            <p className="mt-2 text-gray-50">{activity.description}</p>
                            <button className="mt-4 text-blue-600 hover:underline">View Details</button>
                        </div>
                    ))
                )}
            </div>

          
            {/* Deactivate Number */}
            <div className="mt-6 p-4 bg-gray-800 border rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-50">Deactivate Number</h2>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handleDeactivateNumber}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Deactivate
                    </button>
                    {isNumberDeactivated && <p className="text-lg text-green-600">Your number has been deactivated successfully!</p>}
                </div>
            </div>

            {/* Alert */}
            {showAlert && (
                <div className={`mt-6 p-4 rounded-md text-white ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {alertMessage}
                </div>
            )}
        </div>
        </div>
    );
};

export default EnhancedActivityPage;
