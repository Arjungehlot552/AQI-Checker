import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MonitorMap = () => {
  const mapRef = useRef(null);
  const markers = useRef({});
  const socket = useRef(null);

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map('map').setView([0, 0], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap',
    }).addTo(mapRef.current);

    // Connect to the server
    socket.current = io('http://localhost:3005');

    // Handle receiving location updates
    socket.current.on('receive-location', (data) => {
      const { id, latitude, longitude } = data;

      if (!markers.current[id]) {
        // Add a new marker for this user
        markers.current[id] = L.marker([latitude, longitude]).addTo(mapRef.current);
        mapRef.current.setView([latitude, longitude]); // Center the map on the first location
      } else {
        // Update the marker's position
        markers.current[id].setLatLng([latitude, longitude]);
      }
    });

    // Handle user disconnection
    socket.current.on('user-disconnected', (id) => {
      if (markers.current[id]) {
        mapRef.current.removeLayer(markers.current[id]);
        delete markers.current[id];
      }
    });

    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    // Request and send the user's location
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.current.emit('send-location', { latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup the watcher on unmount
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return <div id="map" className='pt-20' style={{ width: '100%', height: '50vh'  }} />;
};

export default MonitorMap;
