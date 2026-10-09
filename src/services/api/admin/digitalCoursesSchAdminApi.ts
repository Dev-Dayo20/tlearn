import api from "@/services/api/super-admin/super-admin";
import type {
  SchoolAdminCoursesResponse,
  SchoolAdminCourseEnrollmentsResponse,
  SchoolAdminDigitalStats,
  SchoolAdminCoursesQueryParams,
} from "@/types/digitalCourse.types";

/**
 * 3.1 List Courses Assigned to Own School
 * GET /sch-admin/digital-courses
 */
export const fetchSchoolDigitalCourses = async (
  params?: SchoolAdminCoursesQueryParams,
): Promise<SchoolAdminCoursesResponse> => {
  const { data } = await api.get<SchoolAdminCoursesResponse>(
    "/sch-admin/digital-courses",
    { params },
  );
  return data;
};

/**
 * 3.2 List Enrollments for a Specific Course Assignment
 * GET /sch-admin/digital-courses/:courseAssignmentId/enrollments
 */
export const fetchSchoolCourseEnrollments = async (
  courseAssignmentId: number,
  params?: { page?: number; limit?: number },
): Promise<SchoolAdminCourseEnrollmentsResponse> => {
  const { data } = await api.get<SchoolAdminCourseEnrollmentsResponse>(
    `/sch-admin/digital-courses/${courseAssignmentId}/enrollments`,
    { params },
  );
  return data;
};

/**
 * 3.3 Get School Digital Stats (dashboard widget)
 * GET /sch-admin/digital-stats
 */
export const fetchSchoolDigitalStats =
  async (): Promise<SchoolAdminDigitalStats> => {
    const { data } =
      await api.get<SchoolAdminDigitalStats>("/sch-admin/digital-stats");
    return data;
  };
