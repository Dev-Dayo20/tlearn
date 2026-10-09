import React from "react";
import {
  Eye, Edit, Trash2, MoreVertical, BookOpen,
  Globe, FileText, Clock, Video, Link,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { DigitalCourse, CourseStatus } from "@/types/digitalCourse.types";
import { cn } from "@/lib/utils";

interface DigitalCoursesTableProps {
  courses: DigitalCourse[];
  isLoading: boolean;
  onViewCourse: (course: DigitalCourse) => void;
  onEditCourse: (course: DigitalCourse) => void;
  onDeleteCourse: (course: DigitalCourse) => void;
  onToggleStatus?: (course: DigitalCourse, status: CourseStatus) => void;
}

const STATUS_STYLES: Record<CourseStatus, { label: string; className: string }> = {
  PUBLISHED: { label: "Published", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
  DRAFT: { label: "Draft", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30" },
  ARCHIVED: { label: "Archived", className: "bg-muted text-muted-foreground border-border" },
};

const LEVEL_STYLES: Record<string, string> = {
  BEGINNER: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  INTERMEDIATE: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30",
  ADVANCED: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export const DigitalCoursesTable: React.FC<DigitalCoursesTableProps> = ({
  courses, isLoading, onViewCourse, onEditCourse, onDeleteCourse, onToggleStatus,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 w-full rounded-xl bg-muted/40 animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="border-dashed py-12 text-center">
        <CardContent className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-foreground">No digital courses found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search or filters, or create your first course.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="min-w-[240px]">Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Term & Pathway</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Assignments</TableHead>
              <TableHead className="text-right w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow
                key={course.id}
                className="hover:bg-muted/30 transition-colors group cursor-pointer"
                onClick={() => onViewCourse(course)}
              >
                {/* Course */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-900 border border-border/70 shrink-0 flex items-center justify-center">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                        />
                      ) : (
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate max-w-[220px]">
                        {course.title}
                      </p>
                      {course.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[220px]">
                          {course.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {course.videoUrl && <span title="Has video"><Video className="h-3 w-3 text-primary" /></span>}
                        {course.externalUrl && <span title="External link"><Link className="h-3 w-3 text-primary" /></span>}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Status � clickable to toggle */}
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity",
                          STATUS_STYLES[course.status]?.className,
                        )}
                      >
                        {STATUS_STYLES[course.status]?.label}
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-36">
                      {(["PUBLISHED", "DRAFT", "ARCHIVED"] as CourseStatus[]).map((s) => (
                        <DropdownMenuItem
                          key={s}
                          disabled={course.status === s}
                          onClick={() => onToggleStatus?.(course, s)}
                        >
                          {STATUS_STYLES[s].label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                {/* Level */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] font-bold", LEVEL_STYLES[course.level])}
                  >
                    {course.level}
                  </Badge>
                </TableCell>

                {/* Term & Pathway */}
                <TableCell>
                  <div className="space-y-0.5">
                    {course.term && (
                      <span className="inline-block text-xs font-semibold text-foreground">
                        {course.term}
                      </span>
                    )}
                    {course.pathway && (
                      <p className="text-[11px] text-muted-foreground line-clamp-1 max-w-[140px]">
                        {course.pathway}
                      </p>
                    )}
                    {!course.term && !course.pathway && (
                      <span className="text-xs text-muted-foreground">�</span>
                    )}
                  </div>
                </TableCell>

                {/* Duration */}
                <TableCell>
                  {course.durationMinutes ? (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                      <Clock className="h-3 w-3 text-primary" />
                      {course.durationMinutes} min
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">�</span>
                  )}
                </TableCell>

                {/* Assignment count */}
                <TableCell>
                  <span className="text-xs font-bold text-foreground">
                    {course._count?.schoolDigitalCourses ?? 0}
                  </span>
                  <span className="text-[11px] text-muted-foreground ml-1">schools</span>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => onViewCourse(course)}>
                        <Eye className="w-4 h-4 mr-2 text-primary" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditCourse(course)}>
                        <Edit className="w-4 h-4 mr-2 text-amber-500" />
                        Edit Course
                      </DropdownMenuItem>
                      {course.status !== "PUBLISHED" && (
                        <DropdownMenuItem onClick={() => onToggleStatus?.(course, "PUBLISHED")}>
                          <Globe className="w-4 h-4 mr-2 text-emerald-500" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      {course.status === "PUBLISHED" && (
                        <DropdownMenuItem onClick={() => onToggleStatus?.(course, "DRAFT")}>
                          <FileText className="w-4 h-4 mr-2 text-amber-500" />
                          Set to Draft
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDeleteCourse(course)}
                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden border border-border hover:border-primary/40 transition-colors shadow-sm cursor-pointer"
            onClick={() => onViewCourse(course)}
          >
            <div className="relative h-24 w-full bg-slate-900 flex items-center justify-center">
              {course.thumbnailUrl ? (
                <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover opacity-90" />
              ) : (
                <BookOpen className="h-8 w-8 text-muted-foreground opacity-40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] font-bold backdrop-blur-md", STATUS_STYLES[course.status]?.className)}
                >
                  {STATUS_STYLES[course.status]?.label}
                </Badge>
                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md bg-black/50 text-white hover:bg-black/70">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => onViewCourse(course)}><Eye className="w-3.5 h-3.5 mr-2" />View</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditCourse(course)}><Edit className="w-3.5 h-3.5 mr-2" />Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDeleteCourse(course)} className="text-destructive focus:text-destructive">
                        <Trash2 className="w-3.5 h-3.5 mr-2" />Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <CardContent className="p-3 space-y-2">
              <h4 className="font-extrabold text-sm text-foreground line-clamp-1">{course.title}</h4>
              <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs text-muted-foreground">
                <span>{course.term || "�"}</span>
                <Badge variant="outline" className={cn("text-[10px] font-bold", LEVEL_STYLES[course.level])}>
                  {course.level}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
