import Image from "next/image";
import { getMySales } from "@/app/_utils/carActions";
import CreateCarListing from "@/app/_components/CreateCar";
import Link from "next/link";
import BuyVipButton from "@/app/_components/BuyVipButton";

export const metadata = {
  title: "Rendys Cars / My Sales",
  description: "fklfd",
};

async function CarForSale({ params }) {
  const { userId } = params;
  const cars = await getMySales(userId);

  return (
    <div className="container min-h-screen p-6 mx-auto bg-gray-100 mt-9">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        My Cars
      </h1>

      {cars.length > 0 ? (
        <div className="space-y-4">
          {cars.map((car) => (
            <div
              key={car._id}
              className="flex h-40 overflow-hidden transition-transform duration-300 bg-white border rounded-lg shadow-md hover:scale-101"
            >
              <div className="relative flex-shrink-0 w-48 h-full">
                <Image
                  src={`https://drive.google.com/uc?export=view&id=${
                    car.photos[0].split("/d/")[1].split("/")[0]
                  }`}
                  alt={`${car.manufacturer} ${car.model}`}
                  layout="fill"
                  objectFit="cover"
                />
                {car.vip && (
                  <span className="absolute px-2 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full top-2 left-2">
                    VIP
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-between flex-grow p-4">
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-800">
                    {car.manufacturer} {car.model} ({car.year})
                  </h2>
                  <div className="grid grid-cols-3 text-sm gap-x-4 gap-y-1">
                    <p>
                      <span className="font-semibold">Price:</span> ${car.price}
                    </p>
                    <p>
                      <span className="font-semibold">Fuel:</span>{" "}
                      {car.fuelType}
                    </p>
                    <p>
                      <span className="font-semibold">Color:</span> {car.color}
                    </p>
                    <p>
                      <span className="font-semibold">Engine:</span>{" "}
                      {car.engine}L
                    </p>
                    <p>
                      <span className="font-semibold">Mileage:</span> {car.run}
                      km
                    </p>
                    <p>
                      <span className="font-semibold">Trans:</span>{" "}
                      {car.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                    {car.steeringWheel}-hand drive
                  </span>
                  {car.shipping ? (
                    <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                      Shipping Available
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                      Shipping Needed
                    </span>
                  )}
                  <Link
                    href={`/car-details/${car._id}`}
                    className="px-2 py-1 ml-8 text-xs font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600"
                  >
                    Check details
                  </Link>
                  {!car.vip ? <BuyVipButton carId={car._id} /> : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-600">
            You have no cars listed for sale at the moment.
          </p>
        </div>
      )}
      <CreateCarListing userId={userId} />
    </div>
  );
}

export default CarForSale;
