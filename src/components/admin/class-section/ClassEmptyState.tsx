import { Button } from "@/components/ui/button";
import {
  SearchX,
  Plus,
  AlertCircle,
  RefreshCcw,
  BookOpen,
  GraduationCap,
  Video,
} from "lucide-react";

interface ClassEmptyStateProps {
  isSearch: boolean;
  isError?: boolean;
  onClearSearch?: () => void;
  onCreateClass?: () => void;
  onRetry?: () => void;
}

export const ClassEmptyState = ({
  isSearch,
  isError,
  onClearSearch,
  onCreateClass,
  onRetry,
}: ClassEmptyStateProps) => {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-destructive/5 rounded-3xl border border-dashed border-destructive/20 animate-in fade-in zoom-in duration-500 max-w-4xl mx-auto w-full">
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-destructive/10 rounded-full blur-2xl animate-pulse" />
          <AlertCircle className="h-16 w-16 text-destructive relative" />
        </div>
        <h3 className="text-2xl font-black text-foreground mb-2">
          Failed to Load Classes
        </h3>
        <p className="text-muted-foreground max-w-md mb-8 font-medium">
          We encountered an issue while fetching your classes. This could be due
          to a network problem or a temporary server error.
        </p>
        <Button
          onClick={onRetry}
          variant="outline"
          className="rounded-xl px-8 h-12 font-bold border-destructive/20 hover:bg-destructive hover:text-white transition-all duration-300"
        >
          <RefreshCcw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-muted-foreground/20 animate-in fade-in zoom-in duration-500 max-w-4xl mx-auto w-full">
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        {isSearch ? (
          <SearchX className="h-16 w-16 text-muted-foreground relative" />
        ) : (
          <BookOpen className="h-16 w-16 text-primary relative" />
        )}
      </div>

      <h3 className="text-2xl font-black text-foreground mb-2">
        {isSearch ? "No matching classes found" : "Start Building Your School"}
      </h3>
      <p className="text-muted-foreground max-w-md mb-8 font-medium">
        {isSearch
          ? "We couldn't find any classes matching your current filters. Try adjusting your search term or status."
          : "It looks like you haven't created any classes yet. Classes are the foundation of your school's organization."}
      </p>

      {!isSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left w-full">
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-sm mb-1">Define Classes</h4>
            <p className="text-xs text-muted-foreground">
              Create classes like JSS 1, SS 3, etc. to organize your students.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
              <GraduationCap className="h-4 w-4 text-emerald-600" />
            </div>
            <h4 className="font-bold text-sm mb-1">Add Arms</h4>
            <p className="text-xs text-muted-foreground">
              Segment your classes into arms like A, B, Gold, or Diamond.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
              <Video className="h-4 w-4 text-amber-600" />
            </div>
            <h4 className="font-bold text-sm mb-1">Assign Content</h4>
            <p className="text-xs text-muted-foreground">
              Once classes are set up, you can start assigning study materials.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {isSearch ? (
          <Button
            onClick={onClearSearch}
            variant="outline"
            className="rounded-xl px-8 h-12 font-bold border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Clear All Filters
          </Button>
        ) : (
          <Button
            variant="prim"
            onClick={onCreateClass}
            className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Class
          </Button>
        )}
      </div>
    </div>
  );
};
