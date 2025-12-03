import React, { useState } from "react";
import {
  School,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetricCard } from "@/components/super-admin/MetricCard";
import { SchoolsTable } from "@/components/super-admin/school-section/SchoolsTable";
import { SchoolDetailDrawer } from "@/components/super-admin/school-section/SchoolDetailDrawer";
import { AddSchoolDialog } from "@/components/super-admin/school-section/AddSchoolDialog";
import { useGetSchools, useDashboardMetrics } from "@/hooks/useSuperAdminLogin";
import { SchoolArray } from "@/types/types";
import { useDebounce } from "@/hooks/useDebounce";

const SchoolPage = () => {
  const [selectedSchool, setSelectedSchool] = useState<SchoolArray | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addSchoolDialogOpen, setAddSchoolDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: schools, isLoading: schoolsLoading } = useGetSchools(
    debouncedSearchTerm,
    statusFilter
  );
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();

  // Handler to open drawer with selected school
  const handleViewSchool = (school: SchoolArray) => {
    setSelectedSchool(school);
    setDrawerOpen(true);
  };

  // Handler to close drawer
  const handleCloseDrawer = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      setTimeout(() => setSelectedSchool(null), 300);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const hasActiveFilters = searchTerm.trim() !== "" || statusFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Schools
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage all registered schools on the platform.
          </p>
        </div>
        <Button
          className="gap-2 w-full sm:w-auto"
          onClick={() => setAddSchoolDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="sm:inline">Add School</span>
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Schools"
          value={metrics?.totalSchools || 0}
          icon={School}
          description="registered on platform"
        />
        <MetricCard
          title="Inactive Schools"
          value={metrics?.inactiveSchools || 0}
          icon={Clock}
          description="awaiting review"
        />
        <MetricCard
          title="Active Schools"
          value={metrics?.activeSchools || 0}
          icon={CheckCircle}
          description="currently operational"
        />
        <MetricCard
          title="Suspended Schools"
          value={metrics?.inactiveSchools || 0}
          icon={AlertCircle}
          description="temporarily disabled"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by school name, email, or subdomain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="elementary">Elementary</SelectItem>
              <SelectItem value="middle">Middle School</SelectItem>
              <SelectItem value="high">High School</SelectItem>
            </SelectContent>
          </Select>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="whitespace-nowrap bg-violet-50 hover:bg-violet-100 text-violet-700 hover:text-violet-800 border-violet-200 hover:border-violet-300"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          )}

          {hasActiveFilters && (
            <span className="text-sm text-muted-foreground">
              {schools?.length || 0} result{schools?.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Schools Table */}
      <SchoolsTable
        schools={schools || []}
        isLoading={schoolsLoading}
        onViewSchool={handleViewSchool}
      />

      {/* School Detail Drawer Placeholder */}
      <SchoolDetailDrawer
        school={selectedSchool}
        open={drawerOpen}
        onOpenChange={handleCloseDrawer}
      />

      {/* Add School Dialog Placeholder */}
      <AddSchoolDialog
        open={addSchoolDialogOpen}
        onOpenChange={setAddSchoolDialogOpen}
      />
    </div>
  );
};

export default SchoolPage;
