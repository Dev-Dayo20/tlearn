import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonsPaginationProps {
  currentPage: number;
  totalPagesCount: number;
  totalLessonsCount: number;
  startIndex: number;
  itemsPerPage: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
}

export const LessonsPagination: React.FC<LessonsPaginationProps> = ({
  currentPage,
  totalPagesCount,
  totalLessonsCount,
  startIndex,
  itemsPerPage,
  onPageChange,
}) => {
  if (totalLessonsCount === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-8 border-t border-border/60">
      <p
        className="text-xs sm:text-sm font-medium"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Showing{" "}
        <span className="font-bold text-foreground">
          {startIndex + 1}
        </span>{" "}
        to{" "}
        <span className="font-bold text-foreground">
          {Math.min(startIndex + itemsPerPage, totalLessonsCount)}
        </span>{" "}
        of{" "}
        <span className="font-bold text-foreground">
          {totalLessonsCount}
        </span>{" "}
        lessons
      </p>

      {totalPagesCount > 1 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
            className="rounded-xl h-9 px-3 gap-1 text-xs font-semibold"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1 px-1">
            {Array.from({ length: totalPagesCount }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === pageNum
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPagesCount}
            onClick={() =>
              onPageChange((prev) => Math.min(prev + 1, totalPagesCount))
            }
            className="rounded-xl h-9 px-3 gap-1 text-xs font-semibold"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
