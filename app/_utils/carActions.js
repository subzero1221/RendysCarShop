"use server";

import axios from "axios";

export async function getCars(page) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/cars/getCars?page=${page}&limit=9`;
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.transformedCars;
    } else {
      console.error("Error: Response status not OK", res.status);
    }
  } catch (err) {
    console.error("Error fetching cars:", err.message || err);
  }
}

export async function getCar(id) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/cars/getCar/${id}`;
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.car;
    } else {
      console.error("Error: Response status not OK", res.status);
    }
  } catch (err) {
    console.error("Error fetching cars:", err.message || err);
  }
}

export async function getFiltredCars(urlComplete) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/getFiltredCars?${urlComplete}`;

  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.filteredCars; // Ensure this is the array of filtered cars
    } else {
      console.error("Error: Response status not OK", res.status);
      return [];
    }
  } catch (error) {
    console.error("Error occurred during Axios request:", error);
    return [];
  }
}

export async function getMySales(id) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/cars/getMySales/${id}`;

  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.mySales; // Ensure this is the array of filtered cars
    } else {
      console.error("Error: Response status not OK", res.status);
      return [];
    }
  } catch (error) {
    console.error("Error occurred during Axios request:", error.response);
    return {
      error: error.response || "Unexcpeted Error, try later again!",
    };
  }
}

export async function createCar({ formData, plainCarData }) {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/cars/createCar`;

  try {
    Object.keys(plainCarData).forEach((key) => {
      formData.append(key, plainCarData[key]);
    });
    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 201) {
 
      return { newCar: res.data.car };
    }
  } catch (error) {
    return {
      error: error.response?.data || "Unexpected Error, try later again!",
    };
  }
}

export async function getVipCars() {
  const url = `https://rendyscarshopexpress.onrender.com/api/v1/cars/vipCars`;

  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.vipCars;
    }
  } catch (error) {
    return {
      error: error.response?.data || "Unexcpeted Error, try again later!",
    };
  }
}
