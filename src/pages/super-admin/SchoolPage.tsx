import React, { useState } from "react";
import {
  School,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Search,
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

const SchoolPage = () => {
  const { data: schools, isLoading: schoolsLoading } = useGetSchools();
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();

  // Drawer state
  const [selectedSchool, setSelectedSchool] = useState<SchoolArray | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Add School Dialog state
  const [addSchoolDialogOpen, setAddSchoolDialogOpen] = useState(false);

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
            placeholder="Search by school name or email..."
            className="pl-10 w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
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
