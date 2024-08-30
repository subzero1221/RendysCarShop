"use client";

import toast from "react-hot-toast";
import { buyVip } from "../_utils/stripe";
import { useRouter } from "next/navigation";

function BuyVipButton({ carId }) {
  const router = useRouter();
  async function handlePurchase() {
    const res = await buyVip(carId);
    if (res.session) {
      router.push(`${res.session.url}`);
    } else if (res.error) {
      toast.error("Something went wrong, try again later!");
    }
  }

  return (
    <div>
      <button
        onClick={handlePurchase}
        className="px-2 py-1 ml-1 text-xs font-semibold text-white bg-orange-400 rounded-full hover:bg-orange-600"
      >
        BUY VIP
      </button>
    </div>
  );
}

export default BuyVipButton;
