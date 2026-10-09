import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, School, BookOpen, ChevronLeft, ChevronRight, Search, Loader2 } from "lucide-react";
import { useGetAdminDigitalEnrollments } from "@/hooks/useAdminDigitalCourses";
import { cn } from "@/lib/utils";

export const CrossSchoolEnrollmentsTable: React.FC = () => {
  const [schoolIdInput, setSchoolIdInput] = useState("");
  const [filterSchoolId, setFilterSchoolId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAdminDigitalEnrollments({
    schoolId: filterSchoolId,
    page,
    limit: 10,
  });

  const enrollments = data?.enrollments ?? [];
  const pagination = data?.pagination;

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const sId = parseInt(schoolIdInput, 10);
    setFilterSchoolId(isNaN(sId) ? undefined : sId);
    setPage(1);
  };

  const handleClear = () => {
    setSchoolIdInput("");
    setFilterSchoolId(undefined);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
        <form onSubmit={handleFilter} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Filter by School ID..."
              value={schoolIdInput}
              onChange={(e) => setSchoolIdInput(e.target.value)}
              className="pl-8 h-9 text-xs"
            />
          </div>
          <Button type="submit" size="sm" className="h-9 text-xs font-bold">
            Filter
          </Button>
          {filterSchoolId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-9 text-xs text-muted-foreground"
            >
              Clear
            </Button>
          )}
        </form>

        <p className="text-xs text-muted-foreground font-semibold">
          {pagination ? `${pagination.total} total enrollments across schools` : ""}
        </p>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-black">Student</TableHead>
              <TableHead className="text-xs font-black">School &amp; Class</TableHead>
              <TableHead className="text-xs font-black">Digital Course</TableHead>
              <TableHead className="text-xs font-black">Progress</TableHead>
              <TableHead className="text-xs font-black">Status</TableHead>
              <TableHead className="text-xs font-black">Enrolled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <Loader2 className="h-6 w-6 text-primary animate-spin mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Loading enrollments...</p>
                </TableCell>
              </TableRow>
            ) : enrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground text-xs font-semibold">
                  No enrollments found.
                </TableCell>
              </TableRow>
            ) : (
              enrollments.map((item) => {
                const sdc = item.schoolDigitalCourse;
                return (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                          {item.student?.name ? item.student.name.charAt(0) : "S"}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-foreground">
                            {item.student?.name ?? `Student #${item.studentId}`}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {item.student?.studentId ?? ""}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="font-semibold text-foreground">
                          {sdc?.school?.name ?? `School #${sdc?.schoolId}`}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {sdc?.class?.name ?? `Class #${sdc?.classId}`}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="font-bold text-foreground">
                          {sdc?.course?.title ?? "Course"}
                        </p>
                        {sdc?.course?.term && (
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {sdc.course.term}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-28 space-y-1">
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              item.status === "COMPLETED" ? "bg-emerald-500" : "bg-primary",
                            )}
                            style={{ width: `${item.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">
                          {item.progressPercent}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-bold",
                          item.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30" :
                          item.status === "IN_PROGRESS" ? "bg-primary/10 text-primary border-primary/30" :
                          "bg-muted text-muted-foreground border-border",
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {item.enrolledAt ? new Date(item.enrolledAt).toLocaleDateString() : "-"}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Page <strong>{pagination.currentPage}</strong> of <strong>{pagination.totalPages}</strong>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPreviousPage}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 rounded-lg px-2.5 text-xs font-bold"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 rounded-lg px-2.5 text-xs font-bold"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};