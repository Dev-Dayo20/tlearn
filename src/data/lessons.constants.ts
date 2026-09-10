import type { SubjectTheme } from "@/types/lessons.types";

/* ---------------------------------------------------------------------
   Subject → visual identity. Faded fill color palette for card banners.
   Uses soft, low-saturation pastel tints that complement light & dark mode.
   --------------------------------------------------------------------- */
export const SUBJECT_THEME: Record<string, SubjectTheme> = {
  Mathematics: {
    bgColor: "hsl(196 85% 95%)",
    textColor: "hsl(196 99% 30%)",
    borderColor: "hsl(196 80% 88%)",
    badgeBg: "hsl(196 85% 90% / 0.85)",
  },
  Biology: {
    bgColor: "hsl(141 60% 94%)",
    textColor: "hsl(141 75% 28%)",
    borderColor: "hsl(141 55% 85%)",
    badgeBg: "hsl(141 60% 88% / 0.85)",
  },
  History: {
    bgColor: "hsl(37 90% 94%)",
    textColor: "hsl(28 90% 32%)",
    borderColor: "hsl(37 85% 85%)",
    badgeBg: "hsl(37 90% 88% / 0.85)",
  },
  Physics: {
    bgColor: "hsl(232 70% 95%)",
    textColor: "hsl(232 59% 38%)",
    borderColor: "hsl(232 65% 88%)",
    badgeBg: "hsl(232 70% 90% / 0.85)",
  },
  Chemistry: {
    bgColor: "hsl(280 60% 95%)",
    textColor: "hsl(280 55% 36%)",
    borderColor: "hsl(280 55% 87%)",
    badgeBg: "hsl(280 60% 90% / 0.85)",
  },
  Default: {
    bgColor: "hsl(196 85% 95%)",
    textColor: "hsl(196 99% 30%)",
    borderColor: "hsl(196 80% 88%)",
    badgeBg: "hsl(196 85% 90% / 0.85)",
  },
};

export const SUBJECTS = [
  "All",
  "Mathematics",
  "Biology",
  "History",
  "Physics",
  "Chemistry",
] as const;
