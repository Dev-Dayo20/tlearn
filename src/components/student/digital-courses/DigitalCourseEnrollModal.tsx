import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles, Clock, BookOpen, CheckCircle2, Loader2, ShieldCheck, Video, Link,
} from "lucide-react";
import type { StudentCourseItem } from "@/types/digitalCourse.types";

interface DigitalCourseEnrollModalProps {
  item: StudentCourseItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmEnroll: (courseAssignmentId: number) => void;
  isEnrolling: boolean;
  studentClassLevel?: string;
}

export const DigitalCourseEnrollModal: React.FC<DigitalCourseEnrollModalProps> = ({
  item, isOpen, onClose, onConfirmEnroll, isEnrolling, studentClassLevel,
}) => {
  if (!item) return null;
  const { course } = item;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 sm:p-7 rounded-3xl border border-border shadow-2xl space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
            <Sparkles className="h-7 w-7 text-amber-500 fill-amber-500" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Confirm Enrollment
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground font-medium">
            You are about to start your personalized digital learning journey!
          </DialogDescription>
        </div>

        {/* Course Summary */}
        <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3">
          <div className="flex items-start gap-3">
            {course.thumbnailUrl ? (
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="h-12 w-12 rounded-xl object-cover border border-primary/20 shrink-0"
              />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black text-primary uppercase tracking-wider">{course.level}</p>
              <h4 className="text-sm font-extrabold text-foreground">{course.title}</h4>
              {course.term && <p className="text-[11px] text-muted-foreground">{course.term}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs font-semibold text-muted-foreground">
            {course.durationMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {course.durationMinutes} min
              </span>
            )}
            {course.pathway && (
              <span className="flex items-center gap-1.5 truncate">
                <BookOpen className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{course.pathway}</span>
              </span>
            )}
            {course.videoUrl && (
              <span className="flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5 text-primary" />
                Video included
              </span>
            )}
            {course.externalUrl && (
              <span className="flex items-center gap-1.5">
                <Link className="h-3.5 w-3.5 text-primary" />
                External resource
              </span>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Instant access to all course materials</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Track your progress directly from your dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>Sponsored as part of your school's digital curriculum</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={isEnrolling}
            onClick={onClose}
            className="flex-1 rounded-xl h-11 font-bold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isEnrolling}
            onClick={() => onConfirmEnroll(item.schoolDigitalCourseId)}
            className="flex-1 rounded-xl h-11 font-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2"
          >
            {isEnrolling ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Enrolling...</>
            ) : (
              <><CheckCircle2 className="h-4 w-4" />Confirm & Start</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
