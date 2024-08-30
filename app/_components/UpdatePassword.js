"use client";

import { useState } from "react";
import { updatePassword } from "../_utils/userActions";
import toast from "react-hot-toast";

function UpdatePassword() {
  const [curPassword, setCurPassword] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState(undefined);

  async function handlePasswordUpdate() {
    const res = await updatePassword(curPassword, password, passwordConfirm);
    if (res.message) {
      toast.success(res.message);
    } else if (res.error) {
      toast.error(res.error.message);
    }
  }

  return (
    <div className="p-4 bg-gray-50">
      <div className="p-4 mt-2 bg-gray-100">
        <h3 className="mb-4 text-lg font-semibold">Update Password</h3>
        <input
          type="password"
          placeholder="Enter current password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setCurPassword((cur) => (cur = e.target.value))}
        />
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword((p) => (p = e.target.value))}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPasswordConfirm((cp) => (cp = e.target.value))}
        />
        <button
          className="w-full px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
          onClick={handlePasswordUpdate}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default UpdatePassword;
