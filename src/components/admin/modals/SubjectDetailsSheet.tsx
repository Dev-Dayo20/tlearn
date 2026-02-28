import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  GraduationCap,
  Users,
  Video,
  Info,
  Calendar,
  Pencil,
  Trash2,
  ChevronRight,
  User,
} from "lucide-react";
import { Subject, Student, Material } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/super-admin/super-admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/utils/statusbadge";

interface SubjectDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  subject: Subject | null;
  onEdit?: (subject: Subject) => void;
  onDelete?: (subject: Subject) => void;
}

// Simplified student list item for the sheet
const StudentListItem = ({ student }: { student: Student }) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-muted/50 hover:bg-muted/30 transition-colors">
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9 border">
        <AvatarImage src={student.profilePicture || ""} alt={student.name} />
        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
          {student.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold capitalize">{student.name}</span>
        <span className="text-[10px] text-muted-foreground font-mono">
          {student.studentId}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <StatusBadge isActive={student.isActive} />
      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
    </div>
  </div>
);

// Material list item for the sheet
const MaterialListItem = ({ material }: { material: Material }) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-muted/50 hover:bg-muted/30 transition-colors">
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
        <Video className="h-5 w-5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold truncate max-w-[200px]">
          {material.title}
        </span>
        <span className="text-[10px] text-muted-foreground">
          Uploaded {new Date(material.uploadedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
    <div className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase">
      {material.duration || "N/A"}
    </div>
  </div>
);

export const SubjectDetailsSheet: React.FC<SubjectDetailsSheetProps> = ({
  open,
  onClose,
  subject,
  onEdit,
  onDelete,
}) => {
  // Fetch students for the class associated with this subject
  const { data: studentsData, isLoading: isLoadingStudents } = useQuery({
    queryKey: ["subject-students", subject?.classId],
    queryFn: async () => {
      if (!subject?.classId) return { students: [] };
      const response = await api.get(`/sch-admin/students`, {
        params: { classId: subject.classId, pageSize: 50 },
      });
      return response.data;
    },
    enabled: !!subject && open,
  });

  // Fetch materials for this subject
  const { data: materialsData, isLoading: isLoadingMaterials } = useQuery({
    queryKey: ["subject-materials", subject?.id],
    queryFn: async () => {
      if (!subject?.id) return { materials: [] };
      const response = await api.get(`/sch-admin/materials`, {
        params: { subjectId: subject.id },
      });
      return response.data;
    },
    enabled: !!subject && open,
  });

  if (!subject) return null;

  const students = studentsData?.students || [];
  const materials = materialsData?.materials || [];

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="sm:max-w-[500px] p-0 flex flex-col h-full bg-background">
        <SheetHeader className="p-6 bg-primary/5 border-b space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-2xl bg-prim/10 text-prim flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl border-2 hover:bg-prim hover:text-white"
                onClick={() => onEdit?.(subject)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-xl border-2 border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500"
                onClick={() => onDelete?.(subject)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <SheetTitle className="text-2xl font-bold uppercase tracking-tight">
              {subject.name}
            </SheetTitle>
            <div className="flex flex-wrap gap-2">
              {subject.code && (
                <Badge variant="secondary" className="font-mono tracking-wider">
                  {subject.code}
                </Badge>
              )}
              {subject.class && (
                <Badge variant="outline" className="bg-primary/5 text-primary">
                  {subject.class.name}
                </Badge>
              )}
            </div>
          </div>
          <SheetDescription className="text-sm">
            Added on {new Date(subject.createdAt).toLocaleDateString()}
          </SheetDescription>
        </SheetHeader>

        <Tabs
          defaultValue="overview"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-4 sm:px-6 border-b">
            <TabsList className="w-full bg-transparent h-12 p-0 gap-3 sm:gap-6 justify-between sm:justify-start">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 sm:px-0 h-full font-bold text-[10px] sm:text-xs uppercase tracking-widest"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="students"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 sm:px-0 h-full font-bold text-[10px] sm:text-xs uppercase tracking-widest"
              >
                Students
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 sm:px-0 h-full font-bold text-[10px] sm:text-xs uppercase tracking-widest"
              >
                Materials
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <TabsContent
              value="overview"
              className="p-6 m-0 space-y-8 animate-in fade-in slide-in-from-right-2 duration-300"
            >
              {/* Teacher Info */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <GraduationCap className="h-3 w-3" /> Assigned Teacher
                </h4>
                {subject.teacher ? (
                  <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 flex items-center gap-4 group hover:bg-muted/50 transition-colors">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary font-black">
                        {subject.teacher.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm tracking-tight">
                        {subject.teacher.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                        Primary Instructor
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center gap-2 text-muted-foreground">
                    <User className="h-8 w-8 opacity-20" />
                    <p className="text-xs font-semibold">
                      No teacher assigned yet
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Info className="h-3 w-3" /> About Subject
                </h4>
                <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50">
                  <p className="text-sm text-balance leading-relaxed">
                    {subject.description ||
                      "No description provided for this subject."}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-2xl font-black text-blue-700 leading-none mt-1">
                    {students.length}
                  </span>
                  <span className="text-[10px] font-bold text-blue-600/70 uppercase">
                    Total Students
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col gap-1">
                  <Video className="h-4 w-4 text-emerald-500" />
                  <span className="text-2xl font-black text-emerald-700 leading-none mt-1">
                    {materials.length}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600/70 uppercase">
                    Videos
                  </span>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  Last updated{" "}
                  {new Date(
                    subject.updatedAt || subject.createdAt,
                  ).toDateString()}
                </span>
              </div>
            </TabsContent>

            <TabsContent
              value="students"
              className="p-6 m-0 animate-in fade-in slide-in-from-right-2 duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    Enrolled Students
                  </h4>
                  <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {students.length}
                  </span>
                </div>

                {isLoadingStudents ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-16 w-full bg-muted animate-pulse rounded-xl"
                      />
                    ))}
                  </div>
                ) : students.length > 0 ? (
                  <div className="space-y-3">
                    {students.map((student: Student) => (
                      <StudentListItem key={student.id} student={student} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">No students found</p>
                      <p className="text-xs text-muted-foreground max-w-[200px]">
                        There are no students registered in{" "}
                        {subject.class?.name || "this class"}.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="materials"
              className="p-6 m-0 animate-in fade-in slide-in-from-right-2 duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    Subject Materials
                  </h4>
                  <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    {materials.length}
                  </span>
                </div>

                {isLoadingMaterials ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-16 w-full bg-muted animate-pulse rounded-xl"
                      />
                    ))}
                  </div>
                ) : materials.length > 0 ? (
                  <div className="space-y-3">
                    {materials.map((material: Material) => (
                      <MaterialListItem key={material.id} material={material} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                      <Video className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">No materials yet</p>
                      <p className="text-xs text-muted-foreground max-w-[200px]">
                        No videos or learning resources have been uploaded for
                        this subject.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>

          <div className="p-6 border-t mt-auto">
            <Button
              variant="secondary"
              className="w-full h-11 rounded-xl font-bold"
              onClick={onClose}
            >
              Close Details
            </Button>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
