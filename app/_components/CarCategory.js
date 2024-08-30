import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const categories = [
  { id: 1, label: "sedan" },
  { id: 2, label: "jeep" },
  { id: 3, label: "van" },
  { id: 4, label: "mini-van" },
];

export default function CarCategory({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
    setFilters((filters) => ({
      ...filters,
      category: item.label,
    }));
    setIsOpen(false);
  };

  return (
    <div className="relative w-48" ref={dropdownRef}>
      <button
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        {selectedItem ? selectedItem.label : "Choose Category"}
        <FiChevronDown className="absolute right-4 top-3" />
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          role="listbox"
        >
          {categories.map((category) => (
            <li
              key={category.id}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 text-slate-500 ${
                selectedItem && selectedItem.id === category.id
                  ? "bg-blue-200"
                  : ""
              }`}
              onClick={() => handleItemClick(category)}
              role="option"
              aria-selected={selectedItem && selectedItem.id === category.id}
            >
              {category.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
