import axios from "axios";
import {
  LoginSuperAdminData,
  LoginResponseSuperAdmin,
  DashboardMetrics,
  ChartData,
  Activity,
  ActivitiesResponse,
  AddSchoolDataResponse,
  SchoolArray,
  GetSchoolsResponse,
} from "@/types/types";
import { useAuthStore } from "@/store/authStore";
import { SchoolData, AddSchoolPayload } from "@/utils/validation";

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
    return response.data.metrics as DashboardMetrics;
  } catch (error) {
    console.error(error);
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
    return response.data.ChartData as ChartData[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch chart data");
  }
};

export const getRecentActivities = async (): Promise<Activity[]> => {
  try {
    const response = await api.get<ActivitiesResponse>(
      "/super-admin/dashboard/recent-activities"
    );

    if (response.status !== 200 || !response.data.success) {
      throw new Error("Failed to fetch recent activities");
    }
    console.log("Recent Activities Response:", response.data);
    return response.data?.activities || [];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch recent activities");
  }
};

export const addSchool = async (
  schoolData: AddSchoolPayload
): Promise<AddSchoolDataResponse> => {
  try {
    // Create FormData
    const formData = new FormData();

    formData.append("schoolName", schoolData.schoolName);
    formData.append("subdomain", schoolData.subdomain);
    formData.append("schoolEmail", schoolData.schoolEmail);
    formData.append("address", schoolData.address);
    formData.append("adminName", schoolData.adminName);
    formData.append("adminEmail", schoolData.adminEmail);
    formData.append("adminPassword", schoolData.adminPassword);

    if (schoolData.logo) {
      formData.append("logo", schoolData.logo);
    }

    const response = await api.post("/super-admin/create-school", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to add new school");
    }
    return response.data as AddSchoolDataResponse;
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data;

      if (
        error.response.status === 400 &&
        responseData.message === "Validation failed"
      ) {
        throw responseData;
      }

      const message =
        responseData?.message || error.message || "An unknown error occurred.";
      throw new Error(message);
    }
    throw new Error("A network or unexpected error occurred.");
  }
};

export const getSchools = async (): Promise<SchoolArray[]> => {
  try {
    const response = await api.get<GetSchoolsResponse>("/super-admin/schools");

    if (response.status !== 200 || !response.data.success) {
      throw new Error("Failed to fetch schools");
    }

    return response.data.schools || [];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch schools");
  }
};

export const toggleSchoolStatus = async (
  schoolId: number,
  isActive: boolean
): Promise<{ success: boolean; message: string; school: SchoolArray }> => {
  const response = await api.patch(`/super-admin/schools/${schoolId}/status`, {
    isActive,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to toggle school status");
  }

  return response.data;
};

export const deleteSchool = async (
  schoolId: number
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/super-admin/schools/${schoolId}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete school");
  }

  return response.data;
};

export default api;
