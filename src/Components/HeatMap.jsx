import { useEffect, useState } from "react";

const HeatMap = () => {
  const [map, setMap] = useState(null);
  const [heatmap, setHeatMap] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBRa8otXOqd1muzWVyO2qoCUhtCybcpgpo&libraries=visualization`;
    script.async = true;

    // Append Google Maps script
    document.head.appendChild(script);

    script.onload = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Function to initialize the map
          function initMap() {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Create map instance
            const temMap = new window.google.maps.Map(
              document.getElementById("map"),
              {
                zoom: 15,
                center: { lat: userLat, lng: userLng },
                mapTypeId: "satellite",
              }
            );

            setMap(temMap);

            // Add Heatmap layer
            const temHeatMap =
              new window.google.maps.visualization.HeatmapLayer({
                data: getPoints(),
                map: temMap,
              });
            setHeatMap(temHeatMap);
            const points = getPoints();
            points.forEach((point) => {
              const marker = new window.google.maps.Marker({
                position: point.location,
                map: temMap,
                title: `AQI: ${point.aqi}`,
              });

              // Create an InfoWindow for AQI data
              const infoWindow = new window.google.maps.InfoWindow({
                content: `<div style="padding: 10px; font-size: 14px;">
                            <strong>AQI:</strong> ${point.aqi} (Good)<br />
                            <strong>Location:</strong> ${point.location
                              .lat()
                              .toFixed(6)}, ${point.location.lng().toFixed(6)}
                          </div>`,
              });

              // Show InfoWindow when marker is clicked
              marker.addListener("mouseover", () => {
                infoWindow.open(temMap, marker);
              });
              marker.addListener("mouseout", () => {
                infoWindow.close();
              });
            });
          }

          // Initialize map
          initMap();
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    };

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, []);

  const toggleHeatmap = () => {
    if (heatmap) {
      heatmap.setMap(heatmap.getMap() ? null : map);
    }
  };

  const changeGradient = () => {
    if (heatmap) {
      const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
      ];
      heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
    }
  };

  const changeRadius = () => {
    if (heatmap) {
      heatmap.set("radius", heatmap.get("radius") ? null : 100);
    }
  };

  const changeOpacity = () => {
    if (heatmap) {
      heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
    }
  };

  return (
    <main className="mt-80">
      <div id="floating-panel">
        <button onClick={toggleHeatmap}>Toggle Heatmap</button>
        <button onClick={changeGradient}>Change Gradient</button>
        <button onClick={changeRadius}>Change Radius</button>
        <button onClick={changeOpacity}>Change Opacity</button>
      </div>
      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
        }}
      ></div>
    </main>
  );
};

function getRandomPointsInArea(areaBounds, count) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const lat =
      Math.random() * (areaBounds.maxLat - areaBounds.minLat) +
      areaBounds.minLat;
    const lng =
      Math.random() * (areaBounds.maxLng - areaBounds.minLng) +
      areaBounds.minLng;

    // Generating a random AQI value between 0 and 500
    const aqi = Math.floor(Math.random() * 500);

    points.push({
      location: new window.google.maps.LatLng(lat, lng),
      aqi: aqi, // Adding AQI value
    });
  }
  return points;
}

function getPoints() {
  // Define bounds for Bhopal, Delhi, and Chhattisgarh
  const bhopalBounds = {
    minLat: 23.198,
    maxLat: 23.323, // Approx range of Bhopal
    minLng: 77.289,
    maxLng: 77.502,
  };
  const delhiBounds = {
    minLat: 28.404,
    maxLat: 28.883, // Approx range of Delhi
    minLng: 76.839,
    maxLng: 77.339,
  };
  const chhattisgarhBounds = {
    minLat: 21.098,
    maxLat: 22.098, // Approx range of Chhattisgarh
    minLng: 81.052,
    maxLng: 82.052,
  };

  // Generate points for each region
  const bhopalPoints = getRandomPointsInArea(bhopalBounds, 100);
  const delhiPoints = getRandomPointsInArea(delhiBounds, 100);
  const chhattisgarhPoints = getRandomPointsInArea(chhattisgarhBounds, 100);
  // Combine all points
  return bhopalPoints.concat(delhiPoints).concat(chhattisgarhPoints);
}

export default HeatMap;