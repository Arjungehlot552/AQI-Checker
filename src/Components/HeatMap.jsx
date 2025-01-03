import { useEffect, useState } from "react";
import { getPoints } from "../constants/point";

const HeatMap = () => {
  const [map, setMap] = useState(null);
  const [heatmap, setHeatMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCY3F-KtFdaneqDx7haChS5V0FgmbXEj60&libraries=visualization`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
    script.onload = initializeMap;

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        console.log(userLat, userLng)

        // Initialize the map
        const tempMap = new window.google.maps.Map(
          document.getElementById("map"),
          {
            zoom: 8,
            center: { lat: userLat, lng: userLng },
            mapTypeId: "hybrid",
            tilt: 45, // Enable 3D tilt (default 45 degrees)
            heading: 90, // Optional: Set map rotation angle
            streetViewControl: false, // Disable street view if not needed
            rotateControl: true, // Enable rotation controls for 3D mode
          }
        );

        // Get points and add them to the map
        const points = getPoints();

        // Optimize marker creation with batching
        const markers = points.map((point) => {
          const marker = new window.google.maps.Marker({
            position: point.location,
            map: tempMap,
            title: `AQI: ${point.aqi}`,
          });

          // Create one reusable InfoWindow
          const infoWindow = new window.google.maps.InfoWindow();

          // Attach event listeners for InfoWindow
          marker.addListener("mouseover", () => {
            infoWindow.setContent(`
              <div style="padding: 10px; font-size: 14px;">
                <strong>AQI:</strong> ${point.aqi} (Good)<br />
                <strong>Location:</strong> ${point.location
                .lat()
                .toFixed(6)}, ${point.location.lng().toFixed(6)}
              </div>
            `);
            infoWindow.open(tempMap, marker);
          });

          marker.addListener("mouseout", () => {
            infoWindow.close();
          });

          return marker;
        });

        // Attach markers to the map (optional step if batching is implemented)
        markers.forEach((marker) => marker.setMap(tempMap));

        // Set the map state
        setMap(tempMap);

        // Initialize heatmap only after setting up markers
        initializeHeatMap(tempMap, points);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  const initializeHeatMap = (mapInstance, points) => {
    const tempHeatMap = new window.google.maps.visualization.HeatmapLayer({
      data: points.map((point) => ({
        location: point.location,
        weight: point.aqi / 500, // Normalize AQI value to a weight between 0 and 1
      })),
      map: mapInstance,
    });

    tempHeatMap.set("radius", 100);
    setHeatMap(tempHeatMap);
  };

  const toggleHeatmap = () => {
    if (heatmap) {
      heatmap.setMap(heatmap.getMap() ? null : map);
    }
  };

  const changeRadius = () => {
    if (heatmap) {
      heatmap.set("radius", heatmap.get("radius") ? null : 50);
    }
  };

  const changeGradient = () => {
    if (heatmap) {
      const gradient = [
        "rgba(0, 255, 0, 0)",
        "rgba(0, 255, 0, 1)",
        "rgba(255, 255, 0, 1)",
        "rgba(255, 165, 0, 1)",
        "rgba(255, 0, 0, 1)",
        "rgba(128, 0, 128, 1)",
        "rgba(128, 0, 0, 1)",
      ];
      heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
    }
  };

  return (
    <main className="bg-[#050816] pt-32 min-h-screen flex flex-col items-center pb-8">
      <div
        id="floating-panel"
        className="flex space-x-2 items-center justify-center mb-4"
      >
        <button
          className="bg-blue-500 text-white px-6 py-4 rounded-lg"
          onClick={toggleHeatmap}
        >
          Toggle Heatmap
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-4 rounded-lg"
          onClick={changeGradient}
        >
          Change Gradient
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-4 rounded-lg"
          onClick={changeRadius}
        >
          Change Radius
        </button>
      </div>
      <div id="map" className="w-[80%] h-[600px] rounded-lg"></div>
    </main>
  );
};

// Random Point Generator Functions

export default HeatMap;
