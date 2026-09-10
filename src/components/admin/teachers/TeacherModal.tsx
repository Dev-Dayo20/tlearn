import { useState, useEffect } from "react";
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
import { teacherSchema, TeacherFormValues } from "@/schema/teacherSchema";
import { useCreateTeacher, useUpdateTeacher } from "@/hooks/useSchAdmHooks";
import { Teacher } from "@/types/types";
import { Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface TeacherModalProps {
  open: boolean;
  onClose: () => void;
  teacher?: Teacher | null;
}

export function TeacherModal({ open, onClose, teacher }: TeacherModalProps) {
  const isEditing = !!teacher;
  const { mutate: createTeacher, isPending: isCreating } = useCreateTeacher();
  const { mutate: updateTeacher, isPending: isUpdating } = useUpdateTeacher(
    teacher?.id || 0,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      profilePicture: "",
      password: "",
    },
  });

  const handleResetForm = () => {
    reset({
      name: "",
      email: "",
      phoneNumber: "",
      profilePicture: "",
      password: "",
    });
  };

  useEffect(() => {
    if (teacher) {
      reset({
        name: teacher.name,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber || "",
        profilePicture: teacher.profilePicture || "",
        password: "", // Don't populate password
      });
    } else {
      reset({
        name: "",
        email: "",
        phoneNumber: "",
        profilePicture: "",
        password: "",
      });
    }
  }, [teacher, reset, open]);

  const onSubmit = (data: TeacherFormValues) => {
    if (isEditing) {
      // For updates, we usually don't send individual fields if they are empty or if we want to be precise.
      // But for simplicity, we'll send the data.
      const updateData = { ...data };
      if (!updateData.password) delete updateData.password;

      updateTeacher(updateData, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    } else {
      createTeacher(data, {
        onSuccess: (res) => {
          toast.success(res.message || "Teacher created successfully");
          onClose();
          reset();
        },
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3 pr-6">
            <div>
              <DialogTitle className="text-2xl font-black text-foreground">
                {isEditing ? "Edit Teacher Profile" : "Register New Teacher"}
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground mt-1">
                {isEditing
                  ? "Update the teacher's personal information and login credentials."
                  : "Fill in the details to onboard a new teacher to your school faculty."}
              </DialogDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetForm}
              title="Reset all fields"
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-muted-foreground/20 hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-sm shrink-0 gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-bold text-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. John Doe"
                className="rounded-xl h-11 bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 font-semibold"
                {...register("name")}
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-xs text-destructive font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="font-bold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="teacher@school.com"
                className="rounded-xl h-11 bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 font-semibold"
                {...register("email")}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-xs text-destructive font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="phoneNumber"
                className="font-bold text-foreground"
              >
                Phone Number (Optional)
              </Label>
              <Input
                id="phoneNumber"
                placeholder="+234..."
                className="rounded-xl h-11 bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 font-semibold"
                {...register("phoneNumber")}
                disabled={isPending}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-destructive font-medium">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="font-bold text-foreground">
                {isEditing
                  ? "New Password (Leave blank to keep current)"
                  : "Password"}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl h-11 bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 font-semibold"
                {...register("password")}
                disabled={isPending}
              />
              {errors.password && (
                <p className="text-xs text-destructive font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl h-12 font-bold gap-1.5 px-4 border-muted-foreground/20 hover:bg-muted text-foreground transition-all"
              onClick={handleResetForm}
              disabled={isPending}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex-1 rounded-xl h-12 font-bold hover:bg-muted transition-all"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-2 bg-prim hover:bg-prim/90 text-white rounded-xl h-12 px-6 font-bold shadow-lg shadow-prim/20 transition-all active:scale-[0.98]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Saving..."}
                </>
              ) : isEditing ? (
                "Update Profile"
              ) : (
                "Create Teacher"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
