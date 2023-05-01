import axios from "axios";
import { BASE_API } from "../../utils/Constants";
import store from "../../store";

//add your BASE_URL to Constants file
export const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle request process
axiosInstance.interceptors.request.use((request) => {
  const Auth = store.getState().Auth;

  if (Auth && Auth.jwt) {
    const { token: jwt } = Auth.jwt;
    request.headers.Authorization = `Bearer ${jwt}`;
  }
  return request;
});

// Handle response process
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
