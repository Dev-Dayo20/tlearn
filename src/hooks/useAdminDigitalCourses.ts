import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAdminDigitalCourses,
  getAdminDigitalCourse,
  createAdminDigitalCourse,
  updateAdminDigitalCourse,
  deleteAdminDigitalCourse,
  toggleAdminCourseStatus,
  assignCourseToSchool,
  unassignCourseFromSchool,
  bulkAssignCoursesToSchool,
  getAdminDigitalEnrollments,
  calculateAdminCourseMetrics,
  type AdminDigitalCoursesMetrics,
} from "@/services/api/super-admin/digitalCoursesSuperAdminApi";
import type {
  SuperAdminCoursesQueryParams,
  CreateCoursePayload,
  CourseStatus,
  AssignCoursePayload,
  BulkAssignPayload,
  SuperAdminCoursesResponse,
  DigitalCourse,
} from "@/types/digitalCourse.types";

export const ADMIN_DIGITAL_COURSES_QUERY_KEY = ["superAdmin", "digitalCourses"];
export const ADMIN_DIGITAL_ENROLLMENTS_QUERY_KEY = [
  "superAdmin",
  "digitalEnrollments",
];

// --- Enriched list response with derived metrics ------------------------------

export interface AdminDigitalCoursesData {
  courses: DigitalCourse[];
  metrics: AdminDigitalCoursesMetrics;
  pagination: SuperAdminCoursesResponse["pagination"];
}

// --- 2.1 List courses ---------------------------------------------------------

export const useGetAdminDigitalCourses = (
  params: SuperAdminCoursesQueryParams,
) => {
  return useQuery<AdminDigitalCoursesData>({
    queryKey: [...ADMIN_DIGITAL_COURSES_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getAdminDigitalCourses(params);
      return {
        courses: response.courses,
        metrics: calculateAdminCourseMetrics(response.courses),
        pagination: response.pagination,
      };
    },
    staleTime: 1000 * 60 * 2,
  });
};

// --- 2.2 Get single course ----------------------------------------------------

export const useGetAdminDigitalCourse = (courseId: number | null) => {
  return useQuery({
    queryKey: [...ADMIN_DIGITAL_COURSES_QUERY_KEY, courseId],
    queryFn: () => getAdminDigitalCourse(courseId!),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 2,
  });
};

// --- 2.3 Create course --------------------------------------------------------

export const useCreateDigitalCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCoursePayload) =>
      createAdminDigitalCourse(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DIGITAL_COURSES_QUERY_KEY,
      });
      toast.success(`"${res.course.title}" created successfully!`);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create digital course.",
      );
    },
  });
};

// --- 2.4 Update course --------------------------------------------------------

export const useUpdateDigitalCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<CreateCoursePayload>;
    }) => updateAdminDigitalCourse(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DIGITAL_COURSES_QUERY_KEY,
      });
      toast.success(`"${res.course.title}" updated successfully!`);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update digital course.",
      );
    },
  });
};

// --- 2.5 Toggle course status -------------------------------------------------

export const useToggleCourseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: CourseStatus }) =>
      toggleAdminCourseStatus(id, status),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DIGITAL_COURSES_QUERY_KEY,
      });
      toast.success(
        `"${res.course.title}" status set to ${res.course.status}.`,
      );
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update course status.",
      );
    },
  });
};

// --- 2.6 Delete course --------------------------------------------------------

export const useDeleteDigitalCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: number) => deleteAdminDigitalCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DIGITAL_COURSES_QUERY_KEY,
      });
      toast.success("Digital course deleted successfully.");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete digital course.",
      );
    },
  });
};

// --- 2.7 Assign course to school + class -------------------------------------

export const useAssignCourseToSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignCoursePayload) => assignCourseToSchool(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DIGITAL_COURSES_QUERY_KEY,
      });
      toast.success(res.message || "Course assigned successfully.");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to assign course.",
      );
    },
  });
};

// --- 2.8 Unassign course -----------------------------------------------------

export const useUnassignCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignCoursePayload) =>
      unassignCourseFromSchool(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DIGITAL_COURSES_QUERY_KEY,
      });
      toast.success(res.message || "Course unassigned successfully.");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to unassign course.",
      );
    },
  });
};

// --- 2.9 Bulk assign ---------------------------------------------------------

export const useBulkAssignCourses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BulkAssignPayload) =>
      bulkAssignCoursesToSchool(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DIGITAL_COURSES_QUERY_KEY,
      });
      toast.success(res.message || `${res.count} course(s) assigned.`);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Bulk assign failed.",
      );
    },
  });
};

// --- 2.10 List all enrollments ------------------------------------------------

export const useGetAdminDigitalEnrollments = (params?: {
  schoolId?: number;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [...ADMIN_DIGITAL_ENROLLMENTS_QUERY_KEY, params],
    queryFn: () => getAdminDigitalEnrollments(params),
    staleTime: 1000 * 60 * 2,
  });
};
