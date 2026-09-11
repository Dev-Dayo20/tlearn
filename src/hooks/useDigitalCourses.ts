import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import type {
  DigitalCourse,
  DigitalCoursesStats,
} from "@/types/digitalCourse.types";
import {
  fetchDigitalCourses,
  enrollDigitalCourse,
} from "@/services/api/student/digitalCoursesApi";
import { formatTitleCase } from "@/lib/utils";
import { toast } from "sonner";

export interface SortOptionItem {
  id: string;
  label: string;
  sortBy: "recommended" | "popular" | "rating" | "newest";
}

export const COURSE_SORT_OPTIONS: SortOptionItem[] = [
  { id: "recommended", label: "Recommended for You", sortBy: "recommended" },
  { id: "popular", label: "Most Popular", sortBy: "popular" },
  { id: "rating", label: "Highest Rated", sortBy: "rating" },
  { id: "newest", label: "Newly Added", sortBy: "newest" },
];

export const useDigitalCourses = () => {
  const { user } = useAuthStore();

  // Extract student's clean class level name
  const studentClassLevel = useMemo(() => {
    if (!user) return "Primary 1";
    if (typeof user.class === "object" && user.class !== null) {
      return (user.class as { name: string }).name || "Primary 1";
    }
    if (typeof user.class === "string" && user.class) {
      return user.class;
    }
    if (user.className) {
      return user.className;
    }
    return "Primary 1";
  }, [user]);

  const formattedClassLevel = formatTitleCase(studentClassLevel);

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [onlyMyLevel, setOnlyMyLevel] = useState(true); // Default: highlight student's class level!
  const [sortBy, setSortBy] = useState<
    "recommended" | "popular" | "rating" | "newest"
  >("recommended");

  // Data state
  const [courses, setCourses] = useState<DigitalCourse[]>([]);
  const [stats, setStats] = useState<DigitalCoursesStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal interaction state
  const [selectedCourse, setSelectedCourse] = useState<DigitalCourse | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<DigitalCourse | null>(
    null,
  );
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Load courses
  const loadCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchDigitalCourses({
        classLevel: studentClassLevel,
        search: searchQuery,
        category: activeCategory,
        onlyMyLevel,
        sortBy,
      });

      if (response.success) {
        setCourses(response.courses);
        setStats(response.stats);
      }
    } catch (err) {
      console.warn("Could not load digital courses:", err);
    } finally {
      setIsLoading(false);
    }
  }, [studentClassLevel, searchQuery, activeCategory, onlyMyLevel, sortBy]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Open detail modal
  const handleOpenDetail = (course: DigitalCourse) => {
    setSelectedCourse(course);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedCourse(null);
  };

  // Open enrollment modal
  const handleOpenEnrollModal = (course: DigitalCourse) => {
    setCourseToEnroll(course);
    setIsEnrollModalOpen(true);
  };

  const handleCloseEnrollModal = () => {
    setIsEnrollModalOpen(false);
    setCourseToEnroll(null);
  };

  // Confirm enrollment action
  const handleConfirmEnroll = async (courseId: string | number) => {
    setIsEnrolling(true);
    try {
      const response = await enrollDigitalCourse(courseId);
      if (response.success) {
        toast.success(response.message || "Successfully enrolled in course!");
        // Update local state
        setCourses((prev) =>
          prev.map((c) =>
            String(c.id) === String(courseId)
              ? { ...c, isEnrolled: true, progress: 0 }
              : c,
          ),
        );
        if (selectedCourse && String(selectedCourse.id) === String(courseId)) {
          setSelectedCourse((prev) =>
            prev ? { ...prev, isEnrolled: true } : null,
          );
        }
        handleCloseEnrollModal();
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to enroll. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  // Quick stats derived
  const currentSortOption =
    COURSE_SORT_OPTIONS.find((opt) => opt.sortBy === sortBy) ||
    COURSE_SORT_OPTIONS[0];

  return {
    studentClassLevel: formattedClassLevel,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    onlyMyLevel,
    setOnlyMyLevel,
    sortBy,
    setSortBy,
    currentSortOption,
    courses,
    stats,
    isLoading,
    selectedCourse,
    isDetailModalOpen,
    courseToEnroll,
    isEnrollModalOpen,
    isEnrolling,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenEnrollModal,
    handleCloseEnrollModal,
    handleConfirmEnroll,
    refreshCourses: loadCourses,
  };
};
