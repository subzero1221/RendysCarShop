"use client";

import { useEffect, useRef, useState } from "react";
import Manufacturers from "./Manufacturers";
import FilterLocation from "./FilterLocation";
import FilterFuel from "./FilterFuel";
import YearFrom from "./YearFrom";
import YearTill from "./YearTill";
import Modal from "./Modal";
import AdditionalFilters from "./AdditionalFilters";
import { FiAlignCenter, FiXCircle, FiCheckCircle } from "react-icons/fi";
import { FaMotorcycle, FaCarSide, FaCaravan } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter

const initialFilter = {
  vehicleType: "",
  manufacturer: "",
  model: "",
  location: "",
  fuelType: "",
  yearFrom: "",
  yearTill: "",
  color: "",
  run: "",
  category: "",
  engine: "",
  steeringWheel: "",
  transmission: "",
  turbo: false,
  condintioner: false,
  parkingControl: false,
  navigation: false,
  airBags: false,
};

export default function FilterForm() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const dropdown = dropdownRef.current;
    if (dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight) {
      setVisibleCount((prevCount) =>
        Math.min(prevCount + 4, carManufacturers.length)
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      const dropdown = dropdownRef.current;
      dropdown.addEventListener("scroll", handleScroll);
      return () => {
        dropdown.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isOpen]);

  const [filters, setFilters] = useState({
    vehicleType: "",
    manufacturer: "",
    model: "",
    location: "",
    fuelType: "",
    yearFrom: "",
    yearTill: "",
    color: "",
    run: "",
    category: "",
    engine: "",
    steeringWheel: "",
    transmission: "",
    turbo: false,
    condintioner: false,
    parkingControl: false,
    navigation: false,
    airBags: false,
  });

  let additions = Object.keys(initialFilter).reduce((count, key, i) => {
    if (i > 6 && initialFilter[key] !== filters[key]) {
      return count + 1;
    }
    return count;
  }, 0);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      vehicleType: "",
      manufacturer: "",
      model: "",
      location: "",
      fuelType: "",
      yearFrom: "",
      yearTill: "",
      color: "",
      run: "",
      category: "",
      engine: "",
      steeringWheel: "left",
      transmission: "",
      turbo: false,
      condintioner: false,
      parkingControl: false,
      navigation: false,
      airBags: false,
    });
    router.refresh("/");
  };

  const buildQueryString = (filters) => {
    const sanitizedFilters = {
      vehicleType: filters.vehicleType || "",
      manufacturer: filters.manufacturer || "",
      model: filters.model.replace(/\s/g, "") || "",
      location: filters.location || "",
      fuelType: filters.fuelType || "",
      yearFrom: filters.yearFrom || "",
      yearTill: filters.yearTill || "",
      color: filters.color || "",
      run: filters.run || "",
      category: filters.category || "",
      engine: filters.engine || "",
      steeringWheel: filters.steeringWheel || "",
      transmission: filters.transmission || "",
      turbo: filters.turbo || false,
      conditioner: filters.condintioner || false,
      parkingControl: filters.parkingControl || false,
      navigation: filters.navigation || false,
      airBags: filters.airBags || false,
    };

    return new URLSearchParams(sanitizedFilters).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryString = buildQueryString(filters);
    router.push(`/filtered-cars/${queryString}`);
  };

  const handleAdditionalFiltersClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap w-full p-6 mx-auto bg-white rounded shadow-md"
    >
      <div className="mr-12 text-2xl text-orange-500 mt-14 text-semibold">
        <FaCarSide />
      </div>
      <div className="h-32 mr-6 border bg-slate-400 border-slate-300"></div>

      <div className="flex flex-col ml-12">
        <div className="flex">
          <Manufacturers filters={filters} setFilters={setFilters} />
          <div className="ml-10">
            <input
              type="text"
              name="model"
              className="border rounded-md h-11 border-slate-300 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.model || "    Model"} // Use value instead of defaultValue
              onChange={handleChange}
            />
          </div>
          <div className="ml-10">
            <FilterLocation filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="flex mt-2 space-x-4">
          <FilterFuel filters={filters} setFilters={setFilters} />
          <div className="flex space-x-4">
            <div className="ml-6">
              <YearFrom filters={filters} setFilters={setFilters} />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="ml-6">
              <YearTill
                filters={filters}
                setFilters={setFilters}
                fromYear={filters.yearFrom || 2023}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            type="button"
            className="flex px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={clearFilters}
          >
            Clear Filters
            <span className="mt-1 ml-2">
              <FiXCircle />
            </span>
          </button>
          <button
            type="submit"
            className="flex px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
            <span className="mt-1 ml-2">
              <FiCheckCircle />
            </span>
          </button>
          <button
            type="button"
            className="flex px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            onClick={handleAdditionalFiltersClick}
          >
            Additional Filters {`(${additions})`}
            <span className="mt-1 ml-2">
              <FiAlignCenter />
            </span>
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AdditionalFilters
          onClose={closeModal}
          filters={filters}
          setFilters={setFilters}
        />
      </Modal>
    </form>
  );
}
