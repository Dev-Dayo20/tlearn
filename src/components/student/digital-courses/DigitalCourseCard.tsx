import React from "react";
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DigitalCourse } from "@/types/digitalCourse.types";
import { cn } from "@/lib/utils";

interface DigitalCourseCardProps {
  course: DigitalCourse;
  onOpenDetail: (course: DigitalCourse) => void;
  onEnroll: (course: DigitalCourse) => void;
  studentClassLevel: string;
}

export const DigitalCourseCard: React.FC<DigitalCourseCardProps> = ({
  course,
  onOpenDetail,
  onEnroll,
  studentClassLevel,
}) => {
  const isMatchForLevel = course.eligibleClassLevels.some(
    (lvl) =>
      studentClassLevel.toLowerCase().includes(lvl) ||
      lvl.includes(studentClassLevel.toLowerCase()),
  );

  return (
    <div
      onClick={() => onOpenDetail(course)}
      className="group relative flex flex-col justify-between rounded-3xl bg-card border border-border/80 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1.5 overflow-hidden cursor-pointer"
    >
      {/* Thumbnail Banner with Gradient Overlay */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-foreground border border-white/20 shadow-sm"
          >
            {course.category}
          </Badge>

          {course.isEnrolled ? (
            <Badge className="px-2.5 py-1 text-[11px] font-extrabold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Enrolled
            </Badge>
          ) : isMatchForLevel ? (
            <Badge className="px-2.5 py-1 text-[11px] font-extrabold bg-amber-500 text-slate-950 shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3 fill-current" />
              Matched for {studentClassLevel}
            </Badge>
          ) : course.badge ? (
            <Badge
              variant="outline"
              className="px-2.5 py-1 text-[11px] font-bold backdrop-blur-md bg-black/50 text-white border-white/30"
            >
              {course.badge}
            </Badge>
          ) : null}
        </div>

        {/* Bottom Thumbnail Overlay Metadata */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <GraduationCap className="h-3.5 w-3.5 text-amber-400" />
            <span>{course.targetLevel}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-white/60 text-[10px]">
              ({course.reviewsCount})
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Term & Pathway Pill */}
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

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-muted-foreground border border-border/50"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold text-muted-foreground">
                +{course.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Course Metrics & Instructor */}
        <div className="space-y-3 pt-2 border-t border-border/60">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              {course.lessonsCount} lessons
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-primary" />
              {course.enrolledCount} enrolled
            </span>
          </div>

          {/* Instructor & CTA Button */}
          <div className="flex items-center justify-between pt-1 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="h-7 w-7 rounded-full object-cover border border-primary/20 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {course.instructor.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {course.instructor.role}
                </p>
              </div>
            </div>

            {course.isEnrolled ? (
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl font-extrabold text-xs h-9 px-3 gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(course);
                }}
              >
                Continue
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button
                size="sm"
                className="rounded-xl font-extrabold text-xs h-9 px-3.5 gap-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20 shrink-0 group-hover:scale-105 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  onEnroll(course);
                }}
              >
                Enroll Now
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
