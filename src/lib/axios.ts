import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ usa el backend que pongas en el .env
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Error API:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
