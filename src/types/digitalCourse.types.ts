/* ---------------------------------------------------------------------
   Digital Course domain types — aligned with backend API contracts
   --------------------------------------------------------------------- */

// --- Shared enums -------------------------------------------------------------

export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type EnrollmentStatus =
  | "ENROLLED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DROPPED";

// --- Core course object (from backend) ----------------------------------------

export interface DigitalCourse {
  id: number;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  externalUrl: string | null;
  durationMinutes: number | null;
  term: "First Term" | "Second Term" | "Third Term" | null;
  pathway: string | null;
  level: CourseLevel;
  status: CourseStatus;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  /** Count of school assignments (Super Admin list only) */
  _count?: {
    schoolDigitalCourses?: number;
  };
  /** Full school assignments (Super Admin single-course view only) */
  schoolDigitalCourses?: SchoolDigitalCourse[];
}

// --- School assignment --------------------------------------------------------

export interface SchoolDigitalCourse {
  id: number;
  courseId: number;
  schoolId: number;
  classId: number;
  createdAt: string;
  course?: DigitalCourse;
  school?: { id: number; name: string };
  class?: { id: number; name: string };
  _count?: { enrollments: number };
}

// --- Enrollment ---------------------------------------------------------------

export interface DigitalEnrollment {
  id: number;
  studentId: number;
  schoolDigitalCourseId: number;
  status: EnrollmentStatus;
  progressPercent: number;
  completedAt: string | null;
  enrolledAt: string;
  updatedAt: string;
}

export interface DigitalEnrollmentWithStudent extends DigitalEnrollment {
  student?: {
    id: number;
    name: string;
    studentId: string;
    classId?: number;
  };
  schoolDigitalCourse?: SchoolDigitalCourse & { course?: DigitalCourse };
}

// --- Pagination ---------------------------------------------------------------

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// --- Student API -------------------------------------------------------------

/** One item returned by GET /student/digital-courses */
export interface StudentCourseItem {
  schoolDigitalCourseId: number;
  course: DigitalCourse;
  enrollment: DigitalEnrollment | null;
}

export interface StudentDigitalCoursesResponse {
  success: boolean;
  courses: StudentCourseItem[];
  pagination: PaginationMeta;
}

export interface StudentEnrollmentResponse {
  success: boolean;
  message: string;
  enrollment: DigitalEnrollment;
}

export interface StudentProgressResponse {
  success: boolean;
  message: string;
  enrollment: DigitalEnrollment;
}

export interface MyEnrollmentsResponse {
  success: boolean;
  enrollments: Array<
    DigitalEnrollment & {
      schoolDigitalCourse: SchoolDigitalCourse & { course?: DigitalCourse };
    }
  >;
}

// --- Student query params -----------------------------------------------------

export interface StudentCoursesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  term?: string;
  pathway?: string;
}

// --- Super Admin API ---------------------------------------------------------

export interface SuperAdminCoursesResponse {
  success: boolean;
  courses: DigitalCourse[];
  pagination: PaginationMeta;
}

export interface SuperAdminCourseResponse {
  success: boolean;
  course: DigitalCourse;
}

export interface SuperAdminCoursesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: CourseStatus;
  level?: CourseLevel;
  term?: string;
  pathway?: string;
}

export interface CreateCoursePayload {
  title: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  externalUrl?: string | null;
  durationMinutes?: number | null;
  term?: "First Term" | "Second Term" | "Third Term" | null;
  pathway?: string | null;
  level?: CourseLevel;
  status?: CourseStatus;
}

export interface AssignCoursePayload {
  courseId: number;
  schoolId: number;
  classId: number;
}

export interface BulkAssignPayload {
  schoolId: number;
  assignments: Array<{ courseId: number; classId: number }>;
}

export interface SuperAdminEnrollmentsResponse {
  success: boolean;
  enrollments: DigitalEnrollmentWithStudent[];
  pagination: PaginationMeta;
}

// --- School Admin API ---------------------------------------------------------

export interface SchoolAdminCoursesResponse {
  success: boolean;
  courses: SchoolDigitalCourse[];
  pagination: PaginationMeta;
}

export interface SchoolAdminCourseEnrollmentsResponse {
  success: boolean;
  enrollments: Array<
    DigitalEnrollment & {
      student?: {
        id: number;
        name: string;
        studentId: string;
        classId: number;
      };
    }
  >;
  pagination: PaginationMeta;
}

export interface SchoolAdminDigitalStats {
  success: boolean;
  stats: {
    totalAssigned: number;
    totalEnrollments: number;
    completedEnrollments: number;
  };
}

export interface SchoolAdminCoursesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  term?: string;
  classId?: number;
}
