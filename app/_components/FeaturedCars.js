import Image from "next/image";
import Link from "next/link";
import { getCars } from "../_utils/carActions";

async function FeaturedCars() {
  const cars = await getCars();
  if (cars.length > 9) {
    cars.slice(0, 9);
  }

  return (
    <section className="py-16">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
          Featured Cars
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars?.length > 0 &&
            cars.map((car) => (
              <div
                key={car._id}
                className="overflow-hidden bg-white rounded-lg shadow-md"
              >
                <Image
                  src={`https://drive.google.com/uc?export=view&id=${
                    car.photos[0].split("/d/")[1].split("/")[0]
                  }`}
                  alt={car.manufacturer}
                  width={300}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="p-4 border-t-2">
                  <div className="flex justify-between mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">
                        {car.manufacturer} {car.model}
                      </h3>
                      <p className="text-gray-600">Year: {car.year}</p>
                      <p className="text-gray-600">Price: {car.price}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-lg font-semibold text-gray-600">
                        Price: ${car.price}
                      </p>
                      <p
                        className={
                          car.for === "sale"
                            ? `mt-2 text-green-600 text-bold text-lg`
                            : `mt-2 text-orange-400 text-bold text-lg`
                        }
                      >
                        {car.for ? "for SALE" : "Rental"}
                      </p>
                    </div>
                  </div>
                  <p className={`mb-2 text-gray-600`}>
                    shipping:{" "}
                    <span
                      className={
                        car.insurance === "true"
                          ? `text-green-500`
                          : "text-red-500"
                      }
                    >
                      {car.shipping ? "✅" : "❌"}
                    </span>
                  </p>
                  <Link
                    href={`/car-details/${car._id}`}
                    className="inline-block px-4 py-1 mt-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCars;
