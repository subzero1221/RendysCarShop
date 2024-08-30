"use client";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const carManufacturers = [];

for (let year = 1995; year <= 2025; year++) {
  carManufacturers.push({ label: year.toString(), value: year });
}

export default function YearTill({ filters, setFilters, fromYear }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setFilters((filter) => ({
      ...filter,
      yearTill: item.value,
    }));
    setIsOpen(false);
    setHoveredItem(null); // Reset hovered item after selection
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter options based on the selected "From" year
  const filteredOptions = carManufacturers
    .filter((option) => option.value > fromYear)
    .filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="relative w-48" ref={dropdownRef}>
      <button
        className="relative w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <span
          className={`absolute inset-0 flex items-center justify-center text-gray-200 text-2xl font-bold pointer-events-none transition-opacity duration-200 ${
            selectedItem || hoveredItem ? "opacity-100" : "opacity-0"
          }`}
        >
          {hoveredItem || selectedItem ? "till" : ""}
        </span>
        {selectedItem ? selectedItem.label : "till"}
        <FiChevronDown className="absolute right-4 top-3" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2">
            <div className="relative">
              <FiSearch className="absolute text-slate-600 left-3 top-3" />
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-500"
                placeholder="Search options..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <ul
            className="py-1 overflow-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            role="listbox"
          >
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 text-slate-500 ${
                  selectedItem && selectedItem.value === option.value
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => handleItemClick(option)}
                onMouseEnter={() => setHoveredItem(option)} // Update hovered item
                onMouseLeave={() => setHoveredItem(null)} // Clear hovered item when not hovering
                role="option"
                aria-selected={
                  selectedItem && selectedItem.value === option.value
                }
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
