"use client";
import axios from "axios";

axios.defaults.withCredentials = true;

export async function buyVip(carId) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/vips/checkout-session/${carId}`;

  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return { session: res.data.session };
    }
  } catch (error) {
    return {
      error: error.response?.data || "Unexcpeted Error, try again later!",
    };
  }
}
