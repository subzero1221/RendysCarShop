"use client";
import Image from "next/image";
import Link from "next/link";
import { getCars } from "../_utils/carActions";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function AllCarsRenderer({ page, setPage, setController }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    function getCarsData() {
      async function getData() {
        setLoading(true);
        const carsData = await getCars(page);
        setCars(carsData);
        setController((c) => !c);
        setLoading(false);
      }
      getData();
    },
    [page, setController]
  );

  function handleBack() {
    setPage((p) => p - 1);
    setController((c) => true);
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          {" "}
          <Spinner />{" "}
        </div>
      ) : cars && cars.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Link href={`/car-details/${car._id}`} key={car._id}>
              <div className="overflow-hidden transition-transform duration-300 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
                <div className="relative h-48 md:h-64">
                  <Image
                    src={`https://drive.google.com/uc?export=view&id=${
                      car.photos[0].split("/d/")[1].split("/")[0]
                    }`}
                    alt={`${car.manufacturer} ${car.model}`}
                    style={{ objectFit: "cover" }}
                    fill
                    className="rounded-t-lg"
                  />
                  {car.vip && (
                    <span className="absolute px-2 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full top-2 left-2">
                      VIP
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {car.manufacturer} {car.model}
                    </h2>
                    <p className="text-lg font-bold text-green-600">
                      {car.price}
                    </p>
                  </div>
                  <div className="flex items-center mb-2 text-gray-600">
                    <span>{car.location}</span>
                  </div>
                  <div className="flex items-center mb-4 text-gray-600">
                    <span>{car.year}</span>
                  </div>
                  <p className="mb-4 text-gray-600 line-clamp-2">
                    {car.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-full">
                      {car.fuelType}
                    </span>
                    <span className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-full">
                      {car.transmission}
                    </span>
                    <span className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-full">
                      {car.run} km
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[90vh] space-y-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            No more cars currently
          </h1>
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-16 h-16 text-xl font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
