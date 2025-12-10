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
  GetUserMetricsResponse,
  GetAllUsersResponse,
} from "@/types/types";
import { useAuthStore } from "@/store/authStore";
import { SchoolData, AddSchoolPayload } from "@/utils/validation";
import { Toast } from "@/components/ui/toast";
import { toast } from "sonner";

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
      toast.error("Session espired. Please login again", { duration: 5000 });
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

export const getSchools = async (
  search?: string,
  status?: string,
  page: number = 1,
  limit: number = 10
): Promise<GetSchoolsResponse> => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status && status !== "all") params.append("status", status);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const response = await api.get(`/super-admin/schools?${params.toString()}`);
    if (response.status !== 200 || !response.data.success) {
      throw new Error("Failed to fetch schools");
    }

    return response.data;
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

// ======== USER APIS =========

export const getUserMetrics = async (): Promise<GetUserMetricsResponse> => {
  try {
    const response = await api.get("/super-admin/users/metrics");
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Error getting the user metrics"
      );
    }
    return response.data as GetUserMetricsResponse;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch user metrics"
    );
  }
};

export const getAllUsers = async (
  search?: string,
  role?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<GetAllUsersResponse> => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (role && role !== "all") params.append("role", role);
    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());

    const response = await api.get(`/super-admin/users?${params.toString()}`);
    if (!response?.data.success) {
      throw new Error(response?.data?.message || "Error getting all users");
    }
    return response?.data as GetAllUsersResponse;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch all users"
    );
  }
};

export const toggleUserStatus = async (
  userId: number,
  isActive: boolean
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.patch(`/super-admin/users/${userId}/status`, {
      isActive,
    });
    if (!response.data.success) {
      throw new Error(response?.data?.message || "Failed to update user");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || error?.message || "Failed to update user"
    );
  }
};

export default api;
