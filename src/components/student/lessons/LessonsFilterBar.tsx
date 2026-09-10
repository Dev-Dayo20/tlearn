import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, Layers, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/hooks/useStudentLessons";
import type { LessonCategory } from "@/types/lessons.types";

/** The three fixed category tabs: All Subjects, General, Digital Course */
const CATEGORY_TABS: {
  value: "all" | LessonCategory;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "all",
    label: "All Subjects",
    icon: <LayoutGrid className="h-3.5 w-3.5 shrink-0" />,
  },
  {
    value: "general",
    label: "General",
    icon: <Layers className="h-3.5 w-3.5 shrink-0" />,
  },
  {
    value: "digital_course",
    label: "Digital Course",
    icon: <Monitor className="h-3.5 w-3.5 shrink-0" />,
  },
];

interface LessonsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentSortOption: SortOption;
  sortOptions: SortOption[];
  sortBy: "date" | "title" | "progress";
  sortOrder: "asc" | "desc";
  onSortChange: (
    sortBy: "date" | "title" | "progress",
    sortOrder: "asc" | "desc",
  ) => void;
  activeCategory: "all" | LessonCategory;
  onCategoryChange: (category: "all" | LessonCategory) => void;
}

export const LessonsFilterBar: React.FC<LessonsFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  currentSortOption,
  sortOptions,
  sortBy,
  sortOrder,
  onSortChange,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="tl-card p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div
          className="tl-search relative flex-1 w-full rounded-xl border transition-all"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          />
          <Input
            placeholder="Search for lessons by title or subject..."
            className="pl-10 h-11 border-0 rounded-xl focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground font-medium"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Sort dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="tl-sort-btn h-11 rounded-xl px-4 shrink-0 font-medium text-xs sm:text-sm gap-2 border-muted-foreground/20 hover:bg-muted text-foreground transition-all shadow-sm"
            >
              <SlidersHorizontal className="h-4 w-4 text-primary shrink-0" />
              <span>
                Sort:{" "}
                <strong className="font-bold text-foreground">
                  {currentSortOption.label}
                </strong>
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl shadow-xl p-1.5 border border-muted/80 backdrop-blur-md"
          >
            {sortOptions.map((opt) => (
              <DropdownMenuItem
                key={opt.id}
                onClick={() => onSortChange(opt.sortBy, opt.sortOrder)}
                className={cn(
                  "rounded-xl text-xs sm:text-sm font-medium cursor-pointer transition-colors px-3 py-2",
                  sortBy === opt.sortBy && sortOrder === opt.sortOrder
                    ? "bg-primary/10 text-primary font-bold"
                    : "hover:bg-muted text-foreground",
                )}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Three Category Filter Tabs: All Subjects, General, Digital Course */}
      <div className="flex flex-wrap gap-2 pt-1">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onCategoryChange(tab.value)}
            data-active={activeCategory === tab.value}
            className="tl-chip flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all"
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
