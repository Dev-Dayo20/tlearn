/* ---------------------------------------------------------------------
   Digital Course domain types & backend API contracts
   --------------------------------------------------------------------- */

export type CourseCategory =
  | "All"
  | "Digital Literacy & Productivity"
  | "Coding & Software"
  | "Data & Analytics"
  | "Artificial Intelligence"
  | "Design & UI/UX"
  | "Digital Marketing & Content"
  | "Cybersecurity & Safety"
  | "Robotics & IoT";

export interface CourseCurriculumModule {
  moduleNumber: number;
  title: string;
  duration: string;
  lessonsCount: number;
  topics: string[];
}

export interface CourseInstructor {
  name: string;
  role: string;
  avatar: string;
  organization?: string;
}

export interface DigitalCourse {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  term?: "First Term" | "Second Term" | "Third Term" | string;
  pathway?: string;
  shortDescription: string;
  fullDescription: string;
  targetLevel: string; // e.g. "JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"
  eligibleClassLevels: string[]; // Normalized lowercase class names
  duration: string; // e.g. "10 Weeks (20 Hours)"
  lessonsCount: number;
  modulesCount: number;
  thumbnail: string;
  instructor: CourseInstructor;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  badge?: "Recommended" | "New" | "Featured" | "Trending" | "Popular";
  accentColor: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
  skills: string[];
  prerequisites: string;
  learningOutcomes: string[];
  curriculum: CourseCurriculumModule[];
  isEnrolled?: boolean;
  enrolledAt?: string;
  progress?: number;
  certificateOffered: boolean;
}

export interface DigitalCoursesStats {
  totalAvailable: number;
  tailoredForLevel: number;
  enrolledCount: number;
  completedCount: number;
  totalLearningHours: number;
}

export interface DigitalCoursesQueryParams {
  classLevel?: string;
  search?: string;
  category?: string;
  onlyMyLevel?: boolean;
  sortBy?: "recommended" | "popular" | "rating" | "newest";
  page?: number;
  limit?: number;
}

export interface DigitalCoursesResponse {
  success: boolean;
  courses: DigitalCourse[];
  stats: DigitalCoursesStats;
  total: number;
  studentClassLevel?: string;
}

export interface EnrollCourseResponse {
  success: boolean;
  message: string;
  course: DigitalCourse;
  enrollmentId?: string;
}
