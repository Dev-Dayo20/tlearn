import React from "react";
import { Clock, BookOpen, CheckCircle2, ChevronRight, GraduationCap, Sparkles, Play, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { StudentCourseItem } from "@/types/digitalCourse.types";
import { cn } from "@/lib/utils";

interface DigitalCourseCardProps {
  item: StudentCourseItem;
  onOpenDetail: (item: StudentCourseItem) => void;
  onEnroll: (item: StudentCourseItem) => void;
}

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  INTERMEDIATE: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30",
  ADVANCED: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export const DigitalCourseCard: React.FC<DigitalCourseCardProps> = ({
  item, onOpenDetail, onEnroll,
}) => {
  const { course, enrollment } = item;
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.status === "COMPLETED";
  const progress = enrollment?.progressPercent ?? 0;

  return (
    <div
      onClick={() => onOpenDetail(item)}
      className="group relative flex flex-col justify-between rounded-3xl bg-card border border-border/80 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1.5 overflow-hidden cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <BookOpen className="h-16 w-16 text-muted-foreground opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className={cn("text-[10px] font-black backdrop-blur-md", LEVEL_COLORS[course.level] || "bg-muted")}
          >
            {course.level}
          </Badge>

          {isCompleted ? (
            <Badge className="px-2.5 py-1 text-[11px] font-extrabold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </Badge>
          ) : isEnrolled ? (
            <Badge className="px-2.5 py-1 text-[11px] font-extrabold bg-primary text-primary-foreground shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3 fill-current" />
              Enrolled
            </Badge>
          ) : null}
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-1.5">
          {course.durationMinutes && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-white text-xs font-semibold">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              {course.durationMinutes} min
            </div>
          )}
          {course.videoUrl && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-white text-xs font-semibold">
              <Play className="h-3 w-3 text-primary fill-primary" />
              Video
            </div>
          )}
          {course.externalUrl && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-white text-xs font-semibold">
              <Link className="h-3 w-3 text-primary" />
              Resource
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Term & Pathway */}
          {(course.term || course.pathway) && (
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
              {course.term && (
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-black border border-primary/20">
                  {course.term}
                </span>
              )}
              {course.pathway && (
                <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60 truncate max-w-[220px]">
                  {course.pathway}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="font-extrabold text-base sm:text-lg text-foreground tracking-tight line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {course.title}
          </h3>

          {/* Description */}
          {course.description && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          )}
        </div>

        {/* Progress bar (if enrolled) */}
        {isEnrolled && !isCompleted && (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
              <span>Progress</span>
              <span className="font-bold text-primary">{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border/60 gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            {enrollment?.status ?? "Not Enrolled"}
          </span>

          {isEnrolled ? (
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl font-extrabold text-xs h-9 px-3 gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shrink-0"
              onClick={(e) => { e.stopPropagation(); onOpenDetail(item); }}
            >
              {isCompleted ? "View" : "Continue"}
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="rounded-xl font-extrabold text-xs h-9 px-3.5 gap-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20 shrink-0 group-hover:scale-105 transition-transform"
              onClick={(e) => { e.stopPropagation(); onEnroll(item); }}
            >
              Enroll Now
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
