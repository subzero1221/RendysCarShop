import Image from "next/image";
import Link from "next/link";
import { getVipCars } from "../_utils/carActions";

export default async function VipCarCarousel() {
  const vipCars = await getVipCars();

  return (
    <div className="w-full py-4 overflow-hidden bg-gray-800 bg-opacity-50">
      <div className="flex animate-carousel">
        {vipCars.concat(vipCars).map((car, index) => (
          <Link
            href={`/car-details/${car._id}`}
            key={index}
            className="flex-shrink-0 w-64 mx-2"
          >
            <div className="overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:scale-105">
              <div className="relative h-40">
                <Image
                  src={`https://drive.google.com/uc?export=view&id=${
                    car.photos[0].split("/d/")[1].split("/")[0]
                  }`}
                  alt={`${car.manufacturer} ${car.model}`}
                  layout="fill"
                  objectFit="cover"
                />
                <span className="absolute px-2 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full top-2 left-2">
                  VIP
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {car.manufacturer} {car.model}
                </h3>
                <p className="text-sm text-gray-600">
                  {car.year} • {car.run} km
                </p>
                <p className="mt-2 text-lg font-bold text-blue-600">
                  ${car.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
