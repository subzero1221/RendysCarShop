"use server";
import axios from "axios";

export async function forgotPassword(email) {
  const url = `http://localhost:8000/api/v1/users/forgotPassword`;
  

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
  const url = `http://localhost:8000/api/v1/users/resetPassword/${token}`;
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
