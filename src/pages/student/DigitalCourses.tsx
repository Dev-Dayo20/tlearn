import React from "react";
import { useDigitalCourses } from "@/hooks/useDigitalCourses";
import {
  DigitalCoursesHero,
  DigitalCoursesStatsStrip,
  DigitalCoursesFilterBar,
  DigitalCourseCard,
  DigitalCourseDetailModal,
  DigitalCourseEnrollModal,
  DigitalCoursesEmptyState,
} from "@/components/student/digital-courses";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/pages/student/lessons.css";

const DigitalCourses: React.FC = () => {
  const {
    studentClassLevel,
    courses,
    pagination,
    stats,
    isLoading,
    searchQuery,
    setSearchQuery,
    termFilter,
    setTermFilter,
    pathwayFilter,
    setPathwayFilter,
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
  } = useDigitalCourses();

  return (
    <div className="tl-scope tl-page-bg min-h-full w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <DigitalCoursesHero
          studentClassLevel={studentClassLevel}
          tailoredCount={stats?.totalCourses ?? courses.length}
          enrolledCount={stats?.enrolledCount ?? 0}
        />

        {/* Quick Stats Strip */}
        <DigitalCoursesStatsStrip
          stats={stats}
          studentClassLevel={studentClassLevel}
        />

        {/* Filter and Search Bar */}
        <DigitalCoursesFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          termFilter={termFilter}
          onTermChange={setTermFilter}
          pathwayFilter={pathwayFilter}
          onPathwayChange={setPathwayFilter}
          onResetFilters={handleResetFilters}
        />

        {/* Course Grid & State Handlers */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center py-24 rounded-3xl bg-card border border-border shadow-soft">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="font-extrabold text-lg text-foreground">
              Loading tailored digital courses...
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Fetching curriculum matched for {studentClassLevel}
            </p>
          </div>
        ) : courses.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-bold text-muted-foreground">
                Showing{" "}
                <strong className="text-foreground">{courses.length}</strong>{" "}
                {pagination ? `of ${pagination.total}` : ""}{" "}
                digital {courses.length === 1 ? "course" : "courses"}{" "}
                <span className="text-primary font-black">
                  tailored for {studentClassLevel}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((item) => (
                <DigitalCourseCard
                  key={item.schoolDigitalCourseId}
                  item={item}
                  onOpenDetail={handleOpenDetail}
                  onEnroll={handleOpenEnrollModal}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground font-semibold">
                  Page {pagination.currentPage} of {pagination.totalPages} ({pagination.total} courses)
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-xl text-xs font-bold gap-1"
                    disabled={!pagination.hasPreviousPage}
                    onClick={() => setPage(page - 1)}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-xl text-xs font-bold gap-1"
                    disabled={!pagination.hasNextPage}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <DigitalCoursesEmptyState
            onResetFilters={handleResetFilters}
            searchQuery={searchQuery}
            activeCategory={termFilter || pathwayFilter}
          />
        )}
      </div>

      {/* Course Detail Modal */}
      <DigitalCourseDetailModal
        item={selectedCourse}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetail}
        onEnroll={handleOpenEnrollModal}
        studentClassLevel={studentClassLevel}
      />

      {/* Course Enrollment Modal */}
      <DigitalCourseEnrollModal
        item={courseToEnroll}
        isOpen={isEnrollModalOpen}
        onClose={handleCloseEnrollModal}
        onConfirmEnroll={handleConfirmEnroll}
        isEnrolling={isEnrolling}
        studentClassLevel={studentClassLevel}
      />
    </div>
  );
};

export default DigitalCourses;