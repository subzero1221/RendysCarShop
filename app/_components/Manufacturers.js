"use client";

const carManufacturers = [
  { id: 1, label: "Mercedes-Benz" },
  { id: 2, label: "Tesla" },
  { id: 3, label: "Toyota" },
  { id: 4, label: "Porsche" },
  { id: 5, label: "BMW" },
  { id: 6, label: "Volkswagen" },
  { id: 7, label: "Honda" },
  { id: 8, label: "Hyundai" },
  { id: 9, label: "Ford" },
  { id: 10, label: "Audi" },
  { id: 11, label: "BYD" },
  { id: 12, label: "Nissan" },
  { id: 13, label: "Volvo" },
  { id: 14, label: "Ferrari" },
  { id: 15, label: "Chevrolet" },
  { id: 16, label: "Kia" },
  { id: 17, label: "Lexus" },
  { id: 18, label: "Subaru" },
  { id: 19, label: "Renault" },
  { id: 20, label: "GMC" },
  { id: 21, label: "Cadillac" },
  { id: 22, label: "Jeep" },
  { id: 23, label: "BUICK" },
  { id: 24, label: "Suzuki" },
  { id: 25, label: "Traton" },
  { id: 26, label: "Lamborghini" },
  { id: 27, label: "Range Rover" },
  { id: 28, label: "Scania" },
  { id: 29, label: "Yamaha" },
  { id: 30, label: "Haval" },
  { id: 31, label: "Mahindra" },
  { id: 32, label: "Acura" },
  { id: 33, label: "Peugeot" },
  { id: 34, label: "Isuzu" },
  { id: 35, label: "Bentley" },
  { id: 36, label: "Geely" },
  { id: 37, label: "Polaris" },
  { id: 38, label: "RAM Trucks" },
  { id: 39, label: "Lincoln" },
  { id: 40, label: "Rolls-Royce" },
  { id: 41, label: "Maruti Suzuki" },
  { id: 42, label: "Bajaj Auto" },
  { id: 43, label: "Skoda" },
  { id: 44, label: "Changan" },
  { id: 45, label: "Mazda" },
  { id: 46, label: "NIO" },
  { id: 47, label: "LI AUTO" },
  { id: 48, label: "Defender" },
  { id: 49, label: "MAN" },
  { id: 50, label: "Kenworth" },
];

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

export default function CustomDropdown({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
    setFilters({ ...filters, manufacturer: item.label });
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = carManufacturers.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-48" ref={dropdownRef}>
      <button
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        {selectedItem ? selectedItem.label : "Manufacturer"}
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
                key={option.id}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 text-slate-500 ${
                  selectedItem && selectedItem.id === option.id
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={(e) => handleItemClick(option)}
                name="manufacturer"
                role="option"
                aria-selected={selectedItem && selectedItem.id === option.id}
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
