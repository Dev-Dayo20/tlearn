import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Plus,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  BookOpen,
  Filter,
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
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchMaterials } from "@/services/api/admin/schLoginApi";
import { useFetchClassesList } from "@/hooks/useSchAdmHooks";
import { MaterialCard } from "./MaterialCards";
import { MaterialsResponse, Material } from "@/types/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { UploadMaterial } from "@/components/admin/modals/UploadMaterial";
import { EditMaterial } from "@/components/admin/modals/EditMaterial";
import { deleteMaterial } from "@/services/api/admin/schLoginApi";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

// Material Skeleton Component
const MaterialSkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="rounded-2xl border bg-card p-4 space-y-4 shadow-sm"
      >
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-8 w-full rounded-lg" />
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>
        <div className="pt-4 border-t flex justify-between">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MaterialsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedArm, setSelectedArm] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const pageSize = 12;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedClass, selectedArm, selectedSubject]);

  const { data: classesData } = useFetchClassesList();
  const classes = classesData?.classes || [];

  // Find selected class to get its arms
  const arms =
    classes.find((c: any) => c.id.toString() === selectedClass)?.arms || [];

  const { data, isLoading, isError } = useQuery<MaterialsResponse>({
    queryKey: [
      "materials",
      debouncedSearch,
      selectedClass,
      selectedArm,
      selectedSubject,
      currentPage,
    ],
    queryFn: () => {
      const params: any = {
        page: currentPage,
        limit: pageSize,
        search: debouncedSearch.trim() || undefined,
        classId: selectedClass !== "all" ? Number(selectedClass) : undefined,
        armId: selectedArm !== "all" ? Number(selectedArm) : undefined,
        subjectId:
          selectedSubject !== "all" ? Number(selectedSubject) : undefined,
      };
      return fetchMaterials(params);
    },
  });

  const materials = data?.materials || [];
  const pagination = data?.pagination;

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedClass("all");
    setSelectedArm("all");
    setSelectedSubject("all");
  };

  const handleEdit = (material: Material) => {
    setSelectedMaterial(material);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (material: Material) => {
    setSelectedMaterial(material);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMaterial) return;

    setIsDeleting(true);
    try {
      await deleteMaterial(selectedMaterial.id);
      toast.success("Material deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete material");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isError) {
    toast.error("Failed to fetch learning materials");
  }

  return (
    <div className="space-y-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            Learning Materials
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Manage and organize educational content for your students.
          </p>
        </div>
        <Button
          variant="prim"
          onClick={() => setIsUploadOpen(true)}
          className="rounded-xl px-6 h-11 font-bold hover:bg-sky-500/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="mr-2 h-5 w-5" />
          Upload Material
        </Button>
      </div>

      {/* Modern Search & Filter Bar */}
      <div className="space-y-4 bg-card/50 p-4 rounded-3xl border border-muted/50 backdrop-blur-sm shadow-sm transition-all">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search by title or description..."
              className="pl-11 h-12 bg-background border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isFilterVisible ? "secondary" : "outline"}
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className={cn(
                "h-12 rounded-2xl px-4 font-bold gap-2 shrink-0 transition-all active:scale-95",
                isFilterVisible
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "border-muted-foreground/20 text-muted-foreground hover:bg-muted",
              )}
            >
              <Filter
                className={cn(
                  "w-4.5 h-4.5",
                  isFilterVisible
                    ? "text-primary fill-primary/10"
                    : "text-muted-foreground",
                )}
              />
              Filters
              {(selectedClass !== "all" ||
                selectedArm !== "all" ||
                selectedSubject !== "all") && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white border-none text-[10px]">
                  {
                    [selectedClass, selectedArm, selectedSubject].filter(
                      (f) => f !== "all",
                    ).length
                  }
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Expandable Filters */}
        {isFilterVisible && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-muted/50 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground ml-1">
                Class
              </label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="h-11 rounded-xl bg-background border-muted-foreground/20 transition-all hover:border-primary/50">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-muted/50">
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls: any) => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground ml-1">
                Arm
              </label>
              <Select
                value={selectedArm}
                onValueChange={setSelectedArm}
                disabled={selectedClass === "all"}
              >
                <SelectTrigger className="h-11 rounded-xl bg-background border-muted-foreground/20 transition-all hover:border-primary/50">
                  <SelectValue placeholder="All Arms" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-muted/50">
                  <SelectItem value="all">All Arms</SelectItem>
                  {arms.map((arm: any) => (
                    <SelectItem key={arm.id} value={arm.id.toString()}>
                      {arm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground ml-1">
                Subject
              </label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="h-11 rounded-xl bg-background border-muted-foreground/20 transition-all hover:border-primary/50">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-muted/50">
                  <SelectItem value="all">All Subjects</SelectItem>
                  {/* Subject list would go here */}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Materials Grid */}
      {isLoading ? (
        <MaterialSkeletonGrid />
      ) : materials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-card/30 rounded-3xl border border-dashed border-muted-foreground/20 animate-in fade-in zoom-in duration-500">
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse" />
            <BookOpen className="h-16 w-16 text-muted-foreground relative opacity-40 mx-auto" />
          </div>
          <h3 className="text-2xl font-black text-foreground mb-2">
            No Materials Found
          </h3>
          <p className="text-muted-foreground max-w-md mb-8 font-medium">
            {debouncedSearch ||
            selectedClass !== "all" ||
            selectedArm !== "all" ||
            selectedSubject !== "all"
              ? "We couldn't find any materials matching your filters. Try adjusting your search criteria."
              : "Start by uploading your first learning material. Supports Videos, Documents, and Quizzes."}
          </p>
          {(debouncedSearch ||
            selectedClass !== "all" ||
            selectedArm !== "all" ||
            selectedSubject !== "all") && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="rounded-xl px-8 h-12 font-bold border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 shadow-sm"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {materials.map((item) => (
              <MaterialCard
                key={item.id}
                material={item}
                onView={(mat) => console.log("View", mat)} // Implement modals later
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 pb-6 border-t border-muted/50">
              <p className="text-sm font-bold text-muted-foreground order-2 sm:order-1">
                Displaying{" "}
                <span className="text-primary">
                  {(currentPage - 1) * pageSize + 1}
                </span>
                -
                <span className="text-primary">
                  {Math.min(currentPage * pageSize, pagination.total)}
                </span>{" "}
                of{" "}
                <span className="text-foreground font-black">
                  {pagination.total}
                </span>{" "}
                materials
              </p>

              <div className="flex items-center gap-1.5 order-1 sm:order-2 bg-muted/30 p-1.5 rounded-2xl border border-muted/50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl hover:bg-background transition-all disabled:opacity-30"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4.5 w-4.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl hover:bg-background transition-all disabled:opacity-30"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </Button>

                <div className="flex items-center gap-1 px-1">
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "prim" : "ghost"}
                          size="sm"
                          className={cn(
                            "h-9 w-9 rounded-xl font-bold transition-all",
                            currentPage === pageNum
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "text-muted-foreground hover:bg-background",
                          )}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    if (
                      (pageNum === 2 && currentPage > 3) ||
                      (pageNum === pagination.totalPages - 1 &&
                        currentPage < pagination.totalPages - 2)
                    ) {
                      return (
                        <span
                          key={pageNum}
                          className="text-muted-foreground px-1 font-bold"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl hover:bg-background transition-all disabled:opacity-30"
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(pagination.totalPages, p + 1),
                    )
                  }
                  disabled={currentPage === pagination.totalPages}
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl hover:bg-background transition-all disabled:opacity-30"
                  onClick={() => setCurrentPage(pagination.totalPages)}
                  disabled={currentPage === pagination.totalPages}
                >
                  <ChevronsRight className="h-4.5 w-4.5" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      {/* Modals */}
      <UploadMaterial
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      <EditMaterial
        open={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedMaterial(null);
        }}
        material={selectedMaterial}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="rounded-3xl border-none shadow-2xl p-0 overflow-hidden max-w-md">
          <div className="bg-rose-50 p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <AlertDialogTitle className="text-xl font-black text-rose-950">
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-rose-900/70 font-medium">
                Are you sure you want to delete{" "}
                <span className="font-bold text-rose-600">
                  "{selectedMaterial?.title}"
                </span>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>
          <AlertDialogFooter className="p-4 bg-white flex sm:justify-center gap-3">
            <AlertDialogCancel className="rounded-xl font-bold h-11 flex-1 border-rose-200 text-rose-950 hover:bg-rose-50">
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="rounded-xl font-black h-11 flex-1 bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 transition-all active:scale-95"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Now
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MaterialsList;
