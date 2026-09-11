import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { DIGITAL_COURSE_CATEGORIES } from "@/data/digitalCourses.data";
import {
  COURSE_SORT_OPTIONS,
  type SortOptionItem,
} from "@/hooks/useDigitalCourses";
import { cn } from "@/lib/utils";

interface DigitalCoursesFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: "recommended" | "popular" | "rating" | "newest";
  currentSortOption: SortOptionItem;
  onSortChange: (
    sortBy: "recommended" | "popular" | "rating" | "newest",
  ) => void;
}

export const DigitalCoursesFilterBar: React.FC<
  DigitalCoursesFilterBarProps
> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  currentSortOption,
  onSortChange,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-soft space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search digital courses by title, topic, skills..."
            className="pl-10 h-11 rounded-xl bg-muted/40 border-border/80 focus:bg-background transition-all text-sm font-semibold placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Sort dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-11 rounded-xl px-4 shrink-0 font-bold text-xs sm:text-sm gap-2 border-border shadow-sm hover:bg-muted text-foreground"
            >
              <SlidersHorizontal className="h-4 w-4 text-primary shrink-0" />
              <span>
                Sort:{" "}
                <strong className="text-primary">
                  {currentSortOption.label}
                </strong>
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl shadow-xl p-1.5 border border-border backdrop-blur-md"
          >
            {COURSE_SORT_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.id}
                onClick={() => onSortChange(opt.sortBy)}
                className={cn(
                  "rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors px-3 py-2 flex items-center justify-between",
                  sortBy === opt.sortBy
                    ? "bg-primary/10 text-primary font-bold"
                    : "hover:bg-muted text-foreground",
                )}
              >
                <span>{opt.label}</span>
                {sortBy === opt.sortBy && <Check className="h-3.5 w-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none no-scrollbar">
        {DIGITAL_COURSE_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border",
                isActive
                  ? "bg-primary text-primary-foreground border-transparent shadow-sm shadow-primary/20 scale-100"
                  : "bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border-border/60",
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
