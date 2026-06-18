import axios from "axios";

export const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gurukul_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("gurukul_token");
      localStorage.removeItem("gurukul_user");
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);
