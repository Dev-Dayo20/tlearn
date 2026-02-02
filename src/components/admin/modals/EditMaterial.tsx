import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Pencil, Loader2, Save, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchClassesList } from "@/hooks/useSchAdmHooks";
import { updateMaterial } from "@/services/api/admin/schLoginApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Material } from "@/types/types";

interface EditMaterialModalProps {
  open: boolean;
  onClose: () => void;
  material: Material | null;
}

const updateMaterialSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional().nullable(),
  classId: z.string().min(1, "Class is required").optional(),
  armId: z.string().optional().nullable(),
  subjectId: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof updateMaterialSchema>;

export function EditMaterial({
  open,
  onClose,
  material,
}: EditMaterialModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const { data: classesData } = useFetchClassesList();
  const classes = classesData?.classes || [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(updateMaterialSchema),
    defaultValues: {
      title: "",
      description: "",
      classId: "",
      armId: "all",
      subjectId: "all",
    },
  });

  useEffect(() => {
    if (material) {
      reset({
        title: material.title,
        description: material.description,
        classId: material.classId?.toString() || "",
        armId: material.armId?.toString() || "all",
        subjectId: material.subjectId?.toString() || "all",
      });
    }
  }, [material, reset]);

  const selectedClassId = watch("classId");
  const selectedClass = classes.find(
    (c: any) => c.id.toString() === selectedClassId,
  );
  const arms = selectedClass?.arms || [];

  const onSubmit = async (data: FormValues) => {
    if (!material) return;

    setIsUpdating(true);
    try {
      const payload = {
        title: data.title,
        description: data.description || null,
        classId: data.classId ? Number(data.classId) : undefined,
        armId:
          data.armId === "all" ? null : data.armId ? Number(data.armId) : null,
        subjectId:
          data.subjectId === "all"
            ? null
            : data.subjectId
              ? Number(data.subjectId)
              : null,
      };

      await updateMaterial(material.id, payload);
      toast.success("Material updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update material");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!material) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh] p-0 rounded-3xl border-none shadow-2xl">
        <div className="bg-gradient-to-br from-amber-50 via-background to-background p-6 border-b border-muted/50">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Pencil className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-foreground">
                  Edit Material Details
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground">
                  Update the metadata for this learning resource.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="edit-title"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Material Title
              </Label>
              <Input
                id="edit-title"
                placeholder="Material Title"
                className={cn(
                  "h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-amber-200 transition-all font-semibold",
                  errors.title && "border-rose-500",
                )}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs font-bold text-rose-500 flex items-center gap-1 ml-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="edit-description"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Description
              </Label>
              <Textarea
                id="edit-description"
                placeholder="Description"
                className="min-h-[100px] rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-amber-200 transition-all resize-none font-medium"
                {...register("description")}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                Class Level
              </Label>
              <Select
                onValueChange={(v) => setValue("classId", v)}
                value={watch("classId")}
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  {classes.map((c: any) => (
                    <SelectItem
                      key={c.id}
                      value={c.id.toString()}
                      className="rounded-xl font-medium"
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                Class Arm
              </Label>
              <Select
                onValueChange={(v) => setValue("armId", v)}
                value={watch("armId")}
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold">
                  <SelectValue placeholder="All Arms" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  <SelectItem value="all" className="rounded-xl font-medium">
                    All Arms
                  </SelectItem>
                  {arms.map((arm: any) => (
                    <SelectItem
                      key={arm.id}
                      value={arm.id.toString()}
                      className="rounded-xl font-medium"
                    >
                      {arm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                Subject
              </Label>
              <Select
                onValueChange={(v) => setValue("subjectId", v)}
                value={watch("subjectId")}
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  <SelectItem value="all" className="rounded-xl font-medium">
                    All Subjects
                  </SelectItem>
                  <SelectItem value="1" className="rounded-xl font-medium">
                    Mathematics
                  </SelectItem>
                  <SelectItem value="2" className="rounded-xl font-medium">
                    English Language
                  </SelectItem>
                  <SelectItem value="3" className="rounded-xl font-medium">
                    Basic Science
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6 border-t border-muted/50 flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isUpdating}
              className="flex-1 h-12 rounded-2xl font-bold hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="flex-[2] h-12 rounded-2xl font-black bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-200 transition-all active:scale-95"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
