import React from "react";
import { Laptop, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DigitalCoursesEmptyStateProps {
  onResetFilters: () => void;
  searchQuery?: string;
  activeCategory?: string;
}

export const DigitalCoursesEmptyState: React.FC<
  DigitalCoursesEmptyStateProps
> = ({ onResetFilters, searchQuery, activeCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-card border border-border/80 shadow-soft space-y-4">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
        <Laptop className="h-8 w-8" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">
          No Digital Courses Found
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          {searchQuery
            ? `No digital courses match your search "${searchQuery}".`
            : activeCategory && activeCategory !== "All"
              ? `No digital courses found in category "${activeCategory}".`
              : "No courses found for the selected filter."}
        </p>
      </div>

      <Button
        onClick={onResetFilters}
        variant="outline"
        className="rounded-xl font-bold text-xs sm:text-sm gap-2 mt-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filters & Show All
      </Button>
    </div>
  );
};
