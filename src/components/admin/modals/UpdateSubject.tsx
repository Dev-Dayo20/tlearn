import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSubjectSchema, UpdateSubjectType } from "@/schema/SubjectSchema";
import {
  useUpdateSubject,
  useFetchClassesList,
  useGetTeachers,
} from "@/hooks/useSchAdmHooks";
import { useEffect } from "react";
import { Subject } from "@/types/types";

interface UpdateSubjectModalProps {
  open: boolean;
  onClose: () => void;
  subject: Subject | null;
}

export function UpdateSubject({
  open,
  onClose,
  subject,
}: UpdateSubjectModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateSubjectType>({
    resolver: zodResolver(updateSubjectSchema),
  });

  const watchedClassId = watch("classId");
  const watchedTeacherId = watch("teacherId");

  useEffect(() => {
    if (subject && open) {
      setValue("name", subject.name);
      setValue("classId", subject.classId);
      setValue("teacherId", subject.teacherId);
    }
  }, [subject, setValue, open]);

  const { data: classData, isLoading: loadingClasses } = useFetchClassesList();
  const { data: teacherData, isLoading: loadingTeachers } = useGetTeachers(
    "",
    1,
    100,
  );

  const { mutate: updateSubject, isPending } = useUpdateSubject(
    subject?.id || 0,
  );

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data: UpdateSubjectType) => {
    updateSubject(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        {/* Premium Header */}
        <div className="bg-gradient-to-br from-amber-500/10 via-background to-background p-6 border-b border-muted/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">
              Update Subject
            </DialogTitle>
            <DialogDescription className="font-medium text-muted-foreground mt-1">
              Modify the subject details, class, or assigned teacher.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6 scrollbar-hide">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* SUBJECT NAME */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Subject Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Mathematics, English Language..."
                className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                {...register("name")}
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-xs font-bold text-rose-500 ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* CLASS SELECT */}
            <div className="space-y-2">
              <Label
                htmlFor="classId"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Assign to Class
              </Label>
              <Select
                value={watchedClassId ? String(watchedClassId) : ""}
                onValueChange={(value) =>
                  setValue("classId", Number(value), { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  {loadingClasses ? (
                    <SelectItem value="loading">Loading classes...</SelectItem>
                  ) : (
                    classData?.classes?.map((cls: any) => (
                      <SelectItem key={cls.id} value={String(cls.id)}>
                        {cls.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.classId && (
                <p className="text-xs font-bold text-rose-500 ml-1">
                  {errors.classId.message}
                </p>
              )}
            </div>

            {/* TEACHER SELECT */}
            <div className="space-y-2">
              <Label
                htmlFor="teacherId"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Assign Teacher (Optional)
              </Label>
              <Select
                value={watchedTeacherId ? String(watchedTeacherId) : "none"}
                onValueChange={(value) =>
                  setValue(
                    "teacherId",
                    value === "none" ? null : Number(value),
                    { shouldValidate: true },
                  )
                }
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold">
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  <SelectItem value="none">No Teacher</SelectItem>
                  {loadingTeachers ? (
                    <SelectItem value="loading">Loading teachers...</SelectItem>
                  ) : (
                    teacherData?.teachers?.map((teacher) => (
                      <SelectItem key={teacher.id} value={String(teacher.id)}>
                        {teacher.name.toUpperCase()}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.teacherId && (
                <p className="text-xs font-bold text-rose-500 ml-1">
                  {errors.teacherId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-muted/50">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 h-12 rounded-2xl font-bold hover:bg-muted"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-[2] h-12 rounded-2xl font-black bg-amber-600 hover:bg-amber-700 text-white shadow-xl shadow-amber-600/20 transition-all active:scale-[0.98]"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update Subject"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
