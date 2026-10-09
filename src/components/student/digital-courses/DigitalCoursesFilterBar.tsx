import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Check, Sparkles, Filter, X } from "lucide-react";
import { COURSE_TERMS, DIGITAL_SKILLS_PATHWAYS } from "@/data/digitalCourses.data";
import { cn } from "@/lib/utils";

interface DigitalCoursesFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  termFilter?: string;
  onTermChange: (term?: string) => void;
  pathwayFilter?: string;
  onPathwayChange: (pathway?: string) => void;
  onResetFilters?: () => void;
}

export const DigitalCoursesFilterBar: React.FC<DigitalCoursesFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  termFilter,
  onTermChange,
  pathwayFilter,
  onPathwayChange,
  onResetFilters,
}) => {
  const hasActiveFilters = Boolean(searchQuery || termFilter || pathwayFilter);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-soft space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search digital courses by title, description..."
            className="pl-10 h-11 rounded-xl bg-muted/40 border-border/80 focus:bg-background transition-all text-sm font-semibold placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Pathway dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-11 rounded-xl px-4 shrink-0 font-bold text-xs sm:text-sm gap-2 border-border shadow-sm hover:bg-muted text-foreground",
                pathwayFilter && "border-primary/50 text-primary bg-primary/5",
              )}
            >
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span className="truncate max-w-[160px]">
                {pathwayFilter ? pathwayFilter : "All Pathways"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 rounded-2xl shadow-xl p-1.5 border border-border backdrop-blur-md"
          >
            <DropdownMenuItem
              onClick={() => onPathwayChange(undefined)}
              className={cn(
                "rounded-xl text-xs sm:text-sm font-semibold cursor-pointer px-3 py-2 flex items-center justify-between",
                !pathwayFilter ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-foreground",
              )}
            >
              <span>All Pathways</span>
              {!pathwayFilter && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>
            {DIGITAL_SKILLS_PATHWAYS.map((p) => (
              <DropdownMenuItem
                key={p}
                onClick={() => onPathwayChange(p)}
                className={cn(
                  "rounded-xl text-xs sm:text-sm font-semibold cursor-pointer px-3 py-2 flex items-center justify-between",
                  pathwayFilter === p ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-foreground",
                )}
              >
                <span className="truncate">{p}</span>
                {pathwayFilter === p && <Check className="h-3.5 w-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && onResetFilters && (
          <Button
            variant="ghost"
            onClick={onResetFilters}
            className="h-11 rounded-xl px-3 text-xs font-bold text-muted-foreground hover:text-foreground gap-1.5 shrink-0"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Term Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none no-scrollbar">
        <button
          type="button"
          onClick={() => onTermChange(undefined)}
          className={cn(
            "whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border",
            !termFilter
              ? "bg-primary text-primary-foreground border-transparent shadow-sm shadow-primary/20 scale-100"
              : "bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border-border/60",
          )}
        >
          All Terms
        </button>
        {COURSE_TERMS.map((term) => {
          const isActive = termFilter === term;
          return (
            <button
              key={term}
              type="button"
              onClick={() => onTermChange(term)}
              className={cn(
                "whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border",
                isActive
                  ? "bg-primary text-primary-foreground border-transparent shadow-sm shadow-primary/20 scale-100"
                  : "bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border-border/60",
              )}
            >
              {term}
            </button>
          );
        })}
      </div>
    </div>
  );
};