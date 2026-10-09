import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, CheckCircle2, Sparkles, ChevronRight, Video, Link, ArrowRight } from "lucide-react";
import type { StudentCourseItem } from "@/types/digitalCourse.types";
import { cn } from "@/lib/utils";

interface DigitalCourseDetailModalProps {
  item: StudentCourseItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (item: StudentCourseItem) => void;
  studentClassLevel?: string;
}

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  INTERMEDIATE: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30",
  ADVANCED: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export const DigitalCourseDetailModal: React.FC<DigitalCourseDetailModalProps> = ({
  item, isOpen, onClose, onEnroll, studentClassLevel,
}) => {
  if (!item) return null;
  const { course, enrollment } = item;
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.status === "COMPLETED";
  const progress = enrollment?.progressPercent ?? 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border border-border shadow-2xl">
        {/* Banner */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          {course.thumbnailUrl ? (
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover opacity-80" />
          ) : (
            <BookOpen className="h-16 w-16 text-muted-foreground opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Badge variant="outline" className={cn("text-[10px] font-black backdrop-blur-md", LEVEL_COLORS[course.level] || "")}>
              {course.level}
            </Badge>
            {isEnrolled && (
              <Badge className={cn(
                "text-[11px] font-extrabold shadow-md flex items-center gap-1",
                isCompleted ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground"
              )}>
                <CheckCircle2 className="h-3 w-3" />
                {isCompleted ? "Completed" : "Enrolled"}
              </Badge>
            )}
          </div>

          {/* Overlay headline */}
          <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
            {(course.term || course.pathway) && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-black">
                {course.term && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 shadow-sm">{course.term}</span>
                )}
                {course.pathway && (
                  <span className="px-2 py-0.5 rounded-md bg-white/20 text-white backdrop-blur-md border border-white/20">
                    {course.pathway}
                  </span>
                )}
              </div>
            )}
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md text-left">
                {course.title}
              </DialogTitle>
              <DialogDescription className="sr-only">{course.description}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 font-semibold">
              {course.durationMinutes && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {course.durationMinutes} min
                </span>
              )}
              {(course.videoUrl || course.externalUrl) && (
                <span className="flex items-center gap-1">
                  {course.videoUrl ? <Video className="h-3.5 w-3.5 text-primary" /> : <Link className="h-3.5 w-3.5 text-primary" />}
                  Materials available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Enrollment progress */}
          {isEnrolled && !isCompleted && (
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-foreground">Your Progress</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Status: <strong className="text-foreground">{enrollment?.status}</strong>
              </p>
            </div>
          )}

          {isCompleted && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
              <div>
                <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">Course Completed!</p>
                <p className="text-xs text-muted-foreground">You have successfully completed this course.</p>
              </div>
            </div>
          )}

          {/* Description */}
          {course.description && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">About this course</h4>
              <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">{course.description}</p>
            </div>
          )}

          {/* Media Links */}
          {(course.videoUrl || course.externalUrl) && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Course Materials</h4>
              <div className="space-y-2">
                {course.videoUrl && (
                  <a
                    href={course.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline font-medium p-3 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <Video className="h-4 w-4 shrink-0" />
                    Watch Course Video
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                )}
                {course.externalUrl && (
                  <a
                    href={course.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline font-medium p-3 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <Link className="h-4 w-4 shrink-0" />
                    Open External Resource
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Digital Skills Certification Course</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button type="button" variant="outline" className="rounded-xl font-bold h-11 px-5 flex-1 sm:flex-none" onClick={onClose}>
                Close
              </Button>
              {isEnrolled ? (
                <Button
                  type="button"
                  className="rounded-xl font-black h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-none gap-2"
                  onClick={onClose}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isCompleted ? "Completed" : "Already Enrolled"}
                </Button>
              ) : (
                <Button
                  type="button"
                  className="rounded-xl font-black h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-none gap-2 shadow-lg shadow-primary/20"
                  onClick={() => { onClose(); onEnroll(item); }}
                >
                  Enroll Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
