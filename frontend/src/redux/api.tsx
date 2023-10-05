import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      error.code = "UNAUTHORIZED";
    } else {
      console.error("Erro inesperado:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
