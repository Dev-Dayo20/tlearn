import React from "react";
import { Search, X, Filter, Radio, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ColabFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedSubject: string;
  onSubjectChange: (val: string) => void;
  selectedRoomType: string;
  onRoomTypeChange: (val: string) => void;
  statusFilter: "ALL" | "LIVE" | "UPCOMING";
  onStatusFilterChange: (val: "ALL" | "LIVE" | "UPCOMING") => void;
  onResetFilters: () => void;
}

const SUBJECT_OPTIONS = [
  "All",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Literature",
  "Economics",
];

const ROOM_TYPES = [
  { id: "ALL", label: "All Formats" },
  { id: "LIVE_AUDIO_VIDEO", label: "Live Stage" },
  { id: "DOUBT_CLEARING", label: "Doubt Clearing" },
  { id: "EXAM_PREP", label: "Exam Sprint" },
  { id: "STUDY_LOUNGE", label: "Study Lounge" },
  { id: "PROJECT_COLLAB", label: "Project Collab" },
];

export const ColabFilterBar: React.FC<ColabFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedRoomType,
  onRoomTypeChange,
  statusFilter,
  onStatusFilterChange,
  onResetFilters,
}) => {
  const isFiltered =
    !!searchQuery ||
    selectedSubject !== "All" ||
    selectedRoomType !== "ALL" ||
    statusFilter !== "ALL";

  return (
    <div className="space-y-4 rounded-3xl bg-card border border-border p-4 sm:p-5 shadow-sm">
      {/* Top row: Search bar & Status tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search study rooms, courses, topics, or #tags..."
            className="pl-10 pr-9 rounded-2xl h-11 bg-muted/40 border-border text-xs sm:text-sm font-medium focus-visible:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Live vs Upcoming toggle */}
        <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-2xl shrink-0 self-start sm:self-auto border border-border/50">
          <button
            onClick={() => onStatusFilterChange("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              statusFilter === "ALL"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => onStatusFilterChange("LIVE")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              statusFilter === "LIVE"
                ? "bg-rose-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Radio className="h-3 w-3 animate-pulse" />
            Live Now
          </button>
          <button
            onClick={() => onStatusFilterChange("UPCOMING")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              statusFilter === "UPCOMING"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Starting Soon
          </button>
        </div>
      </div>

      {/* Subject horizontal scrolling chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 colab-scroll">
        <span className="text-xs font-bold text-muted-foreground shrink-0 flex items-center gap-1 mr-1">
          <Filter className="h-3.5 w-3.5" />
          Subject:
        </span>
        {SUBJECT_OPTIONS.map((sub) => {
          const isActive = selectedSubject === sub;
          return (
            <button
              key={sub}
              onClick={() => onSubjectChange(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40"
              }`}
            >
              {sub}
            </button>
          );
        })}
      </div>

      {/* Format pills & Reset button */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-muted-foreground mr-1">
            Format:
          </span>
          {ROOM_TYPES.map((type) => {
            const isActive = selectedRoomType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onRoomTypeChange(type.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-colors ${
                  isActive
                    ? "bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-7 text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-2"
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};
