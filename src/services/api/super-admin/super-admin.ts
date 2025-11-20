import axios from "axios";
import {
  LoginSuperAdminData,
  LoginResponseSuperAdmin,
  DashboardMetrics,
  ChartData,
  Activity,
} from "@/types/types";
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

export const getMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const response = await api.get("/super-admin/dashboard/metrics");
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Error getting the dashboard metrics"
      );
    }
    return {
      success: response.data.success,
      metric: {
        totalSchools: response.data.totalSchools,
        activeSchools: response.data.activeSchools,
        inactiveSchools: response.data.inactiveSchools,
        totalStudents: response.data.totalSchools,
        totalAdmins: response.data.totalAdmins,
        totalVideos: response.data.totalVideos,
        activeSubscriptions: response.data.activeSubscriptions,
        growthRate: response.data.growthRate,
        recentSchools: response.data.recentSchools,
      },
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch dashboard metrics"
    );
  }
};

export const getChartData = async (): Promise<ChartData[]> => {
  try {
    const response = await api.get("/super-admin/dashboard/chart-data");
    if (response.status !== 200) {
      throw new Error("Failed to fetch chart data");
    }
    const data = response.data.json();
    return data.ChartData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch chart data");
  }
};

export const getRecentActivities = async (): Promise<Activity[]> => {
  try {
    const response = await api.get("/super-admin/dashboard/recent-activities");
    if (response.status !== 200) {
      throw new Error("Failed to fetch recent activities");
    }
    const data = response.data.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch recent activities");
  }
};

export default api;
