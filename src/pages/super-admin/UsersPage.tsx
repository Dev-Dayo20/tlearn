import React from "react";
import { useState } from "react";
import {
  Users as UsersIcon,
  UserCheck,
  GraduationCap,
  Search,
  UserSearch,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetricCard } from "@/components/super-admin/MetricCard";
import { useUserMetrics } from "@/hooks/useSuperAdminLogin";
import { GetUserMetrics, UsersArray } from "@/types/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllUsers } from "@/hooks/useSuperAdminLogin";
import { UserTable } from "@/components/super-admin/user-section/UserTable";
import { UsersDrawer } from "@/components/super-admin/user-section/UserDetailDrawer";

type RoleType = "STUDENT" | "ADMIN" | "all";

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<UsersArray | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState<RoleType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: metrics, isPending } = useUserMetrics();
  const { data: userData, isPending: usersLoading } = useGetAllUsers(
    debouncedSearchTerm,
    role,
    currentPage,
    pageSize
  );

  const users = userData?.users || [];
  const pagination = userData?.pagination;

  const handleViewUsers = (user: UsersArray) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDrawerChange = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      setTimeout(() => setSelectedUser(null), 300);
    }
  };

  const handlePageClick = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters = searchTerm.trim() !== "" || role !== "all";
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Users
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage all platform users and their access.
          </p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Users"
          value={metrics?.metrics.totalUsers || 0}
          icon={UsersIcon}
          description="registered on platform"
        />
        <MetricCard
          title="School Admins"
          value={metrics?.metrics?.totalAdmins}
          icon={UserCheck}
          description="managing schools"
        />

        <MetricCard
          title="Total Students"
          value={metrics?.metrics?.totalStudents}
          icon={GraduationCap}
          description="enrolled students"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="search by name, email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
        <Select
          value={role}
          onValueChange={(value) => {
            setRole(value as RoleType);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by role " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all"> All Roles</SelectItem>
            <SelectItem value="ADMIN">School Admin</SelectItem>
            <SelectItem value="STUDENT">Students</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <span className="text-sm text-muted-foreground">
          {users?.length || 0} result{users?.length !== 1 ? "s" : ""}
        </span>
      )}
      {pagination && (
        <span className="text-sm text-muted-foreground ml-auto">
          Showing {users?.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
          {Math.min(currentPage * pageSize, pagination?.totalUsers)} of{" "}
          {pagination.totalUsers} Users
        </span>
      )}

      {/* USERS TABLE */}
      <UserTable
        users={users}
        isLoading={usersLoading}
        role={role}
        onViewUser={handleViewUsers}
      />

      {/* PAGINATION */}
      {pagination && pagination?.totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev.
            </Button>
            <div className="hidden sm:flex gap-1">
              {Array.from(
                { length: Math.min(5, pagination?.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (pagination?.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= pagination?.totalPages - 2) {
                    pageNum = pagination?.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageClick(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                }
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={!pagination?.hasNextPage}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* USERS DRAWER   */}
      <UsersDrawer
        user={selectedUser}
        open={drawerOpen}
        onChange={handleDrawerChange}
      />
    </div>
  );
};

export default UsersPage;
