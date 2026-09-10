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
import { X, RotateCcw } from "lucide-react";
import { createClassSchema, ClassType } from "@/schema/ClassSchema";
import { useCreateClass } from "@/hooks/useSchAdmHooks";
import api from "@/services/api/super-admin/super-admin";
import { formatTitleCase } from "@/lib/utils";

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
    reset,
    formState: { errors },
  } = useForm<ClassType>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleReset = () => {
    reset({ name: "" });
    setHasArms(false);
    setArms([""]);
    setSubjects([""]);
  };

  const { mutate: createClass, isPending } = useCreateClass();

  const onSubmit = (data: ClassType) => {
    const validArms = hasArms
      ? arms.map((arm) => arm.trim()).filter((arm) => arm.length > 0)
      : undefined;

    const formattedData: ClassType = {
      ...data,
      arms: validArms && validArms.length > 0 ? validArms : undefined,
    };

    createClass(formattedData, {
      onSuccess: () => {
        handleReset();
        onClose();
      },
    });
  };

  const handleArmChange = (index: number, value: string) => {
    const newArms = [...arms];
    newArms[index] = value;
    setArms(newArms);
  };

  const removeArm = (index: number) => {
    const newArms = arms.filter((_, i) => i !== index);
    setArms(newArms.length > 0 ? newArms : [""]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95%] sm:max-w-xl p-0 overflow-y-auto max-h-[90vh] rounded-3xl border-none shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8 border-b border-muted/50 sticky top-0 z-10 backdrop-blur-md">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <DialogTitle className="text-2xl font-black text-foreground">
                  Create New Class
                </DialogTitle>
                <DialogDescription className="text-sm font-medium text-muted-foreground mt-1">
                  Add a new academic class level and configure its subdivisions.
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
                >
                  Class Name <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Primary 1, JSS 2, Grade 10"
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

              {/* Has Arms Switch */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-muted/50">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-foreground cursor-pointer">
                    Enable Class Arms / Sections
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Does this class have multiple arms like Gold, Silver,
                    Diamond?
                  </p>
                </div>
                <Switch
                  checked={hasArms}
                  onCheckedChange={setHasArms}
                  disabled={isPending}
                />
              </div>

              {/* Arms Inputs */}
              {hasArms && (
                <div className="space-y-3 pt-2">
                  <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                    Class Arms List
                  </Label>
                  {arms.map((arm, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Arm ${index + 1} Name (e.g. Diamond)`}
                        value={arm}
                        onChange={(e) => handleArmChange(index, e.target.value)}
                        className="h-11 rounded-xl bg-muted/30 border-muted-foreground/20 font-semibold"
                        disabled={isPending}
                      />
                      {arms.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-11 w-11 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 shrink-0"
                          onClick={() => removeArm(index)}
                          disabled={isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-11 rounded-2xl hover:border-accent/50 hover:bg-accent/20 text-prim hover:text-prim font-bold transition-all"
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
                className="flex-1 h-12 rounded-2xl font-bold hover:bg-muted transition-all"
                onClick={onClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-[2] h-12 rounded-2xl font-black bg-prim hover:bg-prim/70 text-white shadow-xl shadow-prim/20 transition-all active:scale-[0.98]"
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
