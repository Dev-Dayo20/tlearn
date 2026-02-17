import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignTeacher } from "@/hooks/useSchAdmHooks";
import { Teacher } from "@/types/types";
import api from "@/services/api/super-admin/super-admin";
import { Loader2, BookOpen, GraduationCap } from "lucide-react";

interface TeacherAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

export function TeacherAssignmentModal({
  open,
  onClose,
  teacher,
}: TeacherAssignmentModalProps) {
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedArmId, setSelectedArmId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  const { mutate: assignTeacher, isPending } = useAssignTeacher();

  // Fetch classes for dropdown
  const { data: classData, isLoading: loadingClasses } = useQuery({
    queryKey: ["classes-list"],
    queryFn: async () => {
      const res = await api.get("/sch-admin/classes/list");
      return res.data;
    },
    enabled: open,
  });

  // Fetch subjects for dropdown
  // Note: Usually subjects are tied to classes, but here we'll list all for now or filter by class
  const { data: subjectData, isLoading: loadingSubjects } = useQuery({
    queryKey: ["subjects-list", selectedClassId],
    queryFn: async () => {
      // If we have a classId, we might want to fetch subjects for that class
      // For now, let's fetch all subjects
      const endpoint = selectedClassId
        ? `/sch-admin/subjects?classId=${selectedClassId}`
        : "/sch-admin/subjects";
      const res = await api.get(endpoint);
      return res.data;
    },
    enabled: open,
  });

  const handleAssign = () => {
    if (!teacher) return;

    assignTeacher(
      {
        teacherId: teacher.id,
        classId: selectedClassId ? Number(selectedClassId) : undefined,
        armId: selectedArmId ? Number(selectedArmId) : undefined,
        subjectId: selectedSubjectId ? Number(selectedSubjectId) : undefined,
      },
      {
        onSuccess: () => {
          onClose();
          setSelectedClassId("");
          setSelectedArmId("");
          setSelectedSubjectId("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Assign Teacher
          </DialogTitle>
          <DialogDescription>
            Assign{" "}
            <span className="text-primary font-bold">{teacher?.name}</span> to a
            class and subject.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label className="font-bold flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Select Class
              </Label>
              <Select
                value={selectedClassId}
                onValueChange={setSelectedClassId}
              >
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {loadingClasses ? (
                    <div className="p-2 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    classData?.classes?.map((cls: any) => (
                      <SelectItem key={cls.id} value={String(cls.id)}>
                        {cls.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="font-bold flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Select Subject
              </Label>
              <Select
                value={selectedSubjectId}
                onValueChange={setSelectedSubjectId}
              >
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {loadingSubjects ? (
                    <div className="p-2 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    subjectData?.subjects?.map((sub: any) => (
                      <SelectItem key={sub.id} value={String(sub.id)}>
                        {sub.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              variant="ghost"
              className="flex-1 rounded-xl h-12 font-bold"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="flex-2 bg-primary hover:bg-primary/90 rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20"
              onClick={handleAssign}
              disabled={isPending || (!selectedClassId && !selectedSubjectId)}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                "Complete Assignment"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
