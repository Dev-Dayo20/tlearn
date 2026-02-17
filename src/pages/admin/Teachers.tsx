import React, { useState } from "react";
import {
  Search,
  Plus,
  Grid,
  List,
  Mail,
  MoreVertical,
  Edit2,
  UserCheck,
  BookOpen as BookIcon,
  GraduationCap as TeacherIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SchoolDomainResponse, Teacher } from "@/types/types";
import { useDebounce } from "@/hooks/useDebounce";
import { TeacherEmptyState } from "@/components/admin/teachers/TeacherEmptyState";
import { useGetTeachers } from "@/hooks/useSchAdmHooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TeacherModal } from "@/components/admin/teachers/TeacherModal";
import { TeacherAssignmentModal } from "@/components/admin/teachers/TeacherAssignmentModal";

interface TeachersProps {
  school: SchoolDomainResponse;
}

const Teachers = ({ school }: TeachersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const { data, isLoading, error, refetch } = useGetTeachers(
    debouncedSearch,
    page,
    10,
  );

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowCreateModal(true);
  };

  const handleAssign = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowAssignModal(true);
  };

  const handleCreate = () => {
    setSelectedTeacher(null);
    setShowCreateModal(true);
  };

  const onClearSearch = () => setSearchQuery("");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
          <p className="text-muted-foreground">
            Manage your school's teaching staff
          </p>
        </div>
        <Button
          variant="success"
          onClick={handleCreate}
          className="w-full sm:w-auto rounded-xl shadow-lg shadow-success/10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search teachers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground font-medium">
              Loading faculty...
            </p>
          </div>
        </div>
      ) : error ? (
        <TeacherEmptyState
          isSearch={!!searchQuery}
          isError={true}
          onRetry={() => refetch()}
        />
      ) : data?.teachers?.length === 0 ? (
        <TeacherEmptyState
          isSearch={!!searchQuery}
          onClearSearch={onClearSearch}
          onCreateTeacher={handleCreate}
        />
      ) : (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1",
          )}
        >
          {data?.teachers?.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              viewMode={viewMode}
              onEdit={() => handleEdit(teacher)}
              onAssign={() => handleAssign(teacher)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={!data.pagination.hasPreviousPage}
            onClick={() => setPage(page - 1)}
            className="rounded-xl px-6"
          >
            Previous
          </Button>
          <div className="flex items-center px-6 font-bold text-sm bg-muted rounded-xl">
            Page {data.pagination.currentPage} of {data.pagination.totalPages}
          </div>
          <Button
            variant="outline"
            disabled={!data.pagination.hasNextPage}
            onClick={() => setPage(page + 1)}
            className="rounded-xl px-6"
          >
            Next
          </Button>
        </div>
      )}

      {/* Modals */}
      <TeacherModal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
      />

      <TeacherAssignmentModal
        open={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
      />
    </div>
  );
};

const TeacherCard = ({
  teacher,
  viewMode,
  onEdit,
  onAssign,
}: {
  teacher: Teacher;
  viewMode: "grid" | "list";
  onEdit: () => void;
  onAssign: () => void;
}) => {
  const isGrid = viewMode === "grid";

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden",
        isGrid ? "flex flex-col" : "flex flex-row items-center p-4 gap-4",
      )}
    >
      {/* Action Buttons Overlay for grid */}
      {isGrid && (
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl">
              <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={onAssign}>
                <UserCheck className="mr-2 h-4 w-4" /> Assign Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Profile Info */}
      <div
        className={cn(
          "flex items-center",
          isGrid ? "flex-col p-6 text-center" : "flex-row gap-4 flex-1",
        )}
      >
        <Avatar
          className={cn(
            "border-4 border-background shadow-md",
            isGrid ? "h-24 w-24 mb-4" : "h-12 w-12",
          )}
        >
          <AvatarImage src={teacher.profilePicture || ""} />
          <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold">
            {teacher.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className={isGrid ? "" : "flex-1"}>
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {teacher.name.toLocaleUpperCase()}
          </h3>
          <div
            className={cn(
              "flex items-center gap-1 text-muted-foreground",
              isGrid ? "justify-center mt-1" : "mt-0",
            )}
          >
            <Mail className="h-3 w-3" />
            <span className="text-xs truncate max-w-[150px]">
              {teacher.email}
            </span>
          </div>
        </div>
      </div>

      {/* Stats/Details */}
      <div
        className={cn(
          "border-t border-border/50 bg-muted/30",
          isGrid
            ? "p-4 space-y-3"
            : "pr-4 py-2 border-t-0 bg-transparent flex items-center gap-6",
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <TeacherIcon className="h-4 w-4" />
            <span>{teacher.classes?.length || 0} Classes</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <BookIcon className="h-4 w-4" />
            <span>{teacher.subjects?.length || 0} Subjects</span>
          </div>
        </div>

        {isGrid && (
          <div className="flex flex-wrap gap-1 mt-2">
            {teacher.subjects?.slice(0, 2).map((sub) => (
              <Badge
                key={sub.id}
                variant="secondary"
                className="text-[10px] font-medium bg-primary/5 text-primary border-none"
              >
                {sub.name}
              </Badge>
            ))}
            {(teacher.subjects?.length || 0) > 2 && (
              <span className="text-[10px] text-muted-foreground ml-1">
                +{(teacher.subjects?.length || 0) - 2} more
              </span>
            )}
          </div>
        )}
      </div>

      {!isGrid && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg h-8"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-lg h-8"
            onClick={onAssign}
          >
            Assign
          </Button>
        </div>
      )}
    </div>
  );
};

export default Teachers;
