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
import { CreateStudentType } from "@/schema/createStudentSchema";

import {
  createClass,
  fetchClasses,
  getClasses,
} from "@/services/api/admin/schLoginApi";
import { createStudent } from "@/services/api/admin/schLoginApi";

export const useSchUsersAuth = (schoolId: number) => {
  const navigate = useNavigate();
  const { user, login } = useAuthStore();

  return useMutation({
    mutationFn: (data: SchoolLoginData) => loginSchool(data, schoolId),
    onSuccess: (data) => {
      if (data.accessToken) {
        login(data.accessToken, {
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
        error.response?.data?.error ||
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
      toast.error(error.response?.data?.error || "Failed to create class");
    },
  });
};

export const useGetClasses = (
  search?: string,
  page: number = 1,
  pageSize: number = 10,
  isActive?: boolean,
) => {
  return useQuery({
    queryKey: ["classes", search, page, pageSize, isActive],
    queryFn: () => fetchClasses(search, page, pageSize, isActive),
  });
};

export const useFetchClassesList = () => {
  return useQuery({
    queryKey: ["classesList"],
    queryFn: getClasses,
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStudentType) => {
      // Convert date to ISO-8601 DateTime if provided
      const processedData = {
        ...data,
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString()
          : null,
        profilePicture: data.profilePicture || null,
      };
      return createStudent(processedData);
    },
    onSuccess: () => {
      toast.success("Student registered successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to register student";
      toast.error(errorMessage);
    },
  });
};
