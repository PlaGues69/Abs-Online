import axios from "axios";

const BASE_API = import.meta.env?.VITE_API_BASE_URL ?? "http://localhost:5050/api/";

const apiClient = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
