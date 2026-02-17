import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Users,
  Clock,
  BookOpen,
  GraduationCap,
  Search,
  Plus,
  FileText,
  Video,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  TrendingUp,
  Component,
  ListVideo,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import api from "@/services/api/super-admin/super-admin";
import { RegisterStudents } from "@/components/admin/modals/RegisterStudent";
import { UpdateStudentModal } from "@/components/admin/modals/UpdateStudentModal";
import { ConfirmationModal } from "@/components/admin/modals/ConfirmationModal";
import { useDeleteStudent } from "@/hooks/useSchAdmHooks";
import { Student } from "@/types/types";

// Fetch single class with all details
const fetchClassDetail = async (classId: string) => {
  const response = await api.get(`/sch-admin/classes/${classId}`);
  return response.data.classData;
};

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  // Fetch class details
  const {
    data: classData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["class", id],
    queryFn: () => fetchClassDetail(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading class details...</div>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="mb-4 text-muted-foreground">
          The class you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/school-admin/classes")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classes
        </Button>
      </div>
    );
  }

  const filteredStudents =
    classData.students?.filter((student: any) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const averageProgress =
    classData.students?.length > 0
      ? Math.round(
          classData.students.reduce(
            (acc: number, s: any) => acc + (s.progress || 0),
            0,
          ) / classData.students.length,
        )
      : 0;

  return (
    <div className="p-6 space-y-6 pb-16 md:pb-20">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/school-admin/classes")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Classes
      </Button>

      {/* Class Header Card */}
      <div className="rounded-2xl bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Section - Class Info */}
          <div className="flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">
                {classData.name}
              </h2>
              <Badge
                variant="outline"
                className={cn(
                  classData.isActive
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-muted text-muted-foreground border-border",
                )}
              >
                {classData.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <p className="mb-4 text-muted-foreground">
              This class has {classData._count?.subjects || 0} subjects and{" "}
              {classData._count?.students || 0} students enrolled.
            </p>

            {/* Subjects */}
            {classData.subjects?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {classData.subjects.map((subject: any) => (
                  <span
                    key={subject.id}
                    className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Section - Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-primary/5 p-4 text-center">
              <Users className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {classData._count?.students || 0}
              </p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div className="rounded-xl bg-success/5 p-4 text-center">
              <BookOpen className="mx-auto mb-2 h-6 w-6 text-success" />
              <p className="text-2xl font-bold text-foreground">
                {classData._count?.subjects || 0}
              </p>
              <p className="text-xs text-muted-foreground">Subjects</p>
            </div>
            <div className="rounded-xl bg-accent/10 p-4 text-center">
              <Component className="mx-auto mb-2 h-6 w-6 text-accent-foreground" />
              <p className="text-2xl font-bold text-foreground">
                {classData._count?.arms || 0}
              </p>
              <p className="text-xs text-muted-foreground">Arms</p>
            </div>
            <div className="rounded-xl bg-primary/5 p-4 text-center">
              <ListVideo className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {classData._count?.videos || 0}
              </p>
              <p className="text-xs text-muted-foreground">Materials</p>
            </div>
          </div>
        </div>

        {/* Arms Info */}
        {classData.arms?.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>
                {classData.arms.length} Arms:{" "}
                {classData.arms.map((a: any) => a.name).join(", ")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Students */}
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  Recent Students
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("students")}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {classData.students?.slice(0, 5).map((student: any) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {student.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {student.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                    {student.arm && (
                      <Badge variant="outline" className="bg-secondary/50">
                        {student.arm.name}
                      </Badge>
                    )}
                  </div>
                )) || []}
                {(!classData.students || classData.students.length === 0) && (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No students enrolled yet
                  </p>
                )}
              </div>
            </div>

            {/* Subjects Overview */}
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Subjects</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("subjects")}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {classData.subjects?.slice(0, 5).map((subject: any) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {subject.name}
                        </p>
                        {subject.teacher && (
                          <p className="text-xs text-muted-foreground">
                            Teacher: {subject.teacher.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )) || []}
                {(!classData.subjects || classData.subjects.length === 0) && (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No subjects added yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="success" onClick={() => setIsAddModalOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>

          <div className="rounded-2xl bg-card shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Arm</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {student.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {student.email}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="bg-secondary/50">
                          {student.arm?.name || "General"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            student.isActive
                              ? "border-success/20 bg-success/10 text-success"
                              : "border-muted bg-muted text-muted-foreground",
                          )}
                        >
                          {student.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsUpdateModalOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredStudents.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No students found
              </p>
            )}
          </div>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="success">
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classData.subjects?.map((subject: any) => (
              <div
                key={subject.id}
                className="rounded-2xl bg-card p-5 shadow-soft"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
                <h4 className="mb-1 font-semibold text-foreground">
                  {subject.name}
                </h4>
                {subject.teacher && (
                  <p className="text-sm text-muted-foreground">
                    Teacher: {subject.teacher.name}
                  </p>
                )}
              </div>
            )) || []}
            {(!classData.subjects || classData.subjects.length === 0) && (
              <div className="col-span-full py-12 text-center">
                <BookOpen className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  No subjects added for this class yet
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <RegisterStudents
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultClassId={classData.id}
      />

      <UpdateStudentModal
        open={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(null);
        }}
        onConfirm={() => {
          if (selectedStudent) {
            deleteStudent(selectedStudent.id, {
              onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedStudent(null);
              },
            });
          }
        }}
        title="Delete Student Record"
        description={`Are you sure you want to delete ${selectedStudent?.name}'s record? This action is permanent and cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete Record"}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ClassDetail;
