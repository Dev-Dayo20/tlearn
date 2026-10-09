import React from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DigitalCoursesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  termFilter: string;
  onTermFilterChange: (value: string) => void;
  onClearFilters: () => void;
  totalFiltered: number;
}

export const DigitalCoursesFilters: React.FC<DigitalCoursesFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  termFilter,
  onTermFilterChange,
  onClearFilters,
  totalFiltered,
}) => {
  const hasActiveFilters =
    searchTerm.trim() !== "" || statusFilter !== "" || termFilter !== "";

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search title, description, pathway..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 bg-background"
          />
        </div>

        <Select
          value={statusFilter || "all"}
          onValueChange={(v) => onStatusFilterChange(v === "all" ? "" : v)}
        >
          <SelectTrigger className="h-10 bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={termFilter || "all"}
          onValueChange={(v) => onTermFilterChange(v === "all" ? "" : v)}
        >
          <SelectTrigger className="h-10 bg-background">
            <SelectValue placeholder="Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Terms</SelectItem>
            <SelectItem value="First Term">First Term</SelectItem>
            <SelectItem value="Second Term">Second Term</SelectItem>
            <SelectItem value="Third Term">Third Term</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-primary" />
          <span>
            Found <strong className="text-foreground">{totalFiltered}</strong>{" "}
            matching {totalFiltered === 1 ? "course" : "courses"}
          </span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 px-2"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
