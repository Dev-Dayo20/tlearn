import { useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, User, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  createStudentSchema,
  CreateStudentType,
} from "@/schema/createStudentSchema";
import { useCreateStudent } from "@/hooks/useSchAdmHooks";
import { useFetchClassesList } from "@/hooks/useSchAdmHooks";

interface RegisterStudentModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterStudents({ open, onClose }: RegisterStudentModalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { mutate: createStudent, isPending } = useCreateStudent();

  const form = useForm<CreateStudentType>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: "",
      classId: undefined,
      armId: undefined,
      dateOfBirth: "",
      profilePicture: "",
    },
  });

  const { data: classesData } = useFetchClassesList();
  const classes = classesData?.classes || [];
  const selectedClassId = form.watch("classId");
  const selectedClass = classes.find((cls: any) => cls.id === selectedClassId);
  const arms = selectedClass?.arms || [];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        form.setValue("profilePicture", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: CreateStudentType) => {
    createStudent(data, {
      onSuccess: () => {
        form.reset();
        setPhotoPreview(null);
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Register New Student
          </DialogTitle>
          <DialogDescription>
            Add a new student to the system. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Photo Upload */}
            <div className="flex justify-center">
              <div className="group relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-secondary/80 overflow-hidden">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="h-24 w-24 object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-input"
                />
                <label
                  htmlFor="photo-input"
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                </label>
              </div>
            </div>

            {/* Student Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Class Selection */}
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class *</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                      form.setValue("armId", undefined);
                    }}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes?.map((cls: any) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Arm Selection (Optional) */}
            {arms.length > 0 && (
              <FormField
                control={form.control}
                name="armId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arm</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value ? Number(value) : undefined)
                      }
                      value={field.value?.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an arm (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {arms.map((arm: any) => (
                          <SelectItem key={arm.id} value={arm.id.toString()}>
                            {arm.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Date of Birth (Optional) */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Registering..." : "Register Student"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
