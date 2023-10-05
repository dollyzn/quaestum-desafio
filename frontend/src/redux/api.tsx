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
    switch (error.response.status) {
      case 401:
        error.code = "UNAUTHORIZED";
        break;

      default:
        console.error("Erro inesperado:", error);
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
