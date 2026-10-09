import React, { useState } from "react";
import {
  Plus,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Globe,
  FileText,
  TrendingUp,
  Layers,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DigitalCoursesFilters,
  DigitalCoursesTable,
  CourseFormDialog,
  CourseDetailDrawer,
  DeleteCourseDialog,
  BulkAssignDialog,
  CrossSchoolEnrollmentsTable,
} from "@/components/super-admin/digital-courses";
import {
  useGetAdminDigitalCourses,
  useCreateDigitalCourse,
  useUpdateDigitalCourse,
  useDeleteDigitalCourse,
  useToggleCourseStatus,
} from "@/hooks/useAdminDigitalCourses";
import { MetricCard } from "@/components/super-admin/MetricCard";
import { useAuthStore } from "@/store/authStore";
import { useDebounce } from "@/hooks/useDebounce";
import type {
  DigitalCourse,
  CourseStatus,
  SuperAdminCoursesQueryParams,
} from "@/types/digitalCourse.types";
import { cn } from "@/lib/utils";

const DigitalCoursesPage: React.FC = () => {
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const [activeTab, setActiveTab] = useState<"catalog" | "enrollments">(
    "catalog",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "">("");
  const [termFilter, setTermFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 350);

  const queryParams: SuperAdminCoursesQueryParams = {
    page: currentPage,
    limit: 10,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(statusFilter ? { status: statusFilter as CourseStatus } : {}),
    ...(termFilter ? { term: termFilter } : {}),
  };

  const { data, isLoading } = useGetAdminDigitalCourses(queryParams);
  const { mutate: createCourse, isPending: isCreating } =
    useCreateDigitalCourse();
  const { mutate: updateCourse, isPending: isUpdating } =
    useUpdateDigitalCourse();
  const { mutate: deleteCourse, isPending: isDeleting } =
    useDeleteDigitalCourse();
  const { mutate: toggleStatus } = useToggleCourseStatus();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<DigitalCourse | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<DigitalCourse | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<DigitalCourse | null>(
    null,
  );
  const [isBulkAssignOpen, setIsBulkAssignOpen] = useState(false);

  const courses = data?.courses ?? [];
  const metrics = data?.metrics;
  const pagination = data?.pagination;

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTermFilter("");
    setCurrentPage(1);
  };

  const handleFormSubmit = (coursePayload: any) => {
    if (editingCourse) {
      updateCourse(
        { id: editingCourse.id, payload: coursePayload },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingCourse(null);
          },
        },
      );
    } else {
      createCourse(coursePayload, {
        onSuccess: () => setIsFormOpen(false),
      });
    }
  };

  const handleConfirmDelete = (courseId: number) => {
    deleteCourse(courseId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setCourseToDelete(null);
        if (selectedCourse && selectedCourse.id === courseId) {
          setIsDetailOpen(false);
          setSelectedCourse(null);
        }
      },
    });
  };

  if (!isSuperAdmin) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto my-12 bg-card rounded-2xl border border-border shadow-soft">
        <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Access Restricted</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Only users with the{" "}
          <strong className="text-foreground">Super Admin</strong> role have
          permissions to manage digital courses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
              Digital Courses
            </h2>
            <Badge
              variant="outline"
              className="text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border-primary/25 flex items-center gap-1"
            >
              <ShieldCheck className="h-3 w-3" />
              Super Admin
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Create, manage curriculum, assign to schools and track cross-school
            enrollments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsBulkAssignOpen(true)}
            className="rounded-xl h-10 px-3.5 font-bold text-xs sm:text-sm border-border gap-1.5 shadow-sm"
          >
            <Layers className="w-4 h-4 text-primary" />
            Bulk Assign
          </Button>

          <Button
            onClick={() => {
              setEditingCourse(null);
              setIsFormOpen(true);
            }}
            className="rounded-xl h-10 px-4 font-bold text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Digital Course
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab("catalog")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
            activeTab === "catalog"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          )}
        >
          <FileText className="h-4 w-4" />
          Course Catalog
        </button>
        <button
          onClick={() => setActiveTab("enrollments")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
            activeTab === "enrollments"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          )}
        >
          <Users className="h-4 w-4" />
          Cross-School Enrollments
        </button>
      </div>

      {activeTab === "catalog" ? (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Courses"
              value={isLoading ? "..." : (metrics?.totalCourses ?? 0)}
              icon={FileText}
              description="Full course catalog"
            />
            <MetricCard
              title="Published"
              value={isLoading ? "..." : (metrics?.publishedCourses ?? 0)}
              icon={Globe}
              description="Live & visible to students"
            />
            <MetricCard
              title="Draft"
              value={isLoading ? "..." : (metrics?.draftCourses ?? 0)}
              icon={FileText}
              description="Pending review"
            />
            <MetricCard
              title="School Assignments"
              value={isLoading ? "..." : (metrics?.totalAssignments ?? 0)}
              icon={TrendingUp}
              description="Total class-level assignments"
            />
          </div>

          {/* Filters */}
          <DigitalCoursesFilters
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            statusFilter={statusFilter}
            onStatusFilterChange={(val) => {
              setStatusFilter(val as CourseStatus | "");
              setCurrentPage(1);
            }}
            termFilter={termFilter}
            onTermFilterChange={(val) => {
              setTermFilter(val);
              setCurrentPage(1);
            }}
            onClearFilters={handleClearFilters}
            totalFiltered={pagination?.total ?? courses.length}
          />

          {/* Table */}
          <DigitalCoursesTable
            courses={courses}
            isLoading={isLoading}
            onViewCourse={(c) => {
              setSelectedCourse(c);
              setIsDetailOpen(true);
            }}
            onEditCourse={(c) => {
              setEditingCourse(c);
              setIsFormOpen(true);
            }}
            onDeleteCourse={(c) => {
              setCourseToDelete(c);
              setIsDeleteDialogOpen(true);
            }}
            onToggleStatus={(course, status) =>
              toggleStatus({ id: course.id, status })
            }
          />

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-muted-foreground font-semibold">
                Showing Page {pagination.currentPage} of {pagination.totalPages}{" "}
                ({pagination.total} total courses)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-8 rounded-xl px-3 text-xs font-bold"
                >
                  <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="h-8 rounded-xl px-3 text-xs font-bold"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <CrossSchoolEnrollmentsTable />
      )}

      {/* Course Form Dialog (Create/Edit) */}
      <CourseFormDialog
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingCourse}
        isSubmitting={isCreating || isUpdating}
      />

      {/* Course Detail Drawer with assignments, assign & unassign */}
      <CourseDetailDrawer
        course={selectedCourse}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedCourse(null);
        }}
        onEdit={(course) => {
          setIsDetailOpen(false);
          setEditingCourse(course);
          setIsFormOpen(true);
        }}
        onDelete={(course) => {
          setIsDetailOpen(false);
          setCourseToDelete(course);
          setIsDeleteDialogOpen(true);
        }}
      />

      {/* Delete Course Confirmation Dialog */}
      <DeleteCourseDialog
        course={courseToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setCourseToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Bulk Assign Dialog */}
      <BulkAssignDialog
        isOpen={isBulkAssignOpen}
        onClose={() => setIsBulkAssignOpen(false)}
        availableCourses={courses}
      />
    </div>
  );
};

export default DigitalCoursesPage;
