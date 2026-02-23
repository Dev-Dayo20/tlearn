import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Grid,
  List,
  Search,
  Plus,
  BookOpen,
  Users,
  Video,
  MoreVertical,
  GraduationCap,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SchoolDomainResponse, Subject } from "@/types/types";
import { useGetSubjects, useDeleteSubject } from "@/hooks/useSchAdmHooks";
import { useDebounce } from "@/hooks/useDebounce";
import { CreateSubject } from "@/components/admin/modals/CreateSubject";
import { UpdateSubject } from "@/components/admin/modals/UpdateSubject";
import { SubjectDetailsSheet } from "@/components/admin/modals/SubjectDetailsSheet";
import { ConfirmationModal } from "@/components/admin/modals/ConfirmationModal";
import { SubjectEmptyState } from "@/components/admin/subjects/SubjectEmptyState";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SubjectsProps {
  school: SchoolDomainResponse;
}

const Subjects = ({ school }: SubjectsProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { data, isLoading, error, refetch } = useGetSubjects(
    debouncedSearchTerm,
    page,
    12, // Increased limit for better grid filling
  );

  const { mutate: deleteSubject, isPending: isDeleting } = useDeleteSubject();

  const handleEdit = (subject: Subject) => {
    setSubjectToEdit(subject);
  };

  const handleDelete = (subject: Subject) => {
    setSubjectToDelete(subject);
  };

  const handleView = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      deleteSubject(subjectToDelete.id, {
        onSuccess: () => {
          setSubjectToDelete(null);
          setSelectedSubject(null); // Close details if open
        },
      });
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Subject Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage and organize subjects for {school.school?.name}
          </p>
        </div>
        <Button
          variant="success"
          onClick={() => setShowCreateModal(true)}
          className="h-11 rounded-xl px-6 font-bold shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4.5 w-4.5 mr-2" />
          Create Subject
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-card/50 backdrop-blur-sm p-4 border border-muted/50 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search subjects by name or code..."
              className="pl-10 h-11 bg-background border-muted-foreground/20 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-muted p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-lg p-2 transition-all duration-200",
                viewMode === "grid"
                  ? "bg-card shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-lg p-2 transition-all duration-200",
                viewMode === "list"
                  ? "bg-card shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-[220px] rounded-2xl bg-muted animate-pulse border border-muted/50"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <SubjectEmptyState
          isSearch={!!searchQuery}
          isError={true}
          onRetry={() => refetch()}
        />
      )}

      {/* Subjects Grid/List */}
      {!isLoading && !error && (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1",
          )}
        >
          {data?.data?.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleView(subject)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 cursor-pointer"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
                  <BookOpen className="h-6 w-6" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[180px] rounded-2xl p-2 shadow-xl border-muted/50"
                  >
                    <DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase px-2 py-1.5">
                      Action Menu
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-muted/50" />
                    <DropdownMenuItem
                      className="rounded-xl text-primary focus:text-primary focus:bg-primary/5 gap-3 py-2.5 font-semibold"
                      onClick={() => handleView(subject)}
                    >
                      <Eye className="h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-xl text-amber-600 focus:text-amber-700 focus:bg-amber-50 gap-3 py-2.5 font-semibold"
                      onClick={() => handleEdit(subject)}
                    >
                      <Pencil className="h-4 w-4" /> Edit Subject
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-muted/50" />
                    <DropdownMenuItem
                      className="rounded-xl text-rose-600 focus:text-rose-700 focus:bg-rose-50 gap-3 py-2.5 font-semibold"
                      onClick={() => handleDelete(subject)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete Subject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {subject.name.toUpperCase()}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {subject.code && (
                      <Badge
                        variant="secondary"
                        className="font-mono text-[10px] tracking-wider uppercase"
                      >
                        {subject.code}
                      </Badge>
                    )}
                    {subject.class && (
                      <Badge
                        variant="outline"
                        className="bg-muted text-muted-foreground border-none text-[10px] font-bold uppercase transition-colors group-hover:bg-primary/5 group-hover:text-primary"
                      >
                        {subject.class.name}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {subject.teacher && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <div className="h-6 w-6 rounded-full bg-primary/5 flex items-center justify-center">
                        <GraduationCap className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span>{subject.teacher.name}</span>
                    </div>
                  )}
                  {subject.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic opacity-80">
                      "{subject.description}"
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 text-[10px] font-bold text-muted-foreground border-t pt-4">
                <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-lg">
                  <Users className="h-3 w-3" />
                  <span>{subject._count?.teachers || 0} TEACHERS</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-lg">
                  <Video className="h-3 w-3" />
                  <span>{subject._count?.videos || 0} VIDEOS</span>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150 group-hover:bg-primary/[0.08]" />
            </div>
          ))}

          {/* Empty State */}
          {!isLoading && data?.data?.length === 0 && (
            <div className="col-span-full">
              <SubjectEmptyState
                isSearch={!!searchQuery}
                onClearSearch={() => setSearchQuery("")}
                onCreateSubject={() => setShowCreateModal(true)}
              />
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-muted/30">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing <span className="text-foreground">{data.data.length}</span>{" "}
            of{" "}
            <span className="text-foreground font-bold">
              {data.pagination.totalSubjects}
            </span>{" "}
            subjects
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={!data.pagination.hasPreviousPage}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-xl h-9 px-4 font-bold border-muted-foreground/20 hover:bg-muted"
            >
              Previous
            </Button>
            <div className="flex items-center justify-center h-9 px-4 rounded-xl bg-muted text-xs font-black">
              PAGE {data.pagination.currentPage} / {data.pagination.totalPages}
            </div>
            <Button
              variant="outline"
              disabled={!data.pagination.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl h-9 px-4 font-bold border-muted-foreground/20 hover:bg-muted"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <CreateSubject
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <UpdateSubject
        open={!!subjectToEdit}
        onClose={() => setSubjectToEdit(null)}
        subject={subjectToEdit}
      />

      <SubjectDetailsSheet
        open={!!selectedSubject}
        onClose={() => setSelectedSubject(null)}
        subject={selectedSubject}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmationModal
        isOpen={!!subjectToDelete}
        onClose={() => setSubjectToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Subject?"
        description={`Are you sure you want to delete "${subjectToDelete?.name}"? This action is permanent and will remove all associated materials and assignments.`}
        confirmText={isDeleting ? "Deleting..." : "Delete Subject"}
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
};

export default Subjects;
