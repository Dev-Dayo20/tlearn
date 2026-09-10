import api from "@/services/api/super-admin/super-admin";
import type { LessonQueryParams, LessonsResponse } from "@/types/lessons.types";

/**
 * Fetch lessons for student from backend endpoint GET /tlearn/student/lessons
 *
 * Endpoint: /student/lessons
 * HTTP Method: GET
 * Auth: Cookie-based (accessToken)
 * Headers: X-School-Subdomain attached automatically by axios interceptor
 *
 * @param params Query options (page, limit, search, subject, sortBy, sortOrder)
 */
export const fetchStudentLessons = async (
  params?: LessonQueryParams,
): Promise<LessonsResponse> => {
  const queryParams: Record<string, string | number> = {};

  if (params?.page) queryParams.page = params.page;
  if (params?.limit) queryParams.limit = params.limit;
  if (params?.search) queryParams.search = params.search;
  if (params?.subject && params.subject !== "All")
    queryParams.subject = params.subject;
  if (params?.category && params.category !== "all")
    queryParams.category = params.category;
  if (params?.type && params.type !== "All") queryParams.type = params.type;
  if (params?.sortBy) queryParams.sortBy = params.sortBy;
  if (params?.sortOrder) queryParams.sortOrder = params.sortOrder;

  const { data } = await api.get<LessonsResponse>("/student/lessons", {
    params: queryParams,
  });

  return data;
};

export interface VideoProgressPayload {
  watchedDuration: number;
  videoDuration: number;
}

export interface VideoProgressResponse {
  success: boolean;
  message?: string;
  progress?: number;
  isCompleted?: boolean;
}

/**
 * Send video watching progress to backend
 * Endpoint: POST /tlearn/student/video/:videoId/progress
 */
export const updateVideoProgress = async (
  videoId: number | string,
  payload: VideoProgressPayload,
): Promise<VideoProgressResponse> => {
  const { data } = await api.post<VideoProgressResponse>(
    `/student/video/${videoId}/progress`,
    payload,
  );
  return data;
};

/**
 * Fetch available subjects for the student's class
 * Endpoint: GET /student/subjects
 */
export const fetchStudentSubjects = async (): Promise<string[]> => {
  try {
    const { data } = await api.get<{
      success?: boolean;
      subjects?: Array<{ id: number; name: string } | string>;
    }>("/student/subjects");

    if (data?.subjects && Array.isArray(data.subjects)) {
      return data.subjects
        .map((s) => (typeof s === "string" ? s : s.name))
        .filter(Boolean);
    }
    if (Array.isArray(data)) {
      return (data as any[])
        .map((s) => (typeof s === "string" ? s : s.name))
        .filter(Boolean);
    }
  } catch (error) {
    // If endpoint is not available or differs, fallback to subjects endpoint
    try {
      const { data } = await api.get<{
        subjects?: Array<{ id: number; name: string } | string>;
      }>("/sch-admin/subjects/all");
      if (data?.subjects && Array.isArray(data.subjects)) {
        return data.subjects
          .map((s) => (typeof s === "string" ? s : s.name))
          .filter(Boolean);
      }
    } catch {
      // Ignored: Caller will fallback to lessons-derived subjects or mock data
    }
  }

  return [];
};
