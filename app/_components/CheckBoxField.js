import { useState } from "react";

function CheckboxField({ name, label, icon, carData, handleChange }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center p-2 transition-all duration-300 rounded-lg hover:bg-indigo-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={carData[name]}
        onChange={handleChange}
        className="absolute w-0 h-0 opacity-0"
      />
      <label
        htmlFor={name}
        className="flex items-center text-gray-700 transition-colors duration-300 cursor-pointer hover:text-indigo-600"
      >
        <span
          className={`
          flex items-center justify-center w-5 h-5 mr-3 border-2 rounded
          ${
            carData[name]
              ? "bg-indigo-600 border-indigo-600"
              : "border-gray-300 hover:border-indigo-400"
          }
          transition-all duration-300
        `}
        >
          {carData[name] && (
            <svg
              className="w-3 h-3 text-white fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </span>
        {icon && (
          <span
            className={`mr-2 transition-colors duration-300 ${
              isHovered ? "text-indigo-600" : "text-gray-500"
            }`}
          >
            {icon}
          </span>
        )}
        <span className="text-sm font-medium">{label}</span>
      </label>
      {isHovered && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-300 scale-x-100"></span>
      )}
    </div>
  );
}

export default CheckboxField;
