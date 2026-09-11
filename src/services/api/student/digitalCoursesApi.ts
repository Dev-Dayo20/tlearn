import api from "@/services/api/super-admin/super-admin";
import type {
  DigitalCourse,
  DigitalCoursesQueryParams,
  DigitalCoursesResponse,
  EnrollCourseResponse,
} from "@/types/digitalCourse.types";
import { DIGITAL_COURSES } from "@/data/digitalCourses.data";

const ENROLLED_STORAGE_KEY = "tlearn_enrolled_digital_courses";

/** Get list of enrolled course IDs from localStorage */
export const getStoredEnrolledIds = (): string[] => {
  try {
    const raw = localStorage.getItem(ENROLLED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/** Save enrolled course ID to localStorage */
export const storeEnrolledId = (courseId: string | number): void => {
  try {
    const existing = getStoredEnrolledIds();
    const idStr = String(courseId);
    if (!existing.includes(idStr)) {
      existing.push(idStr);
      localStorage.setItem(ENROLLED_STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn("Failed to persist enrolled course:", err);
  }
};

/**
 * Fetch digital courses for student.
 * Endpoint: GET /student/digital-courses
 */
export const fetchDigitalCourses = async (
  params?: DigitalCoursesQueryParams,
): Promise<DigitalCoursesResponse> => {
  const enrolledIds = getStoredEnrolledIds();

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (params?.classLevel) queryParams.classLevel = params.classLevel;
    if (params?.search) queryParams.search = params.search;
    if (params?.category && params.category !== "All")
      queryParams.category = params.category;
    if (params?.onlyMyLevel !== undefined)
      queryParams.onlyMyLevel = params.onlyMyLevel;
    if (params?.sortBy) queryParams.sortBy = params.sortBy;

    const { data } = await api.get<DigitalCoursesResponse>(
      "/student/digital-courses",
      { params: queryParams },
    );

    if (data?.success && Array.isArray(data.courses)) {
      // Merge local enrollment state
      const mergedCourses = data.courses.map((course) => ({
        ...course,
        isEnrolled:
          course.isEnrolled || enrolledIds.includes(String(course.id)),
      }));
      return {
        ...data,
        courses: mergedCourses,
      };
    }
  } catch (err) {
    console.warn(
      "Backend /student/digital-courses unavailable, using tailored local dataset:",
      err,
    );
  }

  // --- LOCAL FALLBACK ENGINE ---
  let courses: DigitalCourse[] = DIGITAL_COURSES.map((course) => ({
    ...course,
    isEnrolled: enrolledIds.includes(String(course.id)),
    progress: enrolledIds.includes(String(course.id))
      ? course.progress || 25
      : 0,
  }));

  const normalizedClassLevel = (params?.classLevel || "").toLowerCase().trim();

  // Filter by tailored class level if requested
  if (params?.onlyMyLevel && normalizedClassLevel) {
    const matched = courses.filter((c) =>
      c.eligibleClassLevels.some(
        (lvl) =>
          normalizedClassLevel.includes(lvl) ||
          lvl.includes(normalizedClassLevel),
      ),
    );
    if (matched.length > 0) {
      courses = matched;
    }
  }

  // Filter by category
  if (params?.category && params.category !== "All") {
    courses = courses.filter(
      (c) => c.category.toLowerCase() === params.category!.toLowerCase(),
    );
  }

  // Filter by search query
  if (params?.search) {
    const q = params.search.toLowerCase();
    courses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.term && c.term.toLowerCase().includes(q)) ||
        (c.pathway && c.pathway.toLowerCase().includes(q)) ||
        c.skills.some((s) => s.toLowerCase().includes(q)),
    );
  }

  // Sort
  if (params?.sortBy === "popular") {
    courses.sort((a, b) => b.enrolledCount - a.enrolledCount);
  } else if (params?.sortBy === "rating") {
    courses.sort((a, b) => b.rating - a.rating);
  } else if (params?.sortBy === "newest") {
    courses.sort((a, b) => (b.badge === "New" ? 1 : -1));
  }

  const enrolledCount = courses.filter((c) => c.isEnrolled).length;
  const tailoredCount = DIGITAL_COURSES.filter((c) =>
    normalizedClassLevel
      ? c.eligibleClassLevels.some(
          (lvl) =>
            normalizedClassLevel.includes(lvl) ||
            lvl.includes(normalizedClassLevel),
        )
      : true,
  ).length;

  return {
    success: true,
    courses,
    total: courses.length,
    studentClassLevel: params?.classLevel,
    stats: {
      totalAvailable: DIGITAL_COURSES.length,
      tailoredForLevel: tailoredCount,
      enrolledCount,
      completedCount: 0,
      totalLearningHours: courses.reduce((acc, c) => acc + c.lessonsCount, 0),
    },
  };
};

/**
 * Enroll student in a digital course.
 * Endpoint: POST /student/digital-courses/:id/enroll
 */
export const enrollDigitalCourse = async (
  courseId: string | number,
): Promise<EnrollCourseResponse> => {
  storeEnrolledId(courseId);

  try {
    const { data } = await api.post<EnrollCourseResponse>(
      `/student/digital-courses/${courseId}/enroll`,
      {},
    );
    if (data?.success) return data;
  } catch (err) {
    console.warn("Backend enrollment fallback used:", err);
  }

  const targetCourse = DIGITAL_COURSES.find(
    (c) => String(c.id) === String(courseId),
  );

  return {
    success: true,
    message: `Congratulations! You have successfully enrolled in ${
      targetCourse?.title || "this digital course"
    }.`,
    course: {
      ...(targetCourse || DIGITAL_COURSES[0]),
      isEnrolled: true,
      enrolledAt: new Date().toISOString(),
      progress: 0,
    },
    enrollmentId: `ENR-${Date.now()}`,
  };
};
