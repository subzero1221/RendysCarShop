"use server";
import axios from "axios";
const BASE_URL="https://rendyscarshopexpress-production-9370.up.railway.app"

export async function forgotPassword(email) {
  const url = `${BASE_URL}/api/v1/users/forgotPassword`;
  

  try {
    const res = await axios.post(url, { email });
    if ((res.status = 200)) {
      return { message: "Email sent, Please check you inbox!" };
    }
  } catch (error) {
    
    return {
      error:
        error.response?.data || "Unexcpeted Error! Please try again later.",
    };
  }
}

export async function resetPassword(token, password, passwordConfirm) {
  const url = `${BASE_URL}/api/v1/users/resetPassword/${token}`;
  const data = { password, passwordConfirm };
  try {
    const res = await axios.post(url, data);
    if (res.status === 200) {
      return { message: "Password reseted succesfuly!" };
    }
  } catch (error) {
    return {
      error:
        error.response?.data || "Unexcpeted Error, Please try again later!",
    };
  }
}
