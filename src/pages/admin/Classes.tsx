import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Users,
  Clock,
  BookOpen,
  MoreVertical,
  Component,
  ListVideo,
} from "lucide-react";

import { SchoolDomainResponse } from "@/types/types";
import { CreateClass } from "@/components/admin/modals/CreateClass";
import { useGetClasses } from "@/hooks/useSchAdmHooks";
import { useDebounce } from "@/hooks/useDebounce";
import { ClassEmptyState } from "@/components/admin/class-section/ClassEmptyState";

interface ClassProps {
  school: SchoolDomainResponse;
}

const Classes = ({ school }: ClassProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  // Fetch classes with filters
  const { data, isLoading, error, refetch } = useGetClasses(
    debouncedSearchTerm,
    page,
    12, // pageSize
    statusFilter === "all" ? undefined : statusFilter === "active",
  );

  return (
    <>
      <div>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Manage all classes
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-md p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-card shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-md p-2 transition-colors",
                viewMode === "list"
                  ? "bg-card shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <Button variant="success" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4" />
            Create Class
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="text-muted-foreground">Loading classes...</div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <ClassEmptyState
          isSearch={!!searchQuery}
          isError={true}
          onRetry={() => refetch()}
        />
      )}

      {/* Classes Grid */}
      {!isLoading && !error && (
        <div
          className={cn(
            "grid gap-4",
            viewMode === "grid"
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1",
          )}
        >
          {data?.classes?.map((cls) => (
            <div
              key={cls.id}
              className="rounded-2xl border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-card"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cls.school.name}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    cls.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700",
                  )}
                >
                  {cls.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">
                  {cls._count.students} students
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Component className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">
                  {cls._count.arms} arms
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ListVideo className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">
                  {cls._count.videos} vidoes
                </span>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-3"
                onClick={() => navigate(`/school-admin/classes/${cls.id}`)}
              >
                View Class
              </Button>
            </div>
          ))}

          {/* Empty State */}
          {data?.classes?.length === 0 && (
            <div className="col-span-full">
              <ClassEmptyState
                isSearch={!!searchQuery}
                onClearSearch={() => setSearchQuery("")}
                onCreateClass={() => setShowCreateModal(true)}
              />
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={!data.pagination.hasPreviousPage}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center px-4">
            Page {data.pagination.currentPage} of {data.pagination.totalPages}
          </div>
          <Button
            variant="outline"
            disabled={!data.pagination.hasNextPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Create Modal */}
      <CreateClass
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
    </>
  );
};

export default Classes;
