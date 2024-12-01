import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';
import NGO from './../Images/swiper1.png';

const NGOs = () => {
  // Sample data for NGOs and plant sources
  const ngoList = [
    {
      name: 'Green Earth NGO',
      description: 'Promoting environmental awareness and tree plantation drives.',
      contact: '+91 1234567890',
      location: 'Bhopal, Madhya Pradesh',
      image: 'https://img.freepik.com/premium-photo/environment-tree-love_87720-296257.jpg'
    },
    {
      name: 'Eco Warriors',
      description: 'Dedicated to protecting natural habitats and planting native species.',
      contact: '+91 9876543210',
      location: 'Indore, Madhya Pradesh',
      image: 'https://t4.ftcdn.net/jpg/09/03/27/63/360_F_903276395_VKvI9jdBxwy3c1DvOefiU7QQQTXDLg7C.jpg'
    },
    {
      name: 'Plant Nursery',
      description: 'Provides a variety of plants and gardening advice.',
      contact: '+91 1122334455',
      location: 'Jabalpur, Madhya Pradesh',
      image: 'https://img.freepik.com/premium-photo/ai-generator-image-vegetable-nursery-seedlings-plant-seedlings-various-types-water-control_660230-197726.jpg'
    }
  ];

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className='flex flex-col p-10 rounded-md text-white'>
      <h1 className='text-4xl font-bold text-center mb-8 text-green-700'>NGOs & Plant Sources</h1>
      <p className='text-center text-lg text-white mb-12'>
        Find contact details and locations of NGOs promoting environmental conservation and places where you can get plants.
      </p>

      <div className='flex  flex-wrap justify-center gap-5'>
        {ngoList.map((ngo, index) => (
          <div key={index} className='flex flex-col w-full md:w-1/4 p-6 rounded-lg border border-green-200 shadow-md'>
            <img className='h-44 w-full object-cover rounded-md mb-4' src={ngo.image} alt={`${ngo.name} image`} />
            <h2 className='text-2xl font-bold text-green-700 mb-2'>{ngo.name}</h2>
            <p className='text-white mb-4'>{ngo.description}</p>
            <div className='flex items-center text-green-600 mb-2'>
              <FaPhoneAlt className='mr-2' /> <span>{ngo.contact}</span>
            </div>
            <div className='flex items-center text-green-600'>
              <FaMapMarkerAlt className='mr-2' /> <span>{ngo.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOs;
