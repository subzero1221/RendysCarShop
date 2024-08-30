import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { SiTransmission } from "react-icons/si";
import { GiSteeringWheel } from "react-icons/gi";
import CarCategory from "./CarCategory";

const AdditionalFilters = ({ filters, setFilters, onClose }) => {
  const [selected, setSelected] = useState("left");
  const [transmission, setTransmission] = useState("");

  function handleColor(e) {
    setFilters((filters) => ({
      ...filters,
      color: e.target.value,
    }));
  }

  const handleSteeringWheelChange = (event) => {
    setSelected(event.target.value);
    setFilters((filter) => ({
      ...filter,
      steeringWheel: event.target.value,
    }));
  };

  const handleTransmissionChange = (event) => {
    setTransmission(event.target.value);
    setFilters((filter) => ({
      ...filter,
      transmission: event.target.value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((filters) => ({
      ...filters,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: !prevFilters[name], // Toggle the checkbox state
    }));
  };

  const colors = [
    { name: "Red", colorCode: "#FF0000" },
    { name: "Blue", colorCode: "#0000FF" },
    { name: "Green", colorCode: "#00FF00" },
    { name: "Yellow", colorCode: "#ffff00" },
    { name: "Black", colorCode: "#000000" },
    { name: "Silver", colorCode: "#e1e3eb" },
  ];

  return (
    <div className="text-white">
      <h2 className="mb-6 text-2xl font-semibold text-orange-300">
        Additional Filters
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid grid-cols-3 gap-0 mb-4">
          {colors.map((color) => (
            <label key={color.name} className="flex items-center mb-2">
              <input
                type="radio"
                name="color"
                value={color.name}
                className="mr-2"
                onClick={(e) => handleColor(e)}
              />
              <span className="flex items-center text-slate-500">
                <span
                  className="w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: color.colorCode }}
                ></span>
                {color.name}
              </span>
            </label>
          ))}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Mileage (Run - km) 🏃
          </label>
          <input
            type="number"
            name="run"
            min={0}
            value={filters.run}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <CarCategory filters={filters} setFilters={setFilters} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Engine ⚙️</label>
          <input
            type="text"
            name="engine"
            value={filters.engine}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Steering Wheel 🎡
          </label>
          <select
            name="steeringWheel"
            value={filters.steeringWheel}
            onChange={handleSteeringWheelChange}
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Transmission 🔗
          </label>
          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleTransmissionChange}
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="turbo"
            checked={filters.turbo}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
          />
          <label className="ml-2 text-sm">Turbo</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="conditioner"
            checked={filters.conditioner}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
          />
          <label className="ml-2 text-sm">Air Conditioner</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="parkingControl"
            checked={filters.parkingControl}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
          />
          <label className="ml-2 text-sm">Parking Control</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="navigation"
            checked={filters.navigation}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
          />
          <label className="ml-2 text-sm">Navigation</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="airBags"
            checked={filters.airBags}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
          />
          <label className="ml-2 text-sm">Air Bags</label>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={onClose}
          className="flex items-center px-6 py-2 text-white transition-colors duration-200 bg-orange-500 rounded-md hover:bg-orange-600"
        >
          <FiCheck className="mr-2" />
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default AdditionalFilters;
