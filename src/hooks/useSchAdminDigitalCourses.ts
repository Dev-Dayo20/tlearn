import { useQuery } from "@tanstack/react-query";
import {
  fetchSchoolDigitalCourses,
  fetchSchoolCourseEnrollments,
  fetchSchoolDigitalStats,
} from "@/services/api/admin/digitalCoursesSchAdminApi";
import type { SchoolAdminCoursesQueryParams } from "@/types/digitalCourse.types";

export const SCH_ADMIN_DIGITAL_COURSES_KEY = ["schAdmin", "digitalCourses"];
export const SCH_ADMIN_DIGITAL_STATS_KEY = ["schAdmin", "digitalStats"];

/** 3.1 List Courses Assigned to Own School */
export const useSchoolDigitalCourses = (
  params?: SchoolAdminCoursesQueryParams,
) => {
  return useQuery({
    queryKey: [...SCH_ADMIN_DIGITAL_COURSES_KEY, params],
    queryFn: () => fetchSchoolDigitalCourses(params),
    staleTime: 1000 * 60 * 2,
  });
};

/** 3.2 List Enrollments for a Specific Course Assignment */
export const useSchoolCourseEnrollments = (
  courseAssignmentId: number | null,
  params?: { page?: number; limit?: number },
) => {
  return useQuery({
    queryKey: [
      ...SCH_ADMIN_DIGITAL_COURSES_KEY,
      courseAssignmentId,
      "enrollments",
      params,
    ],
    queryFn: () => fetchSchoolCourseEnrollments(courseAssignmentId!, params),
    enabled: !!courseAssignmentId,
    staleTime: 1000 * 60 * 2,
  });
};

/** 3.3 Get School Digital Stats */
export const useSchoolDigitalStats = () => {
  return useQuery({
    queryKey: SCH_ADMIN_DIGITAL_STATS_KEY,
    queryFn: fetchSchoolDigitalStats,
    staleTime: 1000 * 60 * 5,
  });
};
