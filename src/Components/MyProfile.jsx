import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        age: '',
        contactNumber: '',
        email: '',
        address: '',
        profilePhoto: '',
        additionalInfo: '',
    });

    useEffect(() => {
        // Fetch user data from backend when the component mounts
        axios.get('http://localhost:5000/user')
            .then((response) => {
                if (response.data) {
                    setUserData(response.data);
                }
            })
            .catch((error) => console.error('Error fetching user data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserData({ ...userData, profilePhoto: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        axios.post('http://localhost:5000/user', userData)
            .then(() => alert('User data saved successfully!'))
            .catch((error) => console.error('Error saving user data:', error));
    };

    const handleReset = () => {
        setUserData({
            name: '',
            surname: '',
            age: '',
            contactNumber: '',
            email: '',
            address: '',
            profilePhoto: '',
            additionalInfo: '',
        });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            axios.delete('http://localhost:5000/user')
                .then(() => {
                    setUserData({
                        name: '',
                        surname: '',
                        age: '',
                        contactNumber: '',
                        email: '',
                        address: '',
                        profilePhoto: '',
                        additionalInfo: '',
                    });
                    alert('Profile deleted.');
                })
                .catch((error) => console.error('Error deleting user data:', error));
        }
    };

    return (
        <div  style={{ backgroundColor: "rgb(5, 8, 22)" }} className='p-20'>

        
        <div  className="max-w-3xl mx-auto p-10 bg-gray-900 border  rounded-lg shadow-lg mt-20">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">My Profile</h2>
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center mb-6">
                <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-6">
                    <img
                        src={userData.profilePhoto || 'https://via.placeholder.com/100'}
                        alt="profile-picture"
                        className="w-24 h-24 rounded-full bg-white object-cover border mb-2"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="mt-2 text-xs text-blue-800 text-center"
                    />
                </div>
                <div className="w-full sm:w-2/3 space-y-4 text-center sm:text-left">
                    <input
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded border"
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={userData.surname}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded border"
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={userData.age}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded border"
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={userData.contactNumber}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded border"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded border"
                    />
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={userData.address}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded border"
                        rows="2"
                    />
                    <textarea
                        name="additionalInfo"
                        placeholder="Additional Information (optional)"
                        value={userData.additionalInfo}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded border"
                        rows="2"
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-between mt-6">
                <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded w-full sm:w-auto mb-2 sm:mb-0"
                >
                    Save
                </button>
                <button
                    onClick={handleReset}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded w-full sm:w-auto mb-2 sm:mb-0"
                >
                    Reset
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded w-full sm:w-auto"
                >
                    Delete Profile
                </button>
            </div>
        </div>
        </div>
    );
};

export default MyProfile;