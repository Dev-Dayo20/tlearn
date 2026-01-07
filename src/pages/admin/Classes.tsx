import React from "react";
import { useState } from "react";
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

import { SchoolDomainResponse } from "@/types/types";
import { CreateClass } from "@/components/admin/modals/CreateClass";

interface ClassProps {
  school: SchoolDomainResponse;
}
const Classes = ({ school }: ClassProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      <div>
        {/* <h5 className="text-2xl md:text-xl font-bold tracking-tight text-foreground">
          Students
        </h5> */}
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
              value=""
              //   onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value="">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
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
                  : "text-muted-foreground hover:text-foreground"
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
                  : "text-muted-foreground hover:text-foreground"
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

      {/* Classes Grid */}
      <div
        className={cn(
          "grid gap-4",
          viewMode === "grid"
            ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        )}
      ></div>

      {/* Create Modal */}
      <CreateClass
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
};

export default Classes;
