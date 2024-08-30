"use client";
import { useState } from "react";
import AllCarsRenderer from "./AllCarsRenderer";

export default function AllCars() {
  const [page, setPage] = useState(1);
  const [controller, setController] = useState(true);

  
  function handlePrev() {
    if (page !== 0) setPage((p) => p - 1);
  }

  return (
    <div className="container px-4 py-8 mx-auto">
    <AllCarsRenderer page={page} setPage={setPage} setController={setController} />

    {controller && (
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          className="flex items-center justify-center text-xl font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded-full w-14 h-14 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          onClick={handlePrev}
        >
          👈
        </button>
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {page}
        </div>
        <button
          className="flex items-center justify-center text-xl font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded-full w-14 h-14 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          onClick={() => setPage((p) => p + 1)}
        >
          👉
        </button>
      </div>
    )}
  </div>
  );
}
