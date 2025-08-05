// /src/api/axiosInstance.js
import axios from "axios"; 
import { HandleAxiosError } from "./axioserror";

const axiosInstance = axios.create({
  // baseURL: "https://ajay.yunicare.in/",
 baseURL : process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
 
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    // Store the refresh token in localStorage when a successful response is received
    if (res.data?.data?.accessToken) {
      localStorage.setItem("accessToken", res.data.data.accessToken);
    }
    return res;
  },
  (err) => {
    // Optionally handle errors
    // return Promise.reject(err);
    HandleAxiosError(err)
    return Promise.reject(err);
  }
);



export { axiosInstance };




