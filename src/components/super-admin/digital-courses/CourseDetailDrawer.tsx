import React, { useState } from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit, Trash2, Globe, Video, Link, Clock, School, BookOpen, Sparkles, Plus, X, Loader2,
} from "lucide-react";
import type { DigitalCourse, CourseStatus } from "@/types/digitalCourse.types";
import {
  useGetAdminDigitalCourse,
  useAssignCourseToSchool,
  useUnassignCourse,
} from "@/hooks/useAdminDigitalCourses";
import { cn } from "@/lib/utils";

interface CourseDetailDrawerProps {
  course: DigitalCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (course: DigitalCourse) => void;
  onDelete: (course: DigitalCourse) => void;
}

const STATUS_STYLES: Record<CourseStatus, { label: string; className: string }> = {
  PUBLISHED: { label: "Published", className: "bg-emerald-500/90 text-emerald-950 font-black border-transparent" },
  DRAFT: { label: "Draft", className: "bg-amber-500/90 text-amber-950 font-black border-transparent" },
  ARCHIVED: { label: "Archived", className: "bg-muted text-muted-foreground border-border" },
};

const LEVEL_STYLES: Record<string, string> = {
  BEGINNER: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  INTERMEDIATE: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30",
  ADVANCED: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export const CourseDetailDrawer: React.FC<CourseDetailDrawerProps> = ({
  course: initialCourse, isOpen, onClose, onEdit, onDelete,
}) => {
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [schoolIdInput, setSchoolIdInput] = useState("");
  const [classIdInput, setClassIdInput] = useState("");

  const { data: detailData, refetch } = useGetAdminDigitalCourse(
    isOpen && initialCourse ? initialCourse.id : null,
  );
  const { mutate: assignCourse, isPending: isAssigning } = useAssignCourseToSchool();
  const { mutate: unassignCourse, isPending: isUnassigning } = useUnassignCourse();

  if (!initialCourse) return null;

  const course = detailData?.course ?? initialCourse;
  const assignments = course.schoolDigitalCourses ?? [];

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    const sId = parseInt(schoolIdInput, 10);
    const cId = parseInt(classIdInput, 10);
    if (isNaN(sId) || isNaN(cId)) return;

    assignCourse(
      { courseId: course.id, schoolId: sId, classId: cId },
      {
        onSuccess: () => {
          setSchoolIdInput("");
          setClassIdInput("");
          setShowAssignForm(false);
          refetch();
        },
      },
    );
  };

  const handleUnassign = (schoolId: number, classId: number) => {
    unassignCourse(
      { courseId: course.id, schoolId, classId },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0 border-l border-border bg-card">
        {/* Cover Header */}
        <div className="relative h-48 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
          {course.thumbnailUrl ? (
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover opacity-85" />
          ) : (
            <BookOpen className="h-16 w-16 text-muted-foreground opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Badge variant="outline" className={cn("text-xs", STATUS_STYLES[course.status]?.className)}>
              {STATUS_STYLES[course.status]?.label}
            </Badge>
            {course.pathway && (
              <Badge variant="outline" className="bg-primary/90 text-primary-foreground font-bold text-xs border-transparent">
                <Sparkles className="h-3 w-3 mr-1 fill-current" />
                Pathway
              </Badge>
            )}
          </div>

          <SheetHeader className="absolute bottom-4 left-4 right-4 text-white text-left p-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className={cn("font-bold text-xs", LEVEL_STYLES[course.level] || "bg-muted")}>
                {course.level}
              </Badge>
              {course.term && (
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md">
                  {course.term}
                </span>
              )}
            </div>
            <SheetTitle className="font-black text-lg sm:text-xl leading-tight text-white">
              {course.title}
            </SheetTitle>
            <SheetDescription className="sr-only">{course.description || course.title}</SheetDescription>
          </SheetHeader>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Pathway */}
          {course.pathway && (
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs">
              <span className="text-muted-foreground font-medium">Specialisation Pathway: </span>
              <strong className="text-primary font-bold">{course.pathway}</strong>
            </div>
          )}

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-muted/40 border border-border text-center">
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Duration</p>
              <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                {course.durationMinutes ? `${course.durationMinutes} min` : "-"}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Schools Assigned</p>
              <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                {assignments.length || (course._count?.schoolDigitalCourses ?? 0)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">Course ID</p>
              <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">#{course.id}</p>
            </div>
          </div>

          {/* Description */}
          {course.description && (
            <div className="space-y-2">
              <h4 className="font-extrabold text-sm text-foreground">Course Description</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{course.description}</p>
            </div>
          )}

          {/* Media Links */}
          {(course.videoUrl || course.externalUrl) && (
            <div className="space-y-2">
              <h4 className="font-extrabold text-sm text-foreground">Course Materials</h4>
              <div className="space-y-2">
                {course.videoUrl && (
                  <a
                    href={course.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-primary hover:underline font-medium p-2.5 rounded-lg bg-primary/5 border border-primary/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Video className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Watch Video</span>
                  </a>
                )}
                {course.externalUrl && (
                  <a
                    href={course.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-primary hover:underline font-medium p-2.5 rounded-lg bg-primary/5 border border-primary/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Open External Resource</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* School Assignments Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                <School className="h-4 w-4 text-primary" />
                School Assignments ({assignments.length})
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAssignForm(!showAssignForm)}
                className="h-7 text-xs font-bold gap-1 rounded-lg"
              >
                {showAssignForm ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                {showAssignForm ? "Cancel" : "Assign to School"}
              </Button>
            </div>

            {/* Inline Assign Form */}
            {showAssignForm && (
              <form onSubmit={handleAssign} className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                <p className="text-xs font-bold text-foreground">Assign Course to Class</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-muted-foreground block mb-1">
                      School ID
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g. 1"
                      value={schoolIdInput}
                      onChange={(e) => setSchoolIdInput(e.target.value)}
                      className="h-8 text-xs bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-muted-foreground block mb-1">
                      Class ID
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g. 3"
                      value={classIdInput}
                      onChange={(e) => setClassIdInput(e.target.value)}
                      className="h-8 text-xs bg-background"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isAssigning}
                  className="w-full h-8 text-xs font-bold rounded-lg bg-primary text-primary-foreground"
                >
                  {isAssigning ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
                  Confirm Assignment
                </Button>
              </form>
            )}

            {assignments.length > 0 ? (
              <div className="space-y-2">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-2 min-w-0">
                      <School className="h-3.5 w-3.5 text-primary shrink-0" />
                      <div className="text-xs min-w-0">
                        <p className="font-bold text-foreground truncate">
                          {assignment.school?.name ?? `School #${assignment.schoolId}`}
                        </p>
                        <p className="text-muted-foreground truncate">
                          {assignment.class?.name ?? `Class #${assignment.classId}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-muted-foreground font-semibold">
                        {assignment._count?.enrollments ?? 0} enrolled
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isUnassigning}
                        onClick={() => handleUnassign(assignment.schoolId, assignment.classId)}
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                        title="Unassign course"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic p-2 text-center bg-muted/10 rounded-xl">
                No school assignments yet. Click &quot;Assign to School&quot; to assign this course.
              </p>
            )}
          </div>

          {/* Timestamps */}
          {course.createdAt && (
            <div className="text-[11px] text-muted-foreground space-y-1 pt-2 border-t border-border/40">
              <p>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
              {course.updatedAt && <p>Updated: {new Date(course.updatedAt).toLocaleDateString()}</p>}
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { onClose(); onDelete(course); }}
              className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30 font-bold"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Delete Course
            </Button>
            <Button
              size="sm"
              onClick={() => { onClose(); onEdit(course); }}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              <Edit className="h-4 w-4 mr-1.5" />
              Edit Course
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};