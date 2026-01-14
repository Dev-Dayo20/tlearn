import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { createClassSchema, ClassType } from "@/schema/ClassSchema";
import { useCreateClass } from "@/hooks/useSchAdmHooks";
import { sanitizeText } from "@/utils/sanitize";

interface CreateClassModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateClass({ open, onClose }: CreateClassModalProps) {
  const [hasArms, setHasArms] = useState(false);
  const [arms, setArms] = useState([""]);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassType>({
    resolver: zodResolver(createClassSchema),
  });

  const { mutate: addClass, isPending } = useCreateClass();

  const onSubmit = (data: ClassType) => {
    const payload = {
      ...data,
      arms: hasArms ? arms.filter((a) => a.trim()) : [],
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Class
          </DialogTitle>
          <DialogDescription>
            Set up a new class with teacher and subject assignments.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="className">Class Name</Label>
              <Input
                id="className"
                placeholder="e.g., Primary 1, JSS 1..."
                {...register("name")}
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* ASSIGN TEACHER */}
            <div className="space-y-2">
              <Label htmlFor="className">Assign Teacher</Label>
              <Input
                id="className"
                placeholder="e.g., Mr. Usman, Mal.Ibrahim..."
                {...register("teacher")}
                disabled={isPending}
              />
              {errors.teacher && (
                <p className="text-sm text-red-500">{errors.teacher.message}</p>
              )}
            </div>

            {/* Arms Toggle */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <Label className="text-base">Class has Arms</Label>
                <p className="text-sm text-muted-foreground">
                  Enable if this class has multiple arms
                </p>
              </div>
              <Switch
                checked={hasArms}
                onCheckedChange={setHasArms}
                disabled={isPending}
                className="data-[state=checked]:bg-prim  data-[state=checked]:text-white transition-colors duration-200"
              />
            </div>

            {/* Arms Input */}
            {hasArms && (
              <div className="space-y-2">
                <Label>Arms</Label>
                {arms.map((arm, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder="e.g., Butterfly, Rose"
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
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setArms(arms.filter((_, idx) => idx !== i))
                        }
                        disabled={isPending}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setArms([...arms, ""])}
                  disabled={isPending}
                >
                  + Add Arm
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              className="flex-1 bg-accent text-black hover:bg-yellow-300"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-prim hover:bg-accent hover:text-black"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
