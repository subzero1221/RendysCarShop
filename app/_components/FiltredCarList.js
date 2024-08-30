"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiTruck,
  FiSettings,
  FiDroplet,
} from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { LuFerrisWheel } from "react-icons/lu";

function FiltredCarList({ cars }) {
  const [carsFor, setCarsFor] = useState(cars);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    setCarsFor(cars);
  }, [cars]);

  function handleFilter(filter) {
    setActiveFilter(filter);
    if (filter === "all") {
      setCarsFor(cars);
    } else {
      setCarsFor(cars.filter((car) => car.for === filter));
    }
  }

  return (
    <div className="container max-w-6xl min-h-screen px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Available Cars
        </h1>
        <div className="flex space-x-4">
          <button
            className={`px-6 py-2 rounded-full transition-colors duration-200 ${
              activeFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleFilter("all")}
          >
            All ({cars.length})
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-colors duration-200 ${
              activeFilter === "sale"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleFilter("sale")}
          >
            For Sale
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-colors duration-200 ${
              activeFilter === "rental"
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleFilter("rental")}
          >
            For Rent
          </button>
        </div>
      </div>

      {carsFor.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {carsFor.map((car) => (
            <div
              key={car._id}
              className="overflow-hidden transition-transform duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={`https://drive.google.com/uc?export=view&id=${car.photos[0]}`}
                  alt={car.model}
                  layout="fill"
                  objectFit="cover"
                />
                {car.vip && (
                  <span className="absolute px-2 py-1 text-xs font-bold text-gray-800 bg-yellow-400 rounded-full top-2 left-2">
                    VIP
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold text-gray-800">
                  {car.manufacturer} {car.model}
                </h2>
                <div className="flex items-center mb-2 text-gray-600">
                  <FiCalendar className="mr-2" />
                  <span>{car.year}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiSettings className="mr-2" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <LuFerrisWheel className="mr-2" />
                    <span>{car.steeringWheel}</span>
                  </div>
                  <div className="flex items-center">
                    <FiDroplet className="mr-2" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRunning className="mr-2" />
                    <span>{car.run}km</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center font-semibold text-green-600">
                    <FiDollarSign className="mr-1" />
                    <span>{car.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-1" />
                    <span>{car.location}</span>
                  </div>
                </div>
                <Link
                  href={`/car-details/${car._id}`}
                  className="block w-full px-4 py-2 text-center text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-xl text-gray-600">No cars found</p>
        </div>
      )}
    </div>
  );
}

export default FiltredCarList;
