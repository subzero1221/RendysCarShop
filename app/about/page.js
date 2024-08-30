
export const metadata={
  title : "Rendys cars / About us",
  description: "fdfd"
}


function About() {
  return (
    <div className="px-6 py-12 bg-gray-100 md:px-20 lg:px-40">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Welcome to Rendys Cars!
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          At RendysCars, we make buying and selling cars easier, faster, and
          more secure. Whether you’re looking to purchase your next vehicle or
          sell your current one, our platform offers a seamless experience
          tailored to your needs.
        </p>
        <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800">
          What We Offer:
        </h2>
        <ul className="mb-6 text-gray-700 list-disc list-inside">
          <li>
            <span className="font-semibold">Wide Selection:</span> Discover a
            broad range of vehicles from trusted sellers across the country.
          </li>
          <li>
            <span className="font-semibold">Secure Transactions:</span> Our
            secure payment gateways and user verification processes ensure peace
            of mind for buyers and sellers alike.
          </li>
          <li>
            <span className="font-semibold">User-Friendly Interface:</span>{" "}
            Navigate our website with ease, whether you’re browsing listings,
            posting ads, or managing your account.
          </li>
          <li>
            <span className="font-semibold">Expert Support:</span> Our team of
            automotive experts is here to assist you every step of the way, from
            listing your car to closing the deal.
          </li>
        </ul>
        <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800">
          Our Mission:
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          We aim to revolutionize the automotive marketplace by offering a
          platform that is reliable, transparent, and easy to use. At AutoHub,
          we are passionate about cars and committed to providing the best
          possible experience for our users.
        </p>
        <p className="mt-8 text-lg text-center text-gray-700">
          Thank you for choosing AutoHub – where your next car is just a click
          away!
        </p>
      </div>
    </div>
  );
}

export default About;
