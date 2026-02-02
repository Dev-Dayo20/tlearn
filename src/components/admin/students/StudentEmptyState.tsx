import { Button } from "@/components/ui/button";
import { SearchX, UserPlus, Info, ArrowRight } from "lucide-react";

interface StudentEmptyStateProps {
  isSearch: boolean;
  onClearSearch?: () => void;
  onAddStudent?: () => void;
}

export const StudentEmptyState = ({
  isSearch,
  onClearSearch,
  onAddStudent,
}: StudentEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-muted-foreground/20 animate-in fade-in zoom-in duration-500">
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        {isSearch ? (
          <SearchX className="h-16 w-16 text-muted-foreground relative" />
        ) : (
          <UserPlus className="h-16 w-16 text-primary relative" />
        )}
      </div>

      <h3 className="text-2xl font-black text-foreground mb-2">
        {isSearch ? "No results found" : "Welcome to the Student Directory"}
      </h3>
      <p className="text-muted-foreground max-w-md mb-8 font-medium">
        {isSearch
          ? "We couldn't find any students matching your criteria. Try adjusting your filters or check the spelling."
          : "It looks like you haven't added any students yet. Start by building your school's student database."}
      </p>

      {!isSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left max-w-3xl w-full">
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
              <span className="text-blue-600 font-bold text-xs">01</span>
            </div>
            <h4 className="font-bold text-sm mb-1">Create Classes</h4>
            <p className="text-xs text-muted-foreground">
              Define your school structure first in the classes section.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
              <span className="text-emerald-600 font-bold text-xs">02</span>
            </div>
            <h4 className="font-bold text-sm mb-1">Add Students</h4>
            <p className="text-xs text-muted-foreground">
              Click the "Add Student" button to enter details manually.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-background border shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
              <span className="text-amber-600 font-bold text-xs">03</span>
            </div>
            <h4 className="font-bold text-sm mb-1">Manage Records</h4>
            <p className="text-xs text-muted-foreground">
              View, edit, or delete records from this dashboard anytime.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {isSearch ? (
          <Button
            onClick={onClearSearch}
            variant="outline"
            className="rounded-xl px-8 h-12 font-bold border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 shadow-sm"
          >
            Clear All Filters
          </Button>
        ) : (
          <>
            <Button
              variant="prim"
              onClick={onAddStudent}
              className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Add First Student
            </Button>
            <Button
              variant="ghost"
              className="rounded-xl px-8 h-12 font-bold hover:bg-muted"
            >
              <Info className="mr-2 h-5 w-5" />
              Read Documentation
            </Button>
          </>
        )}
      </div>

      {!isSearch && (
        <p className="mt-8 text-xs text-muted-foreground flex items-center gap-1 font-medium">
          Need help? <ArrowRight className="h-3 w-3" />{" "}
          <span className="underline cursor-pointer">
            Watch our tutorial video
          </span>
        </p>
      )}
    </div>
  );
};
