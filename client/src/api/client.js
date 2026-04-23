import axios from "axios";
import { clearAuthStorage, getStoredToken } from "../utils/authStorage";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error?.response?.status;
    const message = error?.response?.data?.message || "";

    if (
      statusCode === 401 &&
      typeof window !== "undefined" &&
      (message.toLowerCase().includes("token") || message.toLowerCase().includes("authorized"))
    ) {
      clearAuthStorage();
      window.dispatchEvent(new Event("auth:logout"));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
