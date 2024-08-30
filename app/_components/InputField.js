import { useState } from "react";

function InputField({
  name,
  label,
  type = "text",
  icon,
  className = "",
  carData,
  handleChange,
  min,
  max,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-300 ${
          isFocused || carData[name]
            ? "-top-2.5 text-xs text-indigo-600 bg-white px-1"
            : "top-2.5 text-sm text-gray-500"
        }`}
      >
        {icon && <span className="inline-block mr-1">{icon}</span>}
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        min={min || ""}
        max={max || ""}
        value={carData[name]}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        required
      />
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-300 ${
          isFocused ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500"></span>
        </div>
      )}
    </div>
  );
}

export default InputField;
