import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function SelectField({
  name,
  label,
  options,
  className = "",
  carData,
  icon,
  handleChange,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <label
        className={`absolute left-2 transition-all duration-300 ${
          isFocused || carData[name]
            ? "-top-2 text-xs text-indigo-600 bg-white px-1"
            : "top-3 text-sm text-gray-500"
        }`}
      >
        {icon ? icon + label : label}
      </label>
      <select
        name={name}
        value={carData[name]}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        required
      >
        <option value="" disabled hidden></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <FiChevronDown className="w-4 h-4 text-gray-400" />
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-indigo-600 transform origin-left transition-transform duration-300 ${
          isFocused ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
    </div>
  );
}

export default SelectField;
