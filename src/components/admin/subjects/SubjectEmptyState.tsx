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

interface SubjectEmptyStateProps {
  isSearch: boolean;
  isError?: boolean;
  onClearSearch?: () => void;
  onCreateSubject?: () => void;
  onRetry?: () => void;
}

export const SubjectEmptyState = ({
  isSearch,
  isError,
  onClearSearch,
  onCreateSubject,
  onRetry,
}: SubjectEmptyStateProps) => {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-destructive/20 animate-in fade-in zoom-in duration-500 max-w-4xl mx-auto w-full">
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-destructive/10 rounded-full blur-2xl animate-pulse" />
          <AlertCircle className="h-16 w-16 text-destructive relative" />
        </div>
        <h3 className="text-2xl font-black text-foreground mb-2">
          Failed to Load Subjects
        </h3>
        <p className="text-muted-foreground max-w-md mb-8 font-medium">
          We encountered an issue while fetching your subjects. This could be
          due to a network problem or a temporary server error.
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
        {isSearch ? "No matching subjects found" : "Build Your Curriculum"}
      </h3>
      <p className="text-muted-foreground max-w-md mb-8 font-medium">
        {isSearch
          ? "We couldn't find any subjects matching your current search. Try adjusting your search term."
          : "It looks like you haven't created any subjects yet. Subjects are essential for organizing study materials."}
      </p>

      {!isSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left w-full">
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-sm mb-1">Define Subjects</h4>
            <p className="text-xs text-muted-foreground">
              Create subjects like Mathematics, English, etc. for your classes.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
              <GraduationCap className="h-4 w-4 text-emerald-600" />
            </div>
            <h4 className="font-bold text-sm mb-1">Assign Teachers</h4>
            <p className="text-xs text-muted-foreground">
              Link subjects to teachers who will manage the content.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
              <Video className="h-4 w-4 text-amber-600" />
            </div>
            <h4 className="font-bold text-sm mb-1">Upload Materials</h4>
            <p className="text-xs text-muted-foreground">
              Once subjects are ready, you can start uploading learning content.
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
            Clear Search
          </Button>
        ) : (
          <Button
            variant="prim"
            onClick={onCreateSubject}
            className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Subject
          </Button>
        )}
      </div>
    </div>
  );
};
