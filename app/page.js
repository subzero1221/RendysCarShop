import FilterForm from "./_components/FilterForm";
import VipCarCarousel from "./_components/VipCarousel";

export const metadata = {
  title: {
    template: "%s ",
    default: "Welcome / Rendys Cars",
  },
};

export default function Home() {
  return (
    <main className="text-white bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-20 space-y-12">
        <div className="max-w-4xl space-y-6 text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl animate-fade-in-down">
            Search for your dream car on Rendyscars
          </h1>
          <p className="text-xl md:text-2xl animate-fade-in-up">
            Find the perfect car for your next adventure
          </p>
        </div>

        <div className="w-full max-w-5xl mb-64 animate-fade-in-up">
          <h2 className="mb-6 text-2xl font-semibold text-center text-orange-300">
            Use search tools
          </h2>
          <FilterForm />
        </div>

        <div className="w-full mt-64 max-w-7xl animate-fade-in">
          <VipCarCarousel />
        </div>
      </div>
    </main>
  );
}
