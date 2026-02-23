import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { createClassSchema, ClassType } from "@/schema/ClassSchema";
import { useCreateClass } from "@/hooks/useSchAdmHooks";
import api from "@/services/api/super-admin/super-admin";

import { TeacherForDropdownRes } from "@/types/types";

interface CreateClassModalProps {
  open: boolean;
  onClose: () => void;
}

const fetchTeachers = async (): Promise<TeacherForDropdownRes> => {
  const res = await api.get("/sch-admin/teachers");
  return res.data;
};

export function CreateClass({ open, onClose }: CreateClassModalProps) {
  const [hasArms, setHasArms] = useState(false);
  const [arms, setArms] = useState([""]);
  const [subjects, setSubjects] = useState([""]);

  const queryClient = useQueryClient();

  const { data: teacherData, isLoading: loadingTeachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ClassType>({
    resolver: zodResolver(createClassSchema),
  });

  const { mutate: addClass, isPending } = useCreateClass();

  const onSubmit = (data: ClassType) => {
    const payload = {
      name: data.name.trim(),
      teacher: data.teacherId ? Number(data.teacherId) : undefined,
      arms: hasArms ? arms.filter((a) => a.trim()).map((a) => a.trim()) : [],
      subjects: subjects.filter((s) => s.trim()),
    };
    addClass(payload, {
      onSuccess: () => {
        reset();
        setArms([""]);
        setHasArms(false);
        onClose();
      },
    });
    // console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        {/* Premium Header */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-background p-6 border-b border-muted/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">
              Create New Class
            </DialogTitle>
            <DialogDescription className="font-medium text-muted-foreground mt-1">
              Set up a new class with teacher and subject assignments.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6 scrollbar-hide">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="className"
                  className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
                >
                  Class Name
                </Label>
                <Input
                  id="className"
                  placeholder="e.g., Primary 1, JSS 1..."
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

              {/* ASSIGN TEACHER */}
              <div className="space-y-2">
                <Label
                  htmlFor="teacherId"
                  className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
                >
                  Assign Teacher
                </Label>
                <Select onValueChange={(value) => setValue("teacherId", value)}>
                  <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-xl">
                    {loadingTeachers && (
                      <SelectItem value="loading">
                        Loading teachers...
                      </SelectItem>
                    )}

                    {!loadingTeachers &&
                      teacherData?.teachers?.map((teacher) => (
                        <SelectItem key={teacher.id} value={String(teacher.id)}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Arms Toggle */}
              <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4 transition-colors hover:bg-muted/30">
                <div className="space-y-1">
                  <Label className="text-sm font-bold">Class has Arms</Label>
                  <p className="text-xs text-muted-foreground font-medium">
                    Enable if this class has multiple arms
                  </p>
                </div>
                <Switch
                  checked={hasArms}
                  onCheckedChange={setHasArms}
                  disabled={isPending}
                  className="data-[state=checked]:bg-prim transition-colors duration-200"
                />
              </div>

              {/* Arms Input */}
              {hasArms && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                    Arms Configuration
                  </Label>
                  {arms.map((arm, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        placeholder="e.g., Butterfly, Rose"
                        className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold"
                        value={arm}
                        onChange={(e) => {
                          const newArms = [...arms];
                          newArms[i] = e.target.value;
                          setArms(newArms);
                        }}
                        disabled={isPending}
                      />
                      {arms.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-12 w-12 rounded-2xl text-rose-500 hover:bg-rose-50"
                          onClick={() =>
                            setArms(arms.filter((_, idx) => idx !== i))
                          }
                          disabled={isPending}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 rounded-2xl border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 font-bold transition-all"
                    onClick={() => setArms([...arms, ""])}
                    disabled={isPending}
                  >
                    + Add Class Arm
                  </Button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-muted/50">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 h-12 rounded-2xl font-bold hover:bg-muted transition-all"
                onClick={onClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-[2] h-12 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Class"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
