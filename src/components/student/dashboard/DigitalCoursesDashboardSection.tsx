import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ChevronRight,
  GraduationCap,
  Star,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDigitalCourses } from "@/hooks/useDigitalCourses";
import {
  DigitalCourseDetailModal,
  DigitalCourseEnrollModal,
} from "@/components/student/digital-courses";

export const DigitalCoursesDashboardSection: React.FC = () => {
  const {
    studentClassLevel,
    courses,
    isLoading,
    selectedCourse,
    isDetailModalOpen,
    courseToEnroll,
    isEnrollModalOpen,
    isEnrolling,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenEnrollModal,
    handleCloseEnrollModal,
    handleConfirmEnroll,
  } = useDigitalCourses();

  // Top 3 tailored courses for dashboard highlight
  const topCourses = courses.slice(0, 3);

  return (
    <>
      <Card className="relative overflow-hidden border border-primary/20 shadow-soft bg-gradient-to-br from-card via-card to-primary/[0.03]">
        {/* Ambient background glow */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <CardHeader className="pb-4 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
                Featured Tech Skills
              </Badge>
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25"
              >
                {studentClassLevel}
              </Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Digital Courses for You 💡
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm font-medium text-muted-foreground">
              Level up with hands-on digital courses tailored for your class
              curriculum.
            </CardDescription>
          </div>

          <Link
            to="/student/digital-courses"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all shrink-0 w-fit"
          >
            Explore All Digital Courses
            <ChevronRight className="h-4 w-4" />
          </Link>
        </CardHeader>

        <CardContent className="relative z-10 pt-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-muted/40 animate-pulse border border-border"
                />
              ))}
            </div>
          ) : topCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {topCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleOpenDetail(course)}
                  className="group flex flex-col justify-between rounded-2xl bg-card border border-border shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-32 w-full overflow-hidden bg-slate-900">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-foreground backdrop-blur-md">
                        {course.category}
                      </span>
                      {course.isEnrolled ? (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500 text-white flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Enrolled
                        </span>
                      ) : (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 fill-current" />
                          Matched
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-bold">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3 text-amber-400" />
                        {course.targetLevel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        {course.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {(course.term || course.pathway) && (
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          {course.term && (
                            <Badge
                              variant="outline"
                              className="text-[10px] font-bold px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/20"
                            >
                              {course.term}
                            </Badge>
                          )}
                          {course.pathway && (
                            <Badge
                              variant="secondary"
                              className="text-[9px] font-bold px-1.5 py-0 h-4 bg-secondary text-secondary-foreground truncate max-w-[150px]"
                            >
                              {course.pathway}
                            </Badge>
                          )}
                        </div>
                      )}
                      <h4 className="font-extrabold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {course.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-primary" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3 text-primary" />
                        {course.lessonsCount} lessons
                      </span>
                    </div>

                    <div className="pt-1">
                      {course.isEnrolled ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full rounded-xl text-xs font-black h-8 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(course);
                          }}
                        >
                          Continue Learning
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="w-full rounded-xl text-xs font-black h-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEnrollModal(course);
                          }}
                        >
                          Enroll Now
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-xs font-semibold">
              No digital courses currently published for this class level.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course Detail Modal */}
      <DigitalCourseDetailModal
        course={selectedCourse}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetail}
        onEnroll={handleOpenEnrollModal}
        studentClassLevel={studentClassLevel}
      />

      {/* Course Enrollment Modal */}
      <DigitalCourseEnrollModal
        course={courseToEnroll}
        isOpen={isEnrollModalOpen}
        onClose={handleCloseEnrollModal}
        onConfirmEnroll={handleConfirmEnroll}
        isEnrolling={isEnrolling}
        studentClassLevel={studentClassLevel}
      />
    </>
  );
};
