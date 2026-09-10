import { useState, useEffect, useMemo } from "react";
import type {
  Lesson,
  LessonCategory,
  LessonPagination,
  LessonsStats,
} from "@/types/lessons.types";
import {
  fetchStudentLessons,
} from "@/services/api/student/studentLessonsApi";
import { MOCK_LESSONS } from "@/data/lessons.data";

export const ITEMS_PER_PAGE = 12;

export interface SortOption {
  id: string;
  label: string;
  sortBy: "date" | "title" | "progress";
  sortOrder: "asc" | "desc";
}

export const sortOptions: SortOption[] = [
  {
    id: "date-desc",
    label: "Newest First",
    sortBy: "date",
    sortOrder: "desc",
  },
  {
    id: "date-asc",
    label: "Oldest First",
    sortBy: "date",
    sortOrder: "asc",
  },
  {
    id: "title-asc",
    label: "Title: A – Z",
    sortBy: "title",
    sortOrder: "asc",
  },
  {
    id: "title-desc",
    label: "Title: Z – A",
    sortBy: "title",
    sortOrder: "desc",
  },
  {
    id: "progress-desc",
    label: "Progress: High to Low",
    sortBy: "progress",
    sortOrder: "desc",
  },
  {
    id: "progress-asc",
    label: "Progress: Low to High",
    sortBy: "progress",
    sortOrder: "asc",
  },
];

export const useStudentLessons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | LessonCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "title" | "progress">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // API State
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [pagination, setPagination] = useState<LessonPagination | null>(null);
  const [stats, setStats] = useState<LessonsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiConnected, setIsApiConnected] = useState(false);

  // Fetch backend lessons from GET /tlearn/student/lessons
  useEffect(() => {
    let isMounted = true;
    const loadLessons = async () => {
      setIsLoading(true);
      try {
        const response = await fetchStudentLessons({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: searchQuery || undefined,
          category: activeCategory !== "all" ? activeCategory : undefined,
          sortBy,
          sortOrder,
        });

        if (isMounted && response.success) {
          const fetchedLessons = response.lessons || [];
          setLessons(fetchedLessons);
          setPagination(response.pagination || null);
          if (response.stats) setStats(response.stats);
          setIsApiConnected(true);
        }
      } catch (error) {
        console.warn(
          "Backend API unavailable, using local mock dataset:",
          error,
        );
        if (isMounted) {
          setIsApiConnected(false);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadLessons();
    return () => {
      isMounted = false;
    };
  }, [currentPage, searchQuery, activeCategory, sortBy, sortOrder]);

  const handleProgressUpdate = (
    lessonId: number,
    newProgress: number,
    isCompleted?: boolean,
  ) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId ? { ...l, progress: newProgress } : l,
      ),
    );

    setStats((prev) => {
      if (!prev) return prev;
      const targetLesson = lessons.find((l) => l.id === lessonId);
      const oldProgress = targetLesson ? targetLesson.progress : 0;
      const wasCompleted = oldProgress >= 90;
      const nowCompleted = isCompleted ?? newProgress >= 90;

      let completedDelta = 0;
      let inProgressDelta = 0;

      if (!wasCompleted && nowCompleted) {
        completedDelta = 1;
        if (oldProgress > 0) inProgressDelta = -1;
      } else if (oldProgress === 0 && newProgress > 0 && !nowCompleted) {
        inProgressDelta = 1;
      }

      return {
        ...prev,
        completedCount: Math.max(0, prev.completedCount + completedDelta),
        inProgressCount: Math.max(0, prev.inProgressCount + inProgressDelta),
      };
    });
  };

  // Client-side fallback filtering when API is not connected
  const filteredMockLessons = useMemo(() => {
    if (isApiConnected) return lessons;

    return MOCK_LESSONS.filter((lesson) => {
      const matchesCategory =
        activeCategory === "all" ||
        lesson.category === activeCategory;
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortBy === "progress") {
        return sortOrder === "asc"
          ? a.progress - b.progress
          : b.progress - a.progress;
      }
      // default: date
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [isApiConnected, lessons, activeCategory, searchQuery, sortBy, sortOrder]);

  // Calculate pagination state
  const totalLessonsCount = isApiConnected
    ? pagination?.totalLessons || lessons.length
    : filteredMockLessons.length;
  const totalPagesCount = isApiConnected
    ? pagination?.totalPages ||
      Math.ceil(totalLessonsCount / ITEMS_PER_PAGE) ||
      1
    : Math.ceil(filteredMockLessons.length / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedLessons = useMemo(() => {
    if (isApiConnected) return lessons;
    return filteredMockLessons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [isApiConnected, lessons, filteredMockLessons, startIndex]);

  // Compute stat strip counters
  const totalLessonsStat = stats?.totalLessons ?? MOCK_LESSONS.length;
  const inProgressStat =
    stats?.inProgressCount ??
    MOCK_LESSONS.filter((l) => l.progress > 0 && l.progress < 100).length;
  const completedStat =
    stats?.completedCount ??
    MOCK_LESSONS.filter((l) => l.progress === 100).length;
  const weeklyStat = stats?.weeklyCount ?? 4;

  const handleCategoryChange = (category: "all" | LessonCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (
    newSortBy: "date" | "title" | "progress",
    newSortOrder: "asc" | "desc",
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const currentSortOption =
    sortOptions.find(
      (opt) => opt.sortBy === sortBy && opt.sortOrder === sortOrder,
    ) || sortOptions[0];

  return {
    searchQuery,
    handleSearchChange,
    activeCategory,
    handleCategoryChange,
    currentPage,
    setCurrentPage,
    sortBy,
    sortOrder,
    handleSortChange,
    currentSortOption,
    sortOptions,
    displayedLessons,
    isLoading,
    totalLessonsCount,
    totalPagesCount,
    startIndex,
    totalLessonsStat,
    inProgressStat,
    completedStat,
    weeklyStat,
    handleProgressUpdate,
  };
};
