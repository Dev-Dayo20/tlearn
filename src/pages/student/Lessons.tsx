import {
  BookOpen,
  Clock,
  CheckCircle2,
  Loader2,
  Flame,
  Search,
} from "lucide-react";
import {
  StatCard,
  LessonCard,
  LessonsFilterBar,
  LessonsPagination,
} from "@/components/student/lessons";
import { useStudentLessons, ITEMS_PER_PAGE } from "@/hooks/useStudentLessons";
import "@/pages/student/lessons.css";

const Lessons = () => {
  const {
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
  } = useStudentLessons();

  return (
    <div className="tl-scope tl-page-bg min-h-full w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1
              className="tl-display text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: "hsl(var(--primary))" }}
            >
              My Lessons
            </h1>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Explore and track your academic curriculum materials
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Flame className="h-3.5 w-3.5 fill-current" />
              {weeklyStat} lessons this week
            </span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            label="Total Lessons"
            value={totalLessonsStat}
            gradient="var(--gradient-primary)"
          />
          <StatCard
            icon={<Clock className="h-6 w-6" />}
            label="In Progress"
            value={inProgressStat}
            gradient="var(--gradient-warning)"
          />
          <StatCard
            icon={<CheckCircle2 className="h-6 w-6" />}
            label="Completed"
            value={completedStat}
            gradient="var(--gradient-success)"
          />
        </div>

        {/* Search & Category Filter Bar with Dynamic Sort */}
        <LessonsFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          currentSortOption={currentSortOption}
          sortOptions={sortOptions}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Lessons grid & Loading states */}
        {isLoading ? (
          <div className="tl-card flex flex-col items-center justify-center text-center py-20 px-6">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p
              className="font-semibold text-lg"
              style={{ color: "hsl(var(--primary))" }}
            >
              Loading lessons...
            </p>
          </div>
        ) : displayedLessons.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onProgressUpdate={handleProgressUpdate}
                />
              ))}
            </div>

            {/* Structured Pagination Bar */}
            <LessonsPagination
              currentPage={currentPage}
              totalPagesCount={totalPagesCount}
              totalLessonsCount={totalLessonsCount}
              startIndex={startIndex}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <div className="tl-card flex flex-col items-center justify-center text-center py-16 px-6">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4 text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Search className="h-6 w-6" />
            </div>
            <p
              className="tl-display font-bold text-lg"
              style={{ color: "hsl(var(--primary))" }}
            >
              No lessons match your search
            </p>
            <p
              className="text-sm mt-1 max-w-sm"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Try a different keyword, or clear the filter to see everything
              again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
