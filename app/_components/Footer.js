import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-6 text-white bg-neutral-500">
    <div className="container mx-auto text-center">
      <p className="text-lg font-semibold">RendysCars</p>
      <p className="mt-2 text-sm">
        &copy; {new Date().getFullYear()} RendysCars. All rights
        reserved.
      </p>
      <div className="flex justify-center mt-4 space-x-6">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
          <FaTwitter size={24} />
        </a>
        <a href="mailto:info@rendyscarsforrent.com" className="text-white hover:text-red-400">
          <FaEnvelope size={24} />
        </a>
      </div>
      <div className="mt-4">
        <p className="text-sm">Contact Us: +1 (800) 123-4567</p>
      </div>
    </div>
  </footer>
  );
}
