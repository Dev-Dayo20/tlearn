import React, { useState } from "react";
import { Laptop, Users, CheckCircle2, Search, ChevronLeft, ChevronRight, Clock, BookOpen, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  useSchoolDigitalCourses,
  useSchoolDigitalStats,
  useSchoolCourseEnrollments,
} from "@/hooks/useSchAdminDigitalCourses";
import { MetricCard } from "@/components/super-admin/MetricCard";
import { useDebounce } from "@/hooks/useDebounce";
import type { SchoolDigitalCourse, SchoolAdminCoursesQueryParams } from "@/types/digitalCourse.types";
import { cn } from "@/lib/utils";

const LEVEL_STYLES: Record<string, string> = {
  BEGINNER: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  INTERMEDIATE: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30",
  ADVANCED: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

const SchoolDigitalCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [termFilter, setTermFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState<SchoolDigitalCourse | null>(null);
  const [enrollPage, setEnrollPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 350);

  const queryParams: SchoolAdminCoursesQueryParams = {
    page: currentPage,
    limit: 10,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(termFilter ? { term: termFilter } : {}),
  };

  const { data: coursesData, isLoading: coursesLoading } = useSchoolDigitalCourses(queryParams);
  const { data: statsData, isLoading: statsLoading } = useSchoolDigitalStats();
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useSchoolCourseEnrollments(
    selectedAssignment?.id ?? null,
    { page: enrollPage, limit: 10 },
  );

  const courses = coursesData?.courses ?? [];
  const pagination = coursesData?.pagination;
  const stats = statsData?.stats;
  const enrollments = enrollmentsData?.enrollments ?? [];
  const enrollPagination = enrollmentsData?.pagination;

  const hasFilters = searchTerm.trim() !== "" || termFilter !== "";

  const completedPct = stats && stats.totalEnrollments > 0
    ? Math.round((stats.completedEnrollments / stats.totalEnrollments) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Digital Courses</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          View digital courses assigned to your school and track student enrollment progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Assigned Courses"
          value={statsLoading ? "..." : stats?.totalAssigned ?? 0}
          icon={Laptop}
          description="Courses assigned to your school"
        />
        <MetricCard
          title="Total Enrollments"
          value={statsLoading ? "..." : stats?.totalEnrollments ?? 0}
          icon={Users}
          description="Across all digital courses"
        />
        <MetricCard
          title="Completed"
          value={statsLoading ? "..." : stats?.completedEnrollments ?? 0}
          icon={CheckCircle2}
          description={`${completedPct}% completion rate`}
        />
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses by title or description..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-10 bg-background"
            />
          </div>
          <Select
            value={termFilter || "all"}
            onValueChange={(v) => { setTermFilter(v === "all" ? "" : v); setCurrentPage(1); }}
          >
            <SelectTrigger className="h-10 bg-background">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              <SelectItem value="First Term">First Term</SelectItem>
              <SelectItem value="Second Term">Second Term</SelectItem>
              <SelectItem value="Third Term">Third Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {hasFilters && (
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/40">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-primary" />
              {pagination?.total ?? courses.length} result(s)
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-destructive hover:bg-destructive/10 px-2"
              onClick={() => { setSearchTerm(""); setTermFilter(""); setCurrentPage(1); }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Course List */}
      {coursesLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/40 animate-pulse border border-border" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-lg text-foreground">No digital courses found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {hasFilters
                ? "Try adjusting your search or filters."
                : "Your school has no digital courses assigned yet. Contact your Super Admin."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {courses.map((assignment) => {
            const course = assignment.course!;
            return (
              <Card
                key={assignment.id}
                className="border border-border hover:border-primary/40 transition-colors cursor-pointer shadow-sm"
                onClick={() => { setSelectedAssignment(assignment); setEnrollPage(1); }}
              >
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Thumbnail */}
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-900 border border-border/70 shrink-0 flex items-center justify-center">
                      {course.thumbnailUrl ? (
                        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{course.title}</p>
                      {course.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{course.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <Badge variant="outline" className={cn("text-[10px] font-bold", LEVEL_STYLES[course.level] || "")}>
                          {course.level}
                        </Badge>
                        {course.term && (
                          <span className="text-[11px] text-muted-foreground font-medium">{course.term}</span>
                        )}
                        {assignment.class && (
                          <span className="text-[11px] text-muted-foreground">� {assignment.class.name}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-right">
                    {course.durationMinutes && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.durationMinutes} min
                      </div>
                    )}
                    <div className="text-right">
                      <p className="text-sm font-black text-foreground">{assignment._count?.enrollments ?? 0}</p>
                      <p className="text-[11px] text-muted-foreground">enrolled</p>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs font-semibold px-3">
                      View Enrollments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Page <strong>{pagination.currentPage}</strong> of <strong>{pagination.totalPages}</strong>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline" size="sm"
              disabled={!pagination.hasPreviousPage}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-8 rounded-lg px-2.5 text-xs"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />Previous
            </Button>
            <Button
              variant="outline" size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="h-8 rounded-lg px-2.5 text-xs"
            >
              Next<ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Enrollments Side Panel */}
      <Sheet open={!!selectedAssignment} onOpenChange={(open) => !open && setSelectedAssignment(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card border-l border-border p-0">
          <div className="p-6 border-b border-border">
            <SheetHeader>
              <SheetTitle className="font-black text-base text-foreground">
                {selectedAssignment?.course?.title ?? "Enrollments"}
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                {selectedAssignment?.class?.name} � {selectedAssignment?._count?.enrollments ?? 0} students enrolled
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="p-4 space-y-3">
            {enrollmentsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-xl bg-muted/40 animate-pulse" />
                ))}
              </div>
            ) : enrollments.length === 0 ? (
              <div className="py-12 text-center">
                <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm font-bold text-muted-foreground">No enrollments yet</p>
              </div>
            ) : (
              enrollments.map((enrollment) => {
                const progressColor =
                  enrollment.status === "COMPLETED" ? "bg-emerald-500" :
                  enrollment.status === "IN_PROGRESS" ? "bg-primary" :
                  "bg-muted-foreground";

                return (
                  <div key={enrollment.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">
                        {enrollment.student?.name ?? `Student #${enrollment.studentId}`}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {enrollment.student?.studentId ?? ""}
                      </p>
                      {/* Progress bar */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", progressColor)}
                            style={{ width: `${enrollment.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground shrink-0">
                          {enrollment.progressPercent}%
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-bold shrink-0",
                        enrollment.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30" :
                        enrollment.status === "IN_PROGRESS" ? "bg-primary/10 text-primary border-primary/30" :
                        "bg-muted text-muted-foreground border-border",
                      )}
                    >
                      {enrollment.status}
                    </Badge>
                  </div>
                );
              })
            )}

            {/* Enrollments Pagination */}
            {enrollPagination && enrollPagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  Page {enrollPagination.currentPage} of {enrollPagination.totalPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline" size="sm"
                    disabled={!enrollPagination.hasPreviousPage}
                    onClick={() => setEnrollPage((p) => Math.max(1, p - 1))}
                    className="h-7 text-xs px-2 rounded-lg"
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outline" size="sm"
                    disabled={!enrollPagination.hasNextPage}
                    onClick={() => setEnrollPage((p) => p + 1)}
                    className="h-7 text-xs px-2 rounded-lg"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SchoolDigitalCoursesPage;
