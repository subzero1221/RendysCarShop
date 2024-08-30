"use client";
import { useState } from "react";

import { SiGodotengine } from "react-icons/si";

const CarEngine = ({ onChange, filters, setFilters }) => {
  // Define your specific values
  const predefinedValues = [1, 2, 3, 4, 5];
  const min = predefinedValues[0];
  const max = predefinedValues[predefinedValues.length - 1];

  // State to store the value
  const [value, setValue] = useState(min);

  // Map the slider position to the predefined values
  const handleChange = (event) => {
    const sliderValue = parseFloat(event.target.value);
    const nearestValue = predefinedValues.reduce((prev, curr) =>
      Math.abs(curr - sliderValue) < Math.abs(prev - sliderValue) ? curr : prev
    );
    setValue(nearestValue);
    setFilters((nearestValue) => ({
      ...filters,
      engine: event.target.value,
    }));
    if (onChange) {
      onChange(nearestValue);
    }
  };

  return (
    <div className="relative w-full h-32 mt-4">
      <h1 className="flex mb-4 text-lg font-semibold ml-72 text-slate-500">
        <span className="mr-1 text-2xl">
          {" "}
          <SiGodotengine />
        </span>{" "}
        Car Engine
      </h1>
      <input
        type="range"
        min={min}
        max={max}
        step={(max - min) / (predefinedValues.length - 1)} // Adjust step to match predefined values
        value={value}
        onChange={handleChange}
        className="w-full h-2 mr-2 bg-gray-300 rounded appearance-none"
        style={{
          background: `linear-gradient(to right, #3b82f6 ${
            (predefinedValues.indexOf(value) / (predefinedValues.length - 1)) *
            100
          }%, #e5e7eb ${
            (predefinedValues.indexOf(value) / (predefinedValues.length - 1)) *
            100
          }%)`,
        }}
      />

      {/* Display Value */}
      <div className="mt-8 mr-2 text-center text-gray-700">
        Value: {value} - {value + 1}
      </div>
    </div>
  );
};

export default CarEngine;
