import { getCar } from "../../_utils/carActions";
import dynamic from "next/dynamic";
import CarPhotos from "@/app/_components/CarPhotos";
import Image from "next/image";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiTruck,
  FiDroplet,
  FiSettings,
  FiActivity,
} from "react-icons/fi";
import { IoIosColorPalette } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import FeatureItem from "../../_components/FeatureItem";
import SpecItem from "../../_components/SpecItem";

const CarMap = dynamic(() => import("../../_components/CarMap"), {
  ssr: false,
});

async function CarDetails({ params }) {
  const car = await getCar(params.carId);

  return (
    <div className="container p-6 mx-auto mt-8 mb-8 shadow-xl bg-gray-50 rounded-xl">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Photos Section */}
        <div className="relative overflow-hidden shadow-lg rounded-xl">
          <CarPhotos car={car} />
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-4xl font-bold text-gray-800">
                  {car.manufacturer} {car.model}
                </h1>
                <p className="text-2xl font-semibold text-indigo-600">
                  ${car.price}
                </p>
                <div className="flex items-center mt-2 text-gray-600">
                  <FiMapPin className="mr-2" />
                  <span>{car.location}</span>
                </div>
              </div>
              <div className="flex items-center p-4 space-x-4 bg-gray-100 rounded-lg">
                <Image
                  src={
                    car.userId.photo === "userdefault.png"
                      ? `/${car.userId?.photo}`
                      : `https://drive.google.com/uc?export=view&id=${car.userId?.photo}`
                  }
                  alt={`${car.userId.name}'s photo`}
                  width={60}
                  height={60}
                  className="border-2 border-indigo-500 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {car.userId.name}
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <FiMail className="mr-1" /> {car.userId.email}
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <FiPhone className="mr-1" /> {car.contact}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Car Specifications */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Car Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <SpecItem
                icon={<FiTruck className="text-indigo-500" />}
                label="Vehicle Type"
                value={car.vehicleType}
              />
              <SpecItem
                icon={<FiDroplet className="text-indigo-500" />}
                label="Fuel Type"
                value={car.fuelType}
              />
              <SpecItem
                icon={<FiSettings className="text-indigo-500" />}
                label="Engine"
                value={`${car.engine} L`}
              />
              <SpecItem
                icon={<FiActivity className="text-indigo-500" />}
                label="Transmission"
                value={car.transmission}
              />
              <SpecItem
                icon={<FiCalendar className="text-indigo-500" />}
                label="Year"
                value={car.year}
              />
              <SpecItem
                icon={<FiTruck className="text-indigo-500" />}
                label="Run"
                value={`${car.run} km`}
              />
              <SpecItem
                icon={<IoIosColorPalette className="text-indigo-500" />}
                label="Color"
                value={`${car.color}`}
              />
              <div className="flex items-center p-3 text-indigo-500 bg-white rounded-lg shadow-sm">
                {<FaShippingFast />}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Shipping</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {car.shippid ? "✔️" : "❌"}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* More Details */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Features
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <FeatureItem feature="Turbo" value={car.turbo} />
              <FeatureItem
                feature="Air Conditioning"
                value={car.condintioner}
              />
              <FeatureItem
                feature="Parking Control"
                value={car.parkingControl}
              />
              <FeatureItem feature="Air Bags" value={car.airBags} />
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="p-4 mt-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Location</h2>
        <div className="w-full overflow-hidden rounded-lg h-96">
          <CarMap carLocated={car.carLocated} />
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
