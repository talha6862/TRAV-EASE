import axios from "axios";

// Single axios instance so every request shares one base URL.
// Set REACT_APP_API_URL in frontend/.env (and in Vercel's env settings).
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8001",
  headers: { "Content-Type": "application/json" },
});

// Attach the stored token, if the app has logged a user in.
instance.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("UserInfo");
    const token = stored ? JSON.parse(stored)?.token : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    /* malformed localStorage shouldn't break the request */
  }
  return config;
});

export default instance;
