"use client"

import axios from "axios";

axios.defaults.withCredentials = true;

export async function signup(formData) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/users/signup`;
  try {
    const res = await axios.post(url, formData);
    if (res.status === 201) {
      return { user: res.data.user };
    }
  } catch (error) {
    return {
      err: error.response?.data.message || "Unexpected Error! Try again later.",
    };
  }
}

export async function updatePassword(curPassword, password, passwordConfirm) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/users/updatePassword`;
  const data = { curPassword, password, passwordConfirm };
  try {
    const res = await axios.patch(url, data);
    if (res.status === 200) {
      return { message: "Password updated successfuly" };
    }
  } catch (error) {
    return {
      error: error.response.data || "Unxcpected error, try again later!",
    };
  }
}

export async function isLoggedIn() {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/users/isLoggedIn`;
  try {
    const res = await axios.get(url);

    if (res.status === 200) {
      return res.data.user;
    }
  } catch (error) {
    return null;
  }
}

export async function login(formData) {
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  const url = `https://rendyscarshopexpress.onrender.com/api/v1/users/login`;
  try {
    const res = await axios.post(url, formObject);
    if (res.status === 200) {
      return { user: res.data.user };
    }
  } catch (error) {
    return { error: error.response?.data?.message || "Unexpected Error!" };
  }
}

export async function logout() {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/users/logout`;
  try {
    const res = await axios.post(url);
    if (res.status === 200) {
      return { msg: "Logged Out!" };
    }
  } catch (error) {
    return { error: error.response || "Unxcpected Error!" };
  }
}

export async function updateProfile(
  name = undefined,
  email = undefined,
  photo = undefined,
  id
) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/users/updateProfile/${id}`;

  const formData = new FormData();

  if (name) formData.append("name", name);
  if (email) formData.append("email", email);
  if (photo) formData.append("photo", photo);

  try {
    const res = await axios.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      return { message: "User update successful" };
    }
  } catch (error) {
    return {
      error: error.response?.data || "Unexpected Error, try again later!",
    };
  }
}

export async function getUserData(id) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/users/getUserData/${id}`;

  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.user;
    }
  } catch (error) {
    return { error: error.response || "Unxcpected Error!" };
  }
}
