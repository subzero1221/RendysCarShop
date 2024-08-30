"use client";
import { isLoggedIn } from "../_utils/userActions";

function Test() {
  async function handleClick() {
    const res1 = await isLoggedIn();
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen text-red-600 ">
      TEST
      <button
        className="text-2xl text-green-600 text-bold"
        onClick={handleClick}
      >
        Click Me!
      </button>
    </div>
  );
}

export default Test;
