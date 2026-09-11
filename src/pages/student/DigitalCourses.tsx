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
import { Loader2 } from "lucide-react";
import "@/pages/student/lessons.css";

const DigitalCourses: React.FC = () => {
  const {
    studentClassLevel,
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
  } = useDigitalCourses();

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setOnlyMyLevel(false);
    setSortBy("recommended");
  };

  return (
    <div className="tl-scope tl-page-bg min-h-full w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <DigitalCoursesHero
          studentClassLevel={studentClassLevel}
          tailoredCount={stats?.tailoredForLevel ?? 3}
          onlyMyLevel={onlyMyLevel}
          onToggleMyLevel={setOnlyMyLevel}
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
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          currentSortOption={currentSortOption}
          onSortChange={setSortBy}
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
                digital {courses.length === 1 ? "course" : "courses"}{" "}
                {onlyMyLevel && (
                  <span className="text-primary font-black">
                    tailored for {studentClassLevel}
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <DigitalCourseCard
                  key={course.id}
                  course={course}
                  onOpenDetail={handleOpenDetail}
                  onEnroll={handleOpenEnrollModal}
                  studentClassLevel={studentClassLevel}
                />
              ))}
            </div>
          </div>
        ) : (
          <DigitalCoursesEmptyState
            onResetFilters={handleResetFilters}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        )}
      </div>

      {/* Course Detail Modal */}
      <DigitalCourseDetailModal
        course={selectedCourse}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetail}
        onEnroll={handleOpenEnrollModal}
        studentClassLevel={studentClassLevel}
      />

      {/* Course Enrollment Modal */}
      <DigitalCourseEnrollModal
        course={courseToEnroll}
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
