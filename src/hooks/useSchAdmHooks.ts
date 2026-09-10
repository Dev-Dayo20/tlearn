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
import {
  CreateStudentType,
  UpdateStudentInput,
} from "@/schema/createStudentSchema";
import { TeacherAssignmentData, TeachersResponse } from "@/types/types";

import {
  createClass,
  fetchClasses,
  getClasses,
  createStudent,
  fetchTeachers,
  createTeacher,
  updateTeacher,
  assignTeacher,
  updateStudent,
  deleteStudent,
  fetchSubjects,
  fetchAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  fetchTeacherById,
} from "@/services/api/admin/schLoginApi";
import { SubjectType } from "@/schema/SubjectSchema";

export const useSchUsersAuth = (schoolId: number) => {
  const navigate = useNavigate();
  const { user, login } = useAuthStore();

  return useMutation({
    mutationFn: (data: SchoolLoginData) => loginSchool(data, schoolId),
    onSuccess: (data) => {
      login({
        id: data.user.id,
        email: sanitizeEmail(data.user.email) || "",
        role: data.user.role as "ADMIN" | "STUDENT" | "TEACHER",
        name: data.user.name,
        profilePicture: data.user.profilePicture || null,
        registrationNumber: data.user.registrationNumber || data.user.regNumber,
        regNumber: data.user.regNumber || data.user.registrationNumber,
        studentId: data.user.studentId || data.user.registrationNumber || data.user.regNumber || data.user.id,
        class: data.user.class || data.user.className,
        className: data.user.className || (typeof data.user.class === "object" ? data.user.class?.name : data.user.class),
        arm: data.user.arm || data.user.armName,
        armName: data.user.armName || (typeof data.user.arm === "object" ? data.user.arm?.name : data.user.arm),
      });

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

export const useGetTeachers = (
  search?: string,
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["teachers", search, page, limit],
    queryFn: () => fetchTeachers(search, page, limit),
  });
};

export const useGetTeacherById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () => fetchTeacherById(id!),
    enabled: !!id,
  });
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      toast.success("Teacher created successfully");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create teacher");
    },
  });
};

export const useUpdateTeacher = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateTeacher(id, data),
    onSuccess: () => {
      toast.success("Teacher updated successfully");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update teacher");
    },
  });
};

export const useAssignTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignTeacher,
    onSuccess: () => {
      toast.success("Assignment successful");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Assignment failed");
    },
  });
};

export const useUpdateStudent = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateStudentInput) => updateStudent(id, data),
    onSuccess: () => {
      toast.success("Student updated successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update student");
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteStudent(id),
    onSuccess: () => {
      toast.success("Student deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete student");
    },
  });
};

export const useGetSubjects = (
  search?: string,
  page: number = 1,
  limit: number = 10,
  classId?: number,
) => {
  return useQuery({
    queryKey: ["subjects", search, page, limit, classId],
    queryFn: () => fetchSubjects(search, page, limit, classId),
  });
};

export const useGetAllSubjects = () => {
  return useQuery({
    queryKey: ["subjects", "all"],
    queryFn: () => fetchAllSubjects(),
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      toast.success("Subject created successfully");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create subject");
    },
  });
};

export const useUpdateSubject = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SubjectType>) => updateSubject(id, data),
    onSuccess: () => {
      toast.success("Subject updated successfully");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update subject");
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSubject(id),
    onSuccess: () => {
      toast.success("Subject deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete subject");
    },
  });
};
