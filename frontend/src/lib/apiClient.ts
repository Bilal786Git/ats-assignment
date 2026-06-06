import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("ats_auth");
    if (session) {
      const { state } = JSON.parse(session);
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("ats_auth");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
