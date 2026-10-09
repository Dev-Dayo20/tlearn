import api from "@/services/api/super-admin/super-admin";
import type {
  StudentDigitalCoursesResponse,
  StudentCoursesQueryParams,
  StudentEnrollmentResponse,
  StudentProgressResponse,
  MyEnrollmentsResponse,
  EnrollmentStatus,
} from "@/types/digitalCourse.types";

/**
 * 1.1 List Digital Courses for the logged-in student's class
 * GET /student/digital-courses
 */
export const fetchDigitalCourses = async (
  params?: StudentCoursesQueryParams,
): Promise<StudentDigitalCoursesResponse> => {
  const { data } = await api.get<StudentDigitalCoursesResponse>(
    "/student/digital-courses",
    { params },
  );
  return data;
};

/**
 * 1.2 Self-enroll in a course
 * POST /student/digital-courses/:courseAssignmentId/enroll
 */
export const enrollDigitalCourse = async (
  courseAssignmentId: number,
): Promise<StudentEnrollmentResponse> => {
  const { data } = await api.post<StudentEnrollmentResponse>(
    `/student/digital-courses/${courseAssignmentId}/enroll`,
  );
  return data;
};

/**
 * 1.3 Update enrollment progress
 * PATCH /student/digital-courses/:courseAssignmentId/progress
 */
export const updateCourseProgress = async (
  courseAssignmentId: number,
  progressPercent: number,
  status?: EnrollmentStatus,
): Promise<StudentProgressResponse> => {
  const body: { progressPercent: number; status?: EnrollmentStatus } = {
    progressPercent,
  };
  if (status) body.status = status;

  const { data } = await api.patch<StudentProgressResponse>(
    `/student/digital-courses/${courseAssignmentId}/progress`,
    body,
  );
  return data;
};

/**
 * 1.4 Get my enrollments
 * GET /student/digital-courses/my-enrollments
 */
export const fetchMyEnrollments = async (): Promise<MyEnrollmentsResponse> => {
  const { data } = await api.get<MyEnrollmentsResponse>(
    "/student/digital-courses/my-enrollments",
  );
  return data;
};
