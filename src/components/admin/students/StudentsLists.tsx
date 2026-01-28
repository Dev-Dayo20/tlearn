import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  MoreVertical,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import api from "@/services/api/super-admin/super-admin";
import { useDebounce } from "@/hooks/useDebounce";
import { StudentsResponse, Student } from "@/types/types";
import { StudentDetailsSheet } from "@/components/admin/modals/StudentDetailsSheet";

// Fetch students with pagination and filters
const fetchStudents = async (
  page: number,
  limit: number,
  search?: string,
  classId?: string,
  armId?: string,
) => {
  const params: any = { page, limit };
  if (search) params.search = search;
  if (classId && classId.trim() !== "") params.classId = classId;
  if (armId && armId.trim() !== "") params.armId = armId;

  const response = await api.get(`/sch-admin/students`, { params });
  return response.data;
};

const StudentsLists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedArm, setSelectedArm] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const pageSize = 10;

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedClass, selectedArm]);

  const { data, isLoading, isError } = useQuery<StudentsResponse>({
    queryKey: [
      "students",
      currentPage,
      pageSize,
      debouncedSearch,
      selectedClass,
      selectedArm,
    ],
    queryFn: () =>
      fetchStudents(
        currentPage,
        pageSize,
        debouncedSearch,
        selectedClass,
        selectedArm,
      ),
  });

  const students = data?.students || [];
  const pagination = data?.pagination;

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-9 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[140px] h-11">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Classes</SelectItem>
              <SelectItem value="1">Primary One</SelectItem>
              <SelectItem value="4">JSS ONE</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedArm} onValueChange={setSelectedArm}>
            <SelectTrigger className="w-[120px] h-11">
              <SelectValue placeholder="All Arms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Arms</SelectItem>
              <SelectItem value="1">Butterfly</SelectItem>
              <SelectItem value="13">Tiger</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Student</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Class/Arm</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-48 text-center bg-transparent"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-muted-foreground font-medium text-sm">
                      Loading students...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-muted-foreground font-medium">
                      No students found.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border-2 border-background shadow-sm">
                        <AvatarImage
                          src={student.profilePicture || ""}
                          alt={student.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {student.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm capitalize">
                          {student.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {student.email || "No email address"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-mono text-[10px] tracking-wider uppercase bg-muted text-muted-foreground border-none"
                    >
                      {student.studentId}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm">
                        {student.class?.name || "N/A"}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                        {student.arm?.name || "No Arm"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {student.dateOfBirth
                      ? new Date(student.dateOfBirth).toLocaleDateString(
                          "en-GB",
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-95"
                              onClick={() => handleViewDetails(student)}
                            >
                              <Eye className="h-4.5 w-4.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="text-xs bg-blue-600 text-white border-none font-medium"
                          >
                            View Details
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all active:scale-95"
                            >
                              <Pencil className="h-4.5 w-4.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="text-xs bg-amber-600 text-white border-none font-medium"
                          >
                            Edit Student
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="text-xs bg-rose-600 text-white border-none font-medium"
                          >
                            Delete Student
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {isLoading ? (
          <div className="flex flex-col items-center py-12 gap-2">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground font-medium">
              Fetching students...
            </p>
          </div>
        ) : students.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-2 text-center">
            <Search className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-muted-foreground font-medium">
              No students found matching your criteria.
            </p>
          </div>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="p-5 rounded-2xl border bg-card text-card-foreground shadow-sm space-y-4 hover:shadow-md transition-shadow active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                  <AvatarImage
                    src={student.profilePicture || ""}
                    alt={student.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">
                    {student.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg capitalize truncate leading-tight">
                    {student.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded leading-none">
                      {student.studentId}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-muted shrink-0"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[180px] rounded-xl p-1 shadow-lg border-muted/50"
                  >
                    <DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase px-2 py-1.5">
                      Quick Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-muted/50" />
                    <DropdownMenuItem
                      className="rounded-lg text-blue-600 focus:text-blue-700 focus:bg-blue-50 gap-3 py-2.5"
                      onClick={() => handleViewDetails(student)}
                    >
                      <Eye className="h-4 w-4 shrink-0" />{" "}
                      <span className="font-semibold">View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg text-amber-600 focus:text-amber-700 focus:bg-amber-50 gap-3 py-2.5">
                      <Pencil className="h-4 w-4 shrink-0" />{" "}
                      <span className="font-semibold">Edit Record</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-muted/50" />
                    <DropdownMenuItem className="rounded-lg text-rose-600 focus:text-rose-700 focus:bg-rose-50 gap-3 py-2.5">
                      <Trash2 className="h-4 w-4 shrink-0" />{" "}
                      <span className="font-semibold">Delete Student</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/10 px-3 py-1 text-xs font-bold rounded-lg leading-none"
                >
                  {student.class?.name}
                </Badge>
                <div className="h-4 w-px bg-muted/60" />
                <span className="text-xs font-semibold text-muted-foreground truncate">
                  {student.arm?.name || "General Arm"}
                </span>
              </div>

              <div className="pt-3 border-t border-muted/50 flex items-center justify-between text-muted-foreground">
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Date of Birth
                </span>
                <span className="text-sm font-semibold">
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString("en-GB")
                    : "Not specified"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modern Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-xs font-semibold text-muted-foreground order-2 sm:order-1">
            Displaying{" "}
            <span className="text-foreground">
              {(currentPage - 1) * pageSize + 1}
            </span>
            -
            <span className="text-foreground">
              {Math.min(currentPage * pageSize, pagination.totalStudents)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-black">
              {pagination.totalStudents}
            </span>{" "}
            students
          </p>

          <div className="flex items-center gap-1 order-1 sm:order-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-muted/60 hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-muted/60 hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1.5 px-2">
              {[...Array(pagination.totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Only show a few page numbers around the current page
                if (
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "prim" : "outline"}
                      size="icon"
                      className={`h-9 w-9 rounded-lg transition-all ${
                        currentPage === pageNum
                          ? "bg-prim text-prim-foreground shadow-md shadow-prim/20 hover:bg-prim/90"
                          : "border-muted/60 hover:bg-muted hover:text-foreground text-muted-foreground"
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      <span className="text-xs font-bold">{pageNum}</span>
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
                      className="text-muted-foreground/50 font-bold px-0.5"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-muted/60 hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() =>
                setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={!pagination.hasNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-muted/60 hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(pagination.totalPages)}
              disabled={currentPage === pagination.totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Student Details Sheet Component */}
      <StudentDetailsSheet
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default StudentsLists;
