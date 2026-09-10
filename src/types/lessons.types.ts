/* ---------------------------------------------------------------------
   Lesson-related type definitions & Backend API Contracts.
   Matches the shape the backend should return for GET /api/lessons.
   --------------------------------------------------------------------- */

export type LessonType = "Video" | "PDF";
export type LessonCategory = "general" | "digital_course";

/**
 * Represents a single Lesson or Material item.
 * Map this to your database model (e.g. Prisma Lesson / Material schema).
 */
export interface Lesson {
  id: number;
  title: string;
  subject: string;
  description: string;
  type: LessonType;
  duration?: string; // Required when type === "Video" (e.g. "15 mins" or "00:15:30")
  size?: string; // Required when type === "PDF" (e.g. "2.4 MB")
  videoUrl?: string; // Streamable MP4 or HLS video URL for video lessons
  thumbnailUrl?: string; // Image URL for video/PDF preview thumbnail
  pdfUrl?: string; // Download/view URL for PDF document
  date: string; // ISO 8601 date string (e.g. "2024-02-01")
  progress: number; // 0-100 learner progress percentage
  isNew?: boolean; // Badge marker for recent additions
  instructorName?: string; // Name of teacher/instructor who created the material
  viewsCount?: number; // Number of student views/downloads
  category?: LessonCategory; // Material category: "general" or "digital_course"
  classId?: number; // Associated Class ID
  subjectId?: number; // Associated Subject ID
  createdAt?: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
}

/**
 * Faded theme fill color configuration per subject.
 */
export interface SubjectTheme {
  bgColor: string; // Light faded background tint
  textColor: string; // Matching accent color for text
  borderColor: string; // Subtle border color
  badgeBg: string; // Translucent badge background
}

/**
 * Standard backend pagination metadata object.
 */
export interface LessonPagination {
  currentPage: number;
  pageSize: number;
  totalLessons: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Summary metrics object included in lessons API responses.
 */
export interface LessonsStats {
  totalLessons: number;
  inProgressCount: number;
  completedCount: number;
  weeklyCount: number;
}

/**
 * Complete REST API response schema for GET /api/lessons
 * backend developers can implement this contract 1:1.
 */
export interface LessonsResponse {
  success: boolean;
  message?: string;
  lessons: Lesson[];
  pagination: LessonPagination;
  stats?: LessonsStats;
}

/**
 * Query parameters contract for GET /api/lessons endpoint.
 */
export interface LessonQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  category?: LessonCategory | "all";
  type?: LessonType | "All";
  sortBy?: "date" | "title" | "progress";
  sortOrder?: "asc" | "desc";
}
