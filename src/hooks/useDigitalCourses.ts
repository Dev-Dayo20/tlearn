import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  StudentCourseItem,
  StudentCoursesQueryParams,
} from "@/types/digitalCourse.types";
import {
  fetchDigitalCourses,
  enrollDigitalCourse,
  updateCourseProgress,
  fetchMyEnrollments,
} from "@/services/api/student/digitalCoursesApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/store/authStore";

export const STUDENT_DIGITAL_COURSES_KEY = ["student", "digitalCourses"];
export const STUDENT_MY_ENROLLMENTS_KEY = ["student", "myEnrollments"];

// --- 1.1 List courses for the student ----------------------------------------

export const useStudentDigitalCourses = (params?: StudentCoursesQueryParams) => {
  return useQuery({
    queryKey: [...STUDENT_DIGITAL_COURSES_KEY, params],
    queryFn: () => fetchDigitalCourses(params),
    staleTime: 1000 * 60 * 2,
  });
};

// --- 1.2 Enroll in a course ---------------------------------------------------

export const useEnrollDigitalCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseAssignmentId: number) =>
      enrollDigitalCourse(courseAssignmentId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: STUDENT_DIGITAL_COURSES_KEY });
      queryClient.invalidateQueries({ queryKey: STUDENT_MY_ENROLLMENTS_KEY });
      toast.success(res.message || "Successfully enrolled!");
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message || err?.message || "Enrollment failed.";
      if (err?.response?.status === 409) {
        toast.info(msg);
      } else {
        toast.error(msg);
      }
    },
  });
};

// --- 1.3 Update enrollment progress -----------------------------------------

export const useUpdateCourseProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseAssignmentId,
      progressPercent,
    }: {
      courseAssignmentId: number;
      progressPercent: number;
    }) => updateCourseProgress(courseAssignmentId, progressPercent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDENT_DIGITAL_COURSES_KEY });
      queryClient.invalidateQueries({ queryKey: STUDENT_MY_ENROLLMENTS_KEY });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update progress.",
      );
    },
  });
};

// --- 1.4 My enrollments -------------------------------------------------------

export const useMyEnrollments = () => {
  return useQuery({
    queryKey: STUDENT_MY_ENROLLMENTS_KEY,
    queryFn: fetchMyEnrollments,
    staleTime: 1000 * 60 * 2,
  });
};

// --- UI hook: combined state for the Digital Courses page --------------------

export const useDigitalCourses = () => {
  const { user } = useAuthStore();
  const studentClassLevel =
    (typeof user?.class === "object" ? user?.class?.name : user?.className) ||
    "Your Class";

  const [searchQuery, setSearchQuery] = useState("");
  const [termFilter, setTermFilter] = useState<string | undefined>(undefined);
  const [pathwayFilter, setPathwayFilter] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 350);

  const params: StudentCoursesQueryParams = {
    page,
    limit: 12,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(termFilter && termFilter !== "All" ? { term: termFilter } : {}),
    ...(pathwayFilter && pathwayFilter !== "All" ? { pathway: pathwayFilter } : {}),
  };

  const { data, isLoading, isError, refetch } = useStudentDigitalCourses(params);
  const { data: myEnrollmentsData } = useMyEnrollments();

  // Compute stats
  const stats = useMemo(() => {
    const enrollments = myEnrollmentsData?.enrollments ?? [];
    const totalCourses = data?.pagination?.total ?? (data?.courses?.length ?? 0);
    const enrolledCount = enrollments.length;
    const completedCount = enrollments.filter((e) => e.status === "COMPLETED").length;
    const inProgressCount = enrollments.filter((e) => e.status === "IN_PROGRESS").length;

    return {
      totalCourses,
      enrolledCount,
      completedCount,
      inProgressCount,
      tailoredForLevel: totalCourses,
    };
  }, [data, myEnrollmentsData]);

  // Modal state
  const [selectedCourse, setSelectedCourse] = useState<StudentCourseItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<StudentCourseItem | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const { mutate: doEnroll, isPending: isEnrolling } = useEnrollDigitalCourse();

  const handleOpenDetail = useCallback((item: StudentCourseItem) => {
    setSelectedCourse(item);
    setIsDetailModalOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedCourse(null);
  }, []);

  const handleOpenEnrollModal = useCallback((item: StudentCourseItem) => {
    setCourseToEnroll(item);
    setIsEnrollModalOpen(true);
  }, []);

  const handleCloseEnrollModal = useCallback(() => {
    setIsEnrollModalOpen(false);
    setCourseToEnroll(null);
  }, []);

  const handleConfirmEnroll = useCallback(
    (courseAssignmentId: number) => {
      doEnroll(courseAssignmentId, {
        onSuccess: () => {
          handleCloseEnrollModal();
        },
      });
    },
    [doEnroll, handleCloseEnrollModal],
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setTermFilter(undefined);
    setPathwayFilter(undefined);
    setPage(1);
  }, []);

  return {
    studentClassLevel,
    courses: data?.courses ?? [],
    pagination: data?.pagination,
    stats,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery: (val: string) => {
      setSearchQuery(val);
      setPage(1);
    },
    termFilter,
    setTermFilter: (val: string | undefined) => {
      setTermFilter(val);
      setPage(1);
    },
    pathwayFilter,
    setPathwayFilter: (val: string | undefined) => {
      setPathwayFilter(val);
      setPage(1);
    },
    page,
    setPage,
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
    handleResetFilters,
    refreshCourses: refetch,
  };
};