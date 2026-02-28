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
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  const { mutate: assignTeacher, isPending } = useAssignTeacher();

  // Fetch all subjects for dropdown
  const { data: subjectData, isLoading: loadingSubjects } = useQuery({
    queryKey: ["subjects", "all"],
    queryFn: async () => {
      const res = await api.get("/sch-admin/subjects/all");
      return res.data;
    },
    enabled: open,
  });

  const selectedSubject = subjectData?.data?.find(
    (sub: any) => String(sub.id) === selectedSubjectId,
  );

  const handleAssign = () => {
    if (!teacher || !selectedSubjectId) return;

    assignTeacher(
      {
        teacherId: teacher.id,
        subjectId: Number(selectedSubjectId),
      },
      {
        onSuccess: () => {
          onClose();
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
            subject and its associated class.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="space-y-4">
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
                <SelectContent className="rounded-xl max-h-[280px] overflow-y-auto">
                  {loadingSubjects ? (
                    <div className="p-2 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    subjectData?.data?.map((sub: any) => (
                      <SelectItem key={sub.id} value={String(sub.id)}>
                        <div className="flex flex-col">
                          <span className="font-medium">{sub.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {sub.class?.name || "No Class Assigned"}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Display associated class smoothly */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                selectedSubject
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none h-0"
              }`}
            >
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Assigned Class
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {selectedSubject?.class?.name || "N/A"}
                  </p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
              </div>
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
              className="flex-2 bg-prim hover:bg-prim/90 rounded-xl h-12 px-8 font-bold shadow-lg shadow-prim/20"
              onClick={handleAssign}
              disabled={isPending || !selectedSubjectId}
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
