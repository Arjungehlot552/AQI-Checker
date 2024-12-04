import React, { useState, useEffect } from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

export default function AQIMeter() {
  const [aqiValue, setAqiValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Dynamically generate a random AQI value between 0 and 500
      const newAqiValue = Math.floor(Math.random() * 501);
      setAqiValue(newAqiValue);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        AQI Meter
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <GaugeContainer
          width={300}
          height={300}
          startAngle={-110}
          endAngle={110}
          value={aqiValue}
        >
          <GaugeReferenceArc />
          <GaugeValueArc />
          <GaugePointer />
        </GaugeContainer>
        <div className="mt-4 text-center">
          <p className="text-lg font-medium text-gray-600">AQI Value:</p>
          <p className="text-3xl font-bold text-gray-800">{aqiValue}</p>
        </div>
      </div>
    </div>
  );
}
