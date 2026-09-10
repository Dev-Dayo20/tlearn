import { useEffect } from "react";
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
import { RotateCcw } from "lucide-react";
import { subjectSchema, SubjectType } from "@/schema/SubjectSchema";
import {
  useCreateSubject,
  useFetchClassesList,
  useGetTeachers,
} from "@/hooks/useSchAdmHooks";
import { formatTitleCase } from "@/lib/utils";

interface CreateSubjectModalProps {
  open: boolean;
  onClose: () => void;
  defaultClassId?: number;
}

export function CreateSubject({
  open,
  onClose,
  defaultClassId,
}: CreateSubjectModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubjectType>({
    resolver: zodResolver(subjectSchema),
  });

  const classId = watch("classId");

  const handleReset = () => {
    reset({
      name: "",
      code: "",
      description: "",
      classId: defaultClassId,
      teacherId: undefined,
    });
  };

  useEffect(() => {
    if (open && defaultClassId) {
      setValue("classId", defaultClassId);
    }
  }, [open, defaultClassId, setValue]);

  const { data: classData, isLoading: loadingClasses } = useFetchClassesList();
  const { data: teacherData, isLoading: loadingTeachers } = useGetTeachers(
    "",
    1,
    100,
  );

  const { mutate: createSubject, isPending } = useCreateSubject();

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const onSubmit = (data: SubjectType) => {
    const formattedData = {
      ...data,
      name: data.name.trim(),
      code: data.code.trim().toUpperCase(),
      description: data.description?.trim() || undefined,
      teacherId: data.teacherId ? Number(data.teacherId) : undefined,
    };

    createSubject(formattedData, {
      onSuccess: () => {
        handleReset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95%] sm:max-w-xl p-0 overflow-y-auto max-h-[90vh] rounded-3xl border-none shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8 border-b border-muted/50 sticky top-0 z-10 backdrop-blur-md">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <DialogTitle className="text-2xl font-black text-foreground">
                  Create New Subject
                </DialogTitle>
                <DialogDescription className="text-sm font-medium text-muted-foreground mt-1">
                  Add a new subject to the curriculum and assign a teacher.
                </DialogDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                title="Reset form"
                className="rounded-xl h-8 px-2.5 text-xs font-bold border-muted-foreground/20 hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-sm shrink-0 gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Subject Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Subject Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g. Mathematics, English Language, Physics"
                className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 font-semibold"
                {...register("name")}
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-xs font-bold text-rose-500 ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Subject Code */}
            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Subject Code <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="code"
                placeholder="e.g. MTH101, ENG, PHY"
                className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 font-semibold uppercase"
                {...register("code")}
                disabled={isPending}
              />
              {errors.code && (
                <p className="text-xs font-bold text-rose-500 ml-1">
                  {errors.code.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of the subject..."
                className="min-h-[100px] rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 font-semibold resize-none"
                {...register("description")}
                disabled={isPending}
              />
              {errors.description && (
                <p className="text-xs font-bold text-rose-500 ml-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Class Selection */}
            <div className="space-y-2">
              <Label
                htmlFor="classId"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Class <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={classId ? String(classId) : undefined}
                onValueChange={(value) => setValue("classId", Number(value))}
                disabled={!!defaultClassId}
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
                        {formatTitleCase(cls.name)}
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

            {/* Assign Teacher */}
            <div className="space-y-2">
              <Label
                htmlFor="teacherId"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Assign Teacher (Optional)
              </Label>
              <Select
                onValueChange={(value) => setValue("teacherId", Number(value))}
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold">
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  {loadingTeachers ? (
                    <SelectItem value="loading">Loading teachers...</SelectItem>
                  ) : (
                    teacherData?.teachers?.map((teacher: any) => (
                      <SelectItem key={teacher.id} value={String(teacher.id)}>
                        {formatTitleCase(teacher.name)}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-muted/50">
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-2xl font-bold border-muted-foreground/20 hover:bg-muted text-foreground gap-2 px-5"
                onClick={handleReset}
                disabled={isPending}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
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
                className="flex-[2] h-12 rounded-2xl font-black bg-prim hover:bg-prim/70 text-white shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Subject"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
