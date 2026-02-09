import {
  keepPreviousData,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import {
  loginSuperAdmin,
  getMetrics,
  getChartData,
  getRecentActivities,
  addSchool,
  getSchools,
  toggleSchoolStatus,
  deleteSchool,
  getUserMetrics,
  getAllUsers,
  toggleUserStatus,
} from "@/services/api/super-admin/super-admin";
import { useAuthStore } from "@/store/authStore";
import { sanitizeText, sanitizeEmail } from "@/utils/sanitize";
import { GetSchoolsResponse } from "@/types/types";
import { getRedirectPath, clearRedirectPath } from "@/store/authStore";

interface ValidationError {
  msg: string;
  param: string;
  location: string;
}

interface ErrorResponse {
  message: string;
  details?: ValidationError[];
}

export const useSuperAdminLogin = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  return useMutation({
    mutationFn: loginSuperAdmin,
    onSuccess: async (data) => {
      login({
        id: data.admin.id,
        email: sanitizeEmail(data.admin.email),
        role: data.admin.role as "SUPER_ADMIN" | "ADMIN" | "STUDENT",
        name: sanitizeText(data.adminName),
      });

      toast.success(`Welcome Back ${data.adminName}`, { duration: 5000 });
      // CRITICAL: Wait for cookies to be set
      await new Promise((resolve) => setTimeout(resolve, 100));

      const redirectPath = getRedirectPath();
      if (redirectPath && redirectPath !== "/super-admin/login") {
        clearRedirectPath();
        navigate(redirectPath);
      } else {
        navigate("/super-admin/dashboard");
      }
    },
    onError: (error: any) => {
      // console.error("Login error:", error);

      if (error.response?.status === 400) {
        const data: ErrorResponse = error.response.data;

        // Show validation errors
        if (data.details && data.details.length > 0) {
          // Display each validation error
          data.details.forEach((err) => {
            toast.error(`${err.param}: ${err.msg}`, { duration: 5000 });
          });
        } else {
          toast.error(data.message || "Validation failed", { duration: 5000 });
        }
        return;
      }

      // Check if it's authentication error (401)
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
        return;
      }

      // Check if it's authorization error (403)
      if (error.response?.status === 403) {
        toast.error("Access denied. Super Admin only.");
        return;
      }

      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage, { duration: 5000 });
    },
  });
};

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: getMetrics,
  });
};

export const useGetChartData = () => {
  return useQuery({
    queryKey: ["dashboard", "charts"],
    queryFn: getChartData,
  });
};

export const useRecentActivities = () => {
  return useQuery({
    queryKey: ["dashboard", "recent-activities"],
    queryFn: getRecentActivities,
  });
};

export const useAddSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSchool,
    onSuccess: (data) => {
      toast.success(`School ${data.school.name} added successfully`, {
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to add new school. Please try again.";
      toast.error(errorMessage, { duration: 5000 });
    },
  });
};

export const useGetSchools = (
  search: string = "",
  status: string = "all",
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["schools", search, status, page, limit],
    queryFn: () => getSchools(search, status, page, limit),
    staleTime: 30000, // 30 seconds
    placeholderData: keepPreviousData,
  });
};

export const useToggleSchoolStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      schoolId,
      isActive,
    }: {
      schoolId: number;
      isActive: boolean;
    }) => {
      return toggleSchoolStatus(schoolId, isActive);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update school status");
    },
  });
};

export const useDeleteSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schoolId: number) => {
      return deleteSchool(schoolId);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete school");
    },
  });
};

export const useUserMetrics = () => {
  return useQuery({
    queryKey: ["users", "metrics"],
    queryFn: getUserMetrics,
  });
};

export const useGetAllUsers = (
  search: string,
  role: string,
  page: number,
  pageSize: number,
) => {
  return useQuery({
    queryKey: ["users", search, role, page, pageSize],
    queryFn: () => getAllUsers(search, role, page, pageSize),
    staleTime: 30000, // 30 seconds
  });
};

export const useToggleUser = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      isActive,
    }: {
      userId: number;
      isActive: boolean;
    }) => {
      return toggleUserStatus(userId, isActive);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      QueryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
