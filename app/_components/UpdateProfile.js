"use client";
import { useState } from "react";
import { updateProfile } from "../_utils/userActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UpdatePassword from "./UpdatePassword";

export default function UpdateProfile({ user }) {
  const router = useRouter();
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [photo, setPhoto] = useState(undefined);

  async function handlePhotoUpload() {
    const res = await updateProfile(undefined, undefined, photo, user._id);
    if (res.message) {
      toast.success("Photo updated succesfully");
      setPhoto((photo) => (photo = undefined));
      router.refresh("/");
    } else if (res.error) {
      toast.error(res.error?.message);
    }
  }

  async function hanldeUpdateName(e) {
    if (!name) {
      toast.error("Enter name you want to set");
      return null;
    }
    const res = await updateProfile(name, undefined, undefined, user._id);
    if (res.message) {
      toast.success("Username updated succesfully");
      router.refresh("/");
    } else if (res.error) {
      toast.error(res.error?.message);
    }
  }

  async function hanldeUpdateEmail(e) {
    if (!email) {
      toast.error("Enter email you want to set");
      return null;
    }
    const res = await updateProfile(undefined, email, undefined, user._id);
    if (res.message) {
      toast.success("Username updated succesfully");
      router.refresh("/");
    } else if (res.error) {
      toast.error(res.error?.message);
    }
  }

  return (
    <div className="p-4 mt-16 rounded-lg shadow-md bg-gray-50">
      <h3 className="mb-4 text-xl font-bold">Update Profile</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter new name"
          name="name"
          onChange={(e) => setName((n) => (n = e.target.value))}
        />
        <button
          className="w-full px-4 py-2 mt-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
          onClick={hanldeUpdateName}
        >
          Update Name
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter new email"
          onChange={(e) => setEmail((em) => (em = e.target.value))}
        />
        <button
          className="w-full px-4 py-2 mt-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
          onClick={hanldeUpdateEmail}
        >
          Update Email
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Profile Photo
        </label>
        <div className="flex items-center">
          <label
            htmlFor="profilePhoto"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none"
          >
            {photo ? photo.name : "Upload Photo"}
          </label>
          <input
            id="profilePhoto"
            type="file"
            className="hidden"
            onChange={(e) => setPhoto((photo) => (photo = e.target.files[0]))}
          />
          <button
            onClick={handlePhotoUpload}
            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none"
          >
            Change photo
          </button>
          <button
            onClick={() => setPhoto((photo) => (photo = undefined))}
            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600 focus:outline-none"
          >
            Discard
          </button>
        </div>
      </div>

      <button
        className="w-full px-4 py-2 mb-4 text-white transition bg-gray-500 rounded hover:bg-gray-600"
        onClick={() => setIsPasswordResetOpen(!isPasswordResetOpen)}
      >
        {isPasswordResetOpen ? "Close Password Reset" : "Open Password Reset"}
      </button>

      {isPasswordResetOpen && <UpdatePassword />}
    </div>
  );
}
