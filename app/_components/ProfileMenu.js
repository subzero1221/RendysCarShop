"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "../_utils/userActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiUser, FiTag, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function ProfileMenu({ user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleWannaSell() {
    router.push(`/am-selling/${user._id}`);
    setIsOpen(false);
  }

  async function handleLogOut() {
    const res = await logout();
    if (res.msg) {
      toast.success(res.msg);
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } else if (res.error) {
      toast.error(res.error);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 space-x-3 transition-all duration-300 bg-white rounded-full shadow-md hover:shadow-lg"
      >
        <Image
          src={
            user.photo === "userdefault.png"
              ? `/${user?.photo}`
              : `https://drive.google.com/uc?export=view&id=${user?.photo}`
          }
          alt={user.name}
          width={40}
          height={40}
          className="border-2 border-green-300 rounded-full"
        />
        <span className="hidden font-medium text-gray-700 md:inline">
          {user?.name}
        </span>
        <FiChevronDown
          className={`text-gray-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 overflow-hidden transition-all duration-300 ease-out origin-top-right transform bg-white border border-gray-100 rounded-lg shadow-xl">
          <Link
            href={`/profile/${user._id}`}
            className="flex items-center px-4 py-3 text-gray-700 transition-colors duration-300 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <FiUser className="mr-3 text-green-500" />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleWannaSell}
            className="flex items-center w-full px-4 py-3 text-left text-gray-700 transition-colors duration-300 hover:bg-gray-50"
          >
            <FiTag className="mr-3 text-blue-500" />
            <span>Wanna sell</span>
          </button>
          <button
            className="flex items-center w-full px-4 py-3 text-left text-gray-700 transition-colors duration-300 hover:bg-gray-50"
            onClick={handleLogOut}
          >
            <FiLogOut className="mr-3 text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
