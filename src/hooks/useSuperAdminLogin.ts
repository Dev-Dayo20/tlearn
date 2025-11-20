import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import {
  loginSuperAdmin,
  getMetrics,
  getChartData,
  getRecentActivities,
} from "@/services/api/super-admin/super-admin";
import { useAuthStore } from "@/store/authStore";
import { sanitizeText, sanitizeEmail } from "@/utils/sanitize";

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
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginSuperAdmin,
    onSuccess: (data) => {
      if (data.token) {
        login(data.token, {
          id: data.admin.id,
          email: sanitizeEmail(data.admin.email),
          role: data.admin.role as "SUPER_ADMIN" | "ADMIN" | "STUDENT",
          name: sanitizeText(data.adminName),
        });
      }
      toast.success(`Welcome Back ${data.adminName}`, { duration: 5000 });
      navigate("/super-admin/dashboard");
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
      // if (error.response?.status === 401) {
      //   toast.error("Invalid email or password");
      //   return;
      // }

      // Check if it's authorization error (403)
      // if (error.response?.status === 403) {
      //   toast.error("Access denied. Super Admin only.");
      //   return;
      // }

      const errorMessage =
        error.response?.data?.message ||
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
    queryKey: ["dashboard", "activities"],
    queryFn: getChartData,
  });
};

export const useRecentActivities = () => {
  return useQuery({
    queryKey: ["dashboard", "activities"],
    queryFn: getRecentActivities,
  });
};
