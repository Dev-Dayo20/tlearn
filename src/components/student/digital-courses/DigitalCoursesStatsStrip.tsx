import React from "react";
import { BookOpen, Award, CheckCircle, Clock } from "lucide-react";
import type { DigitalCoursesStats } from "@/types/digitalCourse.types";

interface DigitalCoursesStatsStripProps {
  stats: DigitalCoursesStats | null;
  studentClassLevel: string;
}

export const DigitalCoursesStatsStrip: React.FC<
  DigitalCoursesStatsStripProps
> = ({ stats, studentClassLevel }) => {
  const statItems = [
    {
      label: `Tailored for ${studentClassLevel}`,
      value: stats?.tailoredForLevel ?? 3,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "My Enrolled Courses",
      value: stats?.enrolledCount ?? 0,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Available Hours of Content",
      value: `${stats?.totalLearningHours ?? 48}+ hrs`,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "Accredited Certifications",
      value: "Verified",
      icon: Award,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statItems.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5"
        >
          <div
            className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color} border ${stat.border}`}
          >
            <stat.icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-muted-foreground truncate uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-lg sm:text-xl font-black text-foreground tracking-tight mt-0.5">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
