import {
  keepPreviousData,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/authStore";
import { loginSchool } from "@/services/api/admin/schLoginApi";
import { sanitizeText, sanitizeEmail } from "@/utils/sanitize";
import { getRedirectPath, clearRedirectPath } from "@/store/authStore";
import { SchoolLoginData } from "@/schema/schLoginSchema";

import { createClass } from "@/services/api/admin/schLoginApi";

export const useSchUsersAuth = (schoolId: number) => {
  const navigate = useNavigate();
  const { user, login } = useAuthStore();

  return useMutation({
    mutationFn: (data: SchoolLoginData) => loginSchool(data, schoolId),
    onSuccess: (data) => {
      if (data.token) {
        login(data.token, {
          id: data.user.id,
          email: sanitizeEmail(data.user.email) || "",
          role: data.user.role as "ADMIN" | "STUDENT" | "TEACHER",
          name: data.user.name,
        });
      }
      toast.success(`Welcome Back, ${data.user.name}!`, { duration: 5000 });

      // Redirect based on role
      const roleRoutes = {
        ADMIN: "/school-admin/dashboard",
        TEACHER: "/teacher/dashboard",
        STUDENT: "/student/dashboard",
      };

      navigate(roleRoutes[data.user.role]);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage, { duration: 5000 });
      console.error("Login error:", error);
    },
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      toast.success("Class created successfully");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create class");
    },
  });
};
