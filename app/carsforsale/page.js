import AllCars from "../_components/AllCarsPage";

export const metadata = {
  title: "Rendys Cars / Currently avialable cars",
};

async function CarsForSale() {
  return (
    <div>
      <AllCars />
    </div>
  );
}

export default CarsForSale;
