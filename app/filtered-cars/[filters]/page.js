import FiltredCarList from "@/app/_components/FiltredCarList";
import { getFiltredCars } from "@/app/_utils/carActions";
import { cleanQueryString } from "@/app/_utils/helper";

async function Page({ params }) {
  const query = params.filters;
  const cleanQuery = cleanQueryString(query);
  const cars = await getFiltredCars(cleanQuery);

 
  return (
    <div>
      <FiltredCarList cars={cars} />
    </div>
  );
}

export default Page;
