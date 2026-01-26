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
import { toast } from "@/components/ui/sonner";

interface RegisterStudentModalProps {
  open: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export function RegisterStudents({ open, onClose }: RegisterStudentModalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

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
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, or WebP)");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setPhotoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhotoToCloudinary = async (): Promise<string | null> => {
    if (!photoFile) return null;

    setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append("file", photoFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "tlearn/schools");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Failed to upload profile picture");
      return null;
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const onSubmit = async (data: CreateStudentType) => {
    let profilePictureUrl: string | null = null;

    if (photoFile) {
      profilePictureUrl = await uploadPhotoToCloudinary();
      if (!profilePictureUrl) return;
    }

    const submitData = {
      ...data,
      profilePicture: profilePictureUrl || null,
    };

    createStudent(submitData, {
      onSuccess: () => {
        form.reset();
        setPhotoPreview(null);
        setPhotoFile(null);
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
                  disabled={isPending || isUploadingPhoto}
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
                  <FormLabel>
                    Full Name
                    <span className="ml-1 text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Class
                    <span className="ml-1 text-red-500">*</span>
                  </FormLabel>
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
                disabled={isPending || isUploadingPhoto}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isPending || isUploadingPhoto}
              >
                {(isPending || isUploadingPhoto) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPending
                  ? "Registering..."
                  : isUploadingPhoto
                    ? "Uploading photo..."
                    : "Register Student"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
