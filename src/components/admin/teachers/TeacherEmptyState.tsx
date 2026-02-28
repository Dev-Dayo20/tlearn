import { SearchX, UserPlus, RefreshCw, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeacherEmptyStateProps {
  isSearch?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onClearSearch?: () => void;
  onCreateTeacher?: () => void;
}

export const TeacherEmptyState = ({
  isSearch,
  isError,
  onRetry,
  onClearSearch,
  onCreateTeacher,
}: TeacherEmptyStateProps) => {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-muted-foreground/20 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <RefreshCw className="h-10 w-10 text-destructive animate-spin-slow" />
        </div>
        <h3 className="text-2xl font-black text-foreground mb-2">
          Failed to load teachers
        </h3>
        <p className="text-muted-foreground max-w-xs mb-8">
          Something went wrong while fetching the teaching staff list. Please
          check your connection and try again.
        </p>
        <Button
          variant="outline"
          onClick={onRetry}
          className="rounded-xl px-8 h-12 font-bold border-2 hover:bg-secondary transition-all"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
      </div>
    );
  }

  if (isSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-muted-foreground/20 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-black text-foreground mb-2">
          No matches found
        </h3>
        <p className="text-muted-foreground max-w-xs mb-8">
          We couldn't find any teacher matching your search criteria. Try using
          different keywords.
        </p>
        <Button
          variant="secondary"
          onClick={onClearSearch}
          className="rounded-xl px-8 h-12 font-bold transition-all"
        >
          Clear Search
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-muted-foreground/20 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-prim/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-prim/5">
        <UsersRound className="h-12 w-12 text-prim" />
      </div>
      <h3 className="text-3xl font-black text-foreground mb-3">
        Onboard Your Teaching Staff
      </h3>
      <p className="text-muted-foreground max-w-md mb-10 text-lg">
        Start building your school's digital faculty. Adding teachers allows you
        to assign them to classes and subjects.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full mb-10">
        <div className="flex flex-col items-center p-4 bg-background/50 rounded-2xl border border-border/50">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mb-3">
            <span className="font-bold text-success">1</span>
          </div>
          <p className="text-sm font-semibold">Create Profile</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-background/50 rounded-2xl border border-border/50">
          <div className="w-10 h-10 bg-prim/10 rounded-full flex items-center justify-center mb-3">
            <span className="font-bold text-prim">2</span>
          </div>
          <p className="text-sm font-semibold">Assign Classes</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-background/50 rounded-2xl border border-border/50">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mb-3">
            <span className="font-bold text-accent-foreground">3</span>
          </div>
          <p className="text-sm font-semibold">Ready to Teach</p>
        </div>
      </div>

      <Button
        variant="success"
        onClick={onCreateTeacher}
        className="rounded-xl px-10 h-14 font-bold shadow-lg shadow-success/20 hover:scale-[1.02] transition-transform text-lg"
      >
        <UserPlus className="mr-2 h-6 w-6" />
        Add First Teacher
      </Button>
    </div>
  );
};
