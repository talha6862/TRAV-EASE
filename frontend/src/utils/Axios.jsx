import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8001",
  withCredentials: true,
  timeout: 15000,
});

export default api;
