import { create } from "axios";

export const axiosClient = create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // API Key
    // config.headers.Authorization = `Bearer api_key`
    return config;
  },
  (error) => Promise.reject(error),
);
