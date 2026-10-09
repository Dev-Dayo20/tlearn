import api from "@/services/api/super-admin/super-admin";
import type {
  DigitalCourse,
  SuperAdminCoursesResponse,
  SuperAdminCourseResponse,
  SuperAdminCoursesQueryParams,
  CreateCoursePayload,
  CourseStatus,
  AssignCoursePayload,
  BulkAssignPayload,
  SuperAdminEnrollmentsResponse,
  SchoolDigitalCourse,
} from "@/types/digitalCourse.types";

// --- 2.1 List All Courses ----------------------------------------------------

export const getAdminDigitalCourses = async (
  params?: SuperAdminCoursesQueryParams,
): Promise<SuperAdminCoursesResponse> => {
  const { data } = await api.get<SuperAdminCoursesResponse>(
    "/super-admin/digital-courses",
    { params },
  );
  return data;
};

// --- 2.2 Get Single Course ---------------------------------------------------

export const getAdminDigitalCourse = async (
  courseId: number,
): Promise<SuperAdminCourseResponse> => {
  const { data } = await api.get<SuperAdminCourseResponse>(
    `/super-admin/digital-courses/${courseId}`,
  );
  return data;
};

// --- 2.3 Create a Course -----------------------------------------------------

export const createAdminDigitalCourse = async (
  payload: CreateCoursePayload,
): Promise<SuperAdminCourseResponse> => {
  const { data } = await api.post<SuperAdminCourseResponse>(
    "/super-admin/digital-courses",
    payload,
  );
  return data;
};

// --- 2.4 Update a Course -----------------------------------------------------

export const updateAdminDigitalCourse = async (
  courseId: number,
  payload: Partial<CreateCoursePayload>,
): Promise<SuperAdminCourseResponse> => {
  const { data } = await api.patch<SuperAdminCourseResponse>(
    `/super-admin/digital-courses/${courseId}`,
    payload,
  );
  return data;
};

// --- 2.5 Toggle Course Status -------------------------------------------------

export const toggleAdminCourseStatus = async (
  courseId: number,
  status: CourseStatus,
): Promise<SuperAdminCourseResponse> => {
  const { data } = await api.patch<SuperAdminCourseResponse>(
    `/super-admin/digital-courses/${courseId}/status`,
    { status },
  );
  return data;
};

// --- 2.6 Delete a Course (soft delete) ---------------------------------------

export const deleteAdminDigitalCourse = async (
  courseId: number,
): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.delete<{ success: boolean; message: string }>(
    `/super-admin/digital-courses/${courseId}`,
  );
  return data;
};

// --- 2.7 Assign a Course to a School + Class ---------------------------------

export const assignCourseToSchool = async (
  payload: AssignCoursePayload,
): Promise<{
  success: boolean;
  message: string;
  assignment: SchoolDigitalCourse;
}> => {
  const { data } = await api.post<{
    success: boolean;
    message: string;
    assignment: SchoolDigitalCourse;
  }>("/super-admin/digital-courses/assign", payload);
  return data;
};

// --- 2.8 Unassign a Course from a School + Class -----------------------------

export const unassignCourseFromSchool = async (
  payload: AssignCoursePayload,
): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.delete<{ success: boolean; message: string }>(
    "/super-admin/digital-courses/unassign",
    { data: payload },
  );
  return data;
};

// --- 2.9 Bulk Assign Multiple Courses to a School ----------------------------

export const bulkAssignCoursesToSchool = async (
  payload: BulkAssignPayload,
): Promise<{ success: boolean; message: string; count: number }> => {
  const { data } = await api.post<{
    success: boolean;
    message: string;
    count: number;
  }>("/super-admin/digital-courses/bulk-assign", payload);
  return data;
};

// --- 2.10 List All Enrollments (cross-school) --------------------------------

export const getAdminDigitalEnrollments = async (params?: {
  schoolId?: number;
  page?: number;
  limit?: number;
}): Promise<SuperAdminEnrollmentsResponse> => {
  const { data } = await api.get<SuperAdminEnrollmentsResponse>(
    "/super-admin/digital-enrollments",
    { params },
  );
  return data;
};

// --- Derived metrics helper (computed from the course list) ------------------

export interface AdminDigitalCoursesMetrics {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  archivedCourses: number;
  totalAssignments: number;
}

export const calculateAdminCourseMetrics = (
  courses: DigitalCourse[],
): AdminDigitalCoursesMetrics => {
  const publishedCourses = courses.filter(
    (c) => c.status === "PUBLISHED",
  ).length;
  const draftCourses = courses.filter((c) => c.status === "DRAFT").length;
  const archivedCourses = courses.filter(
    (c) => c.status === "ARCHIVED",
  ).length;
  const totalAssignments = courses.reduce(
    (acc, c) => acc + (c._count?.schoolDigitalCourses ?? 0),
    0,
  );

  return {
    totalCourses: courses.length,
    publishedCourses,
    draftCourses,
    archivedCourses,
    totalAssignments,
  };
};
