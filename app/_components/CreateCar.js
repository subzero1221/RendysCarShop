"use client";
import { useState } from "react";
import {
  FiCamera,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiTruck,
  FiInfo,
  FiPhone,
  FiWind,
} from "react-icons/fi";
import InputField from "./InputField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckBoxField";
import { useRouter } from "next/navigation";
import { createCar } from "../_utils/carActions";
import toast from "react-hot-toast";

const carManufacturers = [
  "Mercedes-Benz",
  "Tesla",
  "Toyota",
  "Porsche",
  "BMW",
  "Volkswagen",
  "Honda",
  "Hyundai",
  "Ford",
  "Audi",
  "BYD",
  "Nissan",
  "Volvo",
  "Ferrari",
  "Chevrolet",
  "Kia",
  "Lexus",
  "Subaru",
  "Renault",
  "GMC",
  "Cadillac",
  "Jeep",
  "BUICK",
  "Suzuki",
  "Traton",
  "Lamborghini",
  "Range Rover",
  "Scania",
  "Yamaha",
  "Haval",
];

function CreateCarListing({ userId }) {
  const router = useRouter();
  const initialCar = {
    userId,
    vehicleType: "vehicle",
    manufacturer: "",
    model: "",
    location: "",
    price: "",
    vip: false,
    shipping: false,
    fuelType: "",
    year: "",
    color: "",
    run: "",
    category: "",
    engine: "",
    steeringWheel: "",
    transmission: "",
    turbo: false,
    description: "",
    photos: [],
    condintioner: false,
    parkingControl: false,
    airBags: false,
    for: "sale",
    contact: "",
  };
  const [carData, setCarData] = useState(initialCar);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setCarData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ...files],
    }));
  };

  function handleClear() {
    setCarData((car) => (car = initialCar));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for photos
    const formData = new FormData();
    carData.photos.forEach((photo, index) => {
      formData.append(`photos`, photo);
    });

    // Prepare plain object for other car data
    const plainCarData = {
      userId,
      vehicleType: carData.vehicleType,
      manufacturer: carData.manufacturer,
      model: carData.model.trim(), // Trim spaces
      location: carData.location,
      price: carData.price,
      airBags: carData.airBags,
      category: carData.category,
      color: carData.color,
      condintioner: carData.condintioner,
      contact: carData.contact,
      description: carData.description,
      engine: carData.engine,
      for: carData.for,
      fuelType: carData.fuelType,
      parkingControl: carData.parkingControl,
      run: carData.run,
      shipping: carData.shipping,
      steeringWheel: carData.steeringWheel,
      transmission: carData.transmission,
      turbo: carData.turbo,
      vip: carData.vip,
      year: carData.year,
    };

    if (Number(plainCarData.year) < 1995 || Number(plainCarData.year) > 2025) {
      toast.error("Year must be between 1995 and 2025");
      return null;
    }

    if (plainCarData.contact.length > 11 || plainCarData.contact.length < 9) {
      toast.error(
        "Please provide real Number with 9-11 ints example(555223355)"
      );
      return null;
    }

    const res = await createCar({ formData, plainCarData });

    if (res.newCar) {
      toast.success("You car is created");
      router.refresh(`/`);
    } else if (res.error) {
      toast.error(res.error.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-900">
          Wanna Sell?
        </h1>
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden bg-white rounded-lg shadow-2xl"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center mb-5 space-x-3 text-lg text-semibold">
              <label className="text-orange-500 text-semibold">Rent</label>
              <input
                type="radio"
                value="rental"
                name="for"
                checked={carData.for === "rental"}
                onChange={(e) =>
                  setCarData((prevData) => ({
                    ...prevData,
                    for: prevData.for === e.target.value ? "" : e.target.value, // Toggle logic
                  }))
                }
              />

              <label className="text-green-500 text-semibold">Sell</label>
              <input
                type="radio"
                value="sale"
                name="for"
                checked={carData.for === "sale"}
                onChange={(e) =>
                  setCarData((prevData) => ({
                    ...prevData,
                    for: prevData.for === e.target.value ? "" : e.target.value, // Toggle logic
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <SelectField
                name="manufacturer"
                label="Manufacturer"
                icon="✇"
                options={carManufacturers}
                carData={carData}
                handleChange={handleChange}
              />
              <InputField
                name="model"
                label="Model"
                icon="🚗"
                handleChange={handleChange}
                carData={carData}
              />
              <InputField
                name="location"
                label="Location"
                icon={<FiMapPin />}
                carData={carData}
                handleChange={handleChange}
              />
              <InputField
                name="price"
                label="Price"
                type="number"
                icon={<FiDollarSign />}
                carData={carData}
                handleChange={handleChange}
                min={"0"}
              />
              <SelectField
                name="fuelType"
                label="Fuel Type"
                options={["Gasoline", "Diesel", "Electric", "Hybrid"]}
                carData={carData}
                handleChange={handleChange}
                icon="⛽"
              />
              <InputField
                name="year"
                label="Year (min 1995)"
                type="number"
                icon={<FiCalendar />}
                carData={carData}
                handleChange={handleChange}
                min={"1995"}
                max={"2025"}
              />
              <SelectField
                name="color"
                label="color"
                options={[
                  "red 🔴",
                  "green 🟢",
                  "yellow 🟡",
                  "orange 🟠",
                  "silver 💿",
                  "white ⚪",
                  "gold 📀",
                  "black ⚫",
                ]}
                carData={carData}
                handleChange={handleChange}
                icon="🌈"
              />
              <InputField
                name="run"
                label="Mileage (km)"
                type="number"
                carData={carData}
                handleChange={handleChange}
                min={"0"}
              />
              <SelectField
                name="category"
                label="Category"
                options={["sedan", "van", "minivan", "jeep"]}
                carData={carData}
                handleChange={handleChange}
              />
              <InputField
                name="engine"
                label="Engine Size (L)"
                carData={carData}
                handleChange={handleChange}
              />
              <SelectField
                name="steeringWheel"
                label="Steering Wheel"
                options={["Left", "Right"]}
                carData={carData}
                handleChange={handleChange}
                icon="🎡"
              />
              <SelectField
                name="transmission"
                label="Transmission"
                options={["Automatic", "Manual"]}
                carData={carData}
                handleChange={handleChange}
              />
              <InputField
                name="contact"
                label="Contact Number"
                icon={<FiPhone />}
                className="sm:col-span-2"
                carData={carData}
                handleChange={handleChange}
              />
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  <FiInfo className="inline-block mr-1" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={carData.description}
                  onChange={handleChange}
                  rows="4"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Features
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <CheckboxField
                    name="shipping"
                    label="Shipping Available"
                    icon={<FiTruck />}
                    carData={carData}
                    handleChange={handleChange}
                  />
                  <CheckboxField
                    name="turbo"
                    label="Turbo"
                    carData={carData}
                    handleChange={handleChange}
                  />
                  <CheckboxField
                    name="condintioner"
                    label="Air Conditioning"
                    icon={<FiWind />}
                    carData={carData}
                    handleChange={handleChange}
                  />
                  <CheckboxField
                    name="parkingControl"
                    label="Parking Control"
                    carData={carData}
                    handleChange={handleChange}
                  />
                  <CheckboxField
                    name="airBags"
                    label="Air Bags"
                    carData={carData}
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Photos (Upload 4)
                </label>
                <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiCamera className="w-12 h-12 mx-auto text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span className="ml-7">Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handlePhotoUpload}
                          multiple
                          accept="image/*"
                          max="4"
                        />
                      </label>
                      <p className="pl-1"></p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG (Max 4 photos)
                    </p>
                  </div>
                </div>
                {carData.photos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {carData.photos.length} of 4 photos selected
                    </p>
                    {carData.photos.length === 4 && (
                      <p className="text-sm font-medium text-green-600">
                        Maximum number of photos reached
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Listing
            </button>
            <button
              onClick={handleClear}
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCarListing;
