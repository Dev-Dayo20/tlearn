import React from "react";
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DigitalCoursesHeroProps {
  studentClassLevel: string;
  tailoredCount: number;
  enrolledCount?: number;
}

export const DigitalCoursesHero: React.FC<DigitalCoursesHeroProps> = ({
  studentClassLevel,
  tailoredCount,
  enrolledCount = 0,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-primary/20 p-6 sm:p-8 lg:p-10 shadow-sm">
      {/* Decorative ambient blurred glow */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Headline & Class Level Tailoring Marker */}
        <div className="max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/25 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              Digital Academy
            </span>
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 flex items-center gap-1.5"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              Tailored for {studentClassLevel}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
            Build Future-Proof <span className="text-primary">Digital Skills</span>
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Access hands-on tech courses, coding tutorials, and practical digital projects curated specifically for your class curriculum and pathway.
          </p>
        </div>

        {/* Right: Quick glance badge counter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/90 border border-border shadow-soft backdrop-blur-md">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Courses Available
              </p>
              <p className="text-xl font-black text-foreground">{tailoredCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/90 border border-border shadow-soft backdrop-blur-md">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                My Enrolled
              </p>
              <p className="text-xl font-black text-foreground">{enrolledCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};