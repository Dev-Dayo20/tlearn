import React from "react";
import {
  Sparkles,
  GraduationCap,
  Laptop,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DigitalCoursesHeroProps {
  studentClassLevel: string;
  tailoredCount: number;
  onlyMyLevel: boolean;
  onToggleMyLevel: (val: boolean) => void;
}

export const DigitalCoursesHero: React.FC<DigitalCoursesHeroProps> = ({
  studentClassLevel,
  tailoredCount,
  onlyMyLevel,
  onToggleMyLevel,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-prim/10 to-background border border-primary/20 p-6 sm:p-8 lg:p-10 shadow-sm">
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

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-tight">
            Future-Ready Digital Courses & Tech Skills 🚀
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
            Hands-on learning journeys created specifically for your grade.
            Master coding, artificial intelligence, robotics, UI design, and
            cybersecurity with accredited certificates upon completion.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Interactive projects
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Verified certificate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Learn at your own pace
            </span>
          </div>
        </div>

        {/* Right: Quick Level Switcher Card */}
        <div className="w-full lg:w-auto shrink-0">
          <div className="p-4 sm:p-5 rounded-2xl bg-card/90 dark:bg-slate-900/90 backdrop-blur-md border border-border shadow-soft flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Laptop className="h-4 w-4 text-primary" />
                View Filter
              </span>
              <span className="text-xs font-extrabold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                {tailoredCount} Courses for your level
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-muted/60 dark:bg-slate-800/60 border border-border/40">
              <button
                type="button"
                onClick={() => onToggleMyLevel(true)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-black transition-all ${
                  onlyMyLevel
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                My Class Level
              </button>

              <button
                type="button"
                onClick={() => onToggleMyLevel(false)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-black transition-all ${
                  !onlyMyLevel
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                Browse All
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground leading-tight">
              {onlyMyLevel
                ? `Showing courses exclusively matched for ${studentClassLevel} curriculum.`
                : "Displaying full catalog across all primary and secondary grade levels."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
