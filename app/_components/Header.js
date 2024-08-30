"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

export default function Header({ userData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/offers", label: "Offers" },
    { href: "/carsforsale", label: "Cars for sale" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/rendy.jpg"
              width={50}
              height={50}
              className="rounded-full"
              alt="CarRent Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-red-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / Profile Menu */}
          <div className="hidden md:block">
            {userData?.name ? (
              <ProfileMenu user={userData} />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-red-500"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-300 rounded-md hover:text-red-500 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {!userData?.name && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-300 rounded-md hover:text-red-500 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 ml-4 text-base font-medium text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
