import axios from "axios";
import { LoginSuperAdminData, LoginResponseSuperAdmin } from "@/types/types";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:2000/tlearn";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect for login endpoint errors
    if (error.config.url.includes("/login")) {
      return Promise.reject(error);
    }

    // Only redirect for authenticated requests with expired tokens
    if (error.response?.status === 401 && error.config.headers.Authorization) {
      useAuthStore.getState().logout();
      window.location.href = "/super-admin/login";
    }
    return Promise.reject(error);
  }
);

export const loginSuperAdmin = async (
  credentials: LoginSuperAdminData
): Promise<LoginResponseSuperAdmin> => {
  try {
    const response = await api.post("/super-admin/login", credentials);
    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed");
    }
    return {
      success: response.data.success,
      message: response.data.message,
      token: response.data.token,
      admin: {
        id: response.data.admin.id,
        email: response.data.admin.email,
        role: response.data.admin.role,
      },
      adminName: response.data.adminName,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
};

export default api;
