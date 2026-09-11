import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  BookOpen,
  GraduationCap,
  Award,
  CheckCircle2,
  Sparkles,
  Users,
  Check,
  ChevronRight,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { DigitalCourse } from "@/types/digitalCourse.types";

interface DigitalCourseDetailModalProps {
  course: DigitalCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: DigitalCourse) => void;
  studentClassLevel: string;
}

export const DigitalCourseDetailModal: React.FC<
  DigitalCourseDetailModalProps
> = ({ course, isOpen, onClose, onEnroll, studentClassLevel }) => {
  if (!course) return null;

  const isMatchForLevel = course.eligibleClassLevels.some(
    (lvl) =>
      studentClassLevel.toLowerCase().includes(lvl) ||
      lvl.includes(studentClassLevel.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border border-border shadow-2xl">
        {/* Modal Banner */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />

          {/* Top Status Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Badge className="bg-white/90 dark:bg-slate-900/90 text-foreground font-black text-xs uppercase tracking-wider backdrop-blur-md">
              {course.category}
            </Badge>

            {isMatchForLevel && (
              <Badge className="bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md">
                <Sparkles className="h-3.5 w-3.5 fill-current" />
                Tailored for {studentClassLevel}
              </Badge>
            )}
          </div>

          {/* Overlay Headline */}
          <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
            {(course.term || course.pathway) && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-black">
                {course.term && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 shadow-sm">
                    {course.term}
                  </span>
                )}
                {course.pathway && (
                  <span className="px-2 py-0.5 rounded-md bg-white/20 text-white backdrop-blur-md border border-white/20">
                    {course.pathway}
                  </span>
                )}
              </div>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
              {course.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 font-semibold">
              <span className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-amber-400" />
                {course.targetLevel}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {course.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                {course.lessonsCount} lessons ({course.modulesCount} modules)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                {course.rating.toFixed(1)} ({course.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              About this course
            </h4>
            <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
              {course.fullDescription}
            </p>
          </div>

          {/* Skills Acquired */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Skills you will master
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20"
                >
                  <Check className="h-3.5 w-3.5" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/80">
            <h4 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              What you will achieve
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {course.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs font-semibold text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Syllabus Accordion/List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                Course Curriculum ({course.modulesCount} Modules)
              </h4>
              <span className="text-xs font-bold text-muted-foreground">
                {course.lessonsCount} lessons total
              </span>
            </div>

            <div className="space-y-2.5">
              {course.curriculum.map((module) => (
                <div
                  key={module.moduleNumber}
                  className="p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 rounded-lg bg-primary/10 text-primary text-xs font-black items-center justify-center shrink-0">
                        {module.moduleNumber}
                      </span>
                      <h5 className="font-bold text-sm text-foreground">
                        {module.title}
                      </h5>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground shrink-0">
                      {module.duration} • {module.lessonsCount} lessons
                    </span>
                  </div>

                  <ul className="pl-9 space-y-1 text-xs text-muted-foreground list-disc marker:text-primary/60">
                    {module.topics.map((topic, tidx) => (
                      <li key={tidx}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor & Prerequisites Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-center gap-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="h-12 w-12 rounded-2xl object-cover border border-primary/20 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">
                  Lead Instructor
                </p>
                <p className="text-sm font-extrabold text-foreground truncate">
                  {course.instructor.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {course.instructor.role}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex flex-col justify-center">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">
                Prerequisites
              </p>
              <p className="text-xs font-semibold text-foreground mt-0.5">
                {course.prerequisites}
              </p>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              <Award className="h-4 w-4 text-emerald-500" />
              <span>Includes Certificate of Completion</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl font-bold h-11 px-5 flex-1 sm:flex-none"
                onClick={onClose}
              >
                Close
              </Button>

              {course.isEnrolled ? (
                <Button
                  type="button"
                  className="rounded-xl font-black h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-none gap-2 shadow-lg shadow-emerald-600/20"
                  onClick={onClose}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Already Enrolled
                </Button>
              ) : (
                <Button
                  type="button"
                  className="rounded-xl font-black h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-none gap-2 shadow-lg shadow-primary/20"
                  onClick={() => {
                    onClose();
                    onEnroll(course);
                  }}
                >
                  Enroll in this Course
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
