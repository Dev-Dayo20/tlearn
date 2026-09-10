import { useState, useEffect } from "react";
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
import { User, Loader2, Camera, Calendar, Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  updateStudentSchema,
  UpdateStudentInput,
} from "@/schema/createStudentSchema";
import { useUpdateStudent, useFetchClassesList } from "@/hooks/useSchAdmHooks";
import { Student } from "@/types/types";
import { toast } from "sonner";
import { ImageCropperModal } from "./ImageCropperModal";

interface UpdateStudentModalProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export function UpdateStudentModal({
  open,
  onClose,
  student,
}: UpdateStudentModalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const { mutate: updateStudent, isPending } = useUpdateStudent(
    student?.id || 0,
  );

  const form = useForm<UpdateStudentInput>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      name: "",
      classId: undefined,
      armId: undefined,
      dateOfBirth: "",
      profilePicture: "",
    },
  });

  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        classId: student.class?.id,
        armId: student.arm?.id || null,
        dateOfBirth: student.dateOfBirth
          ? new Date(student.dateOfBirth).toISOString().split("T")[0]
          : "",
        profilePicture: student.profilePicture || "",
      });
      setPhotoPreview(student.profilePicture || null);
    }
  }, [student, form, open]);

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
        setSelectedImageUrl(reader.result as string);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = async (croppedBlob: Blob) => {
    const croppedFile = new File([croppedBlob], "profile-picture.jpg", {
      type: "image/jpeg",
    });
    setPhotoFile(croppedFile);
    setPhotoPreview(URL.createObjectURL(croppedBlob));
    setCropperOpen(false);
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

  const onSubmit = async (data: UpdateStudentInput) => {
    let profilePictureUrl = student?.profilePicture || "";

    if (photoFile) {
      const uploadedUrl = await uploadPhotoToCloudinary();
      if (!uploadedUrl) return;
      profilePictureUrl = uploadedUrl;
    }

    const submitData = {
      ...data,
      profilePicture: profilePictureUrl || null,
      email: student?.email || null,
    };

    updateStudent(submitData, {
      onSuccess: (res) => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-y-auto max-h-[95vh] rounded-3xl border-none shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-amber-500/10 via-background to-background p-6 md:p-8 border-b border-muted/50 sticky top-0 z-10 backdrop-blur-md">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                <Pencil className="w-8 h-8" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-black tracking-tight text-foreground">
                  Update Student Profile
                </DialogTitle>
                <DialogDescription className="text-base font-medium text-muted-foreground mt-1">
                  Modify the student's academic and personal details.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Profile Photo Upload - Side Column */}
              <div className="md:col-span-4 flex flex-col items-center gap-4">
                <div className="group relative">
                  <div
                    className={cn(
                      "flex h-40 w-40 items-center justify-center rounded-3xl bg-muted/30 border-2 border-dashed border-muted-foreground/20 overflow-hidden transition-all duration-300 group-hover:border-amber-500/40",
                      photoPreview &&
                        "border-solid border-amber-500/20 bg-background",
                    )}
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                        <User className="h-12 w-12" />
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          No Photo
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-input-update"
                    disabled={isPending || isUploadingPhoto}
                  />
                  <label
                    htmlFor="photo-input-update"
                    className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-xl shadow-amber-500/20 transition-all hover:scale-110 hover:-rotate-12 cursor-pointer active:scale-95"
                  >
                    <Camera className="h-6 w-6" />
                  </label>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-foreground">
                    Student Photo
                  </h4>
                  <p className="text-[10px] text-muted-foreground/60 font-medium max-w-[120px] mt-1">
                    Update the student's passport photograph.
                  </p>
                </div>
              </div>

              {/* Form Fields - Main Column */}
              <div className="md:col-span-8 space-y-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                        Full Name <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. John Doe Adewale"
                          className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-bold text-rose-500" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  {/* Class Selection */}
                  <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                          Class <span className="text-rose-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(Number(value));
                            form.setValue("armId", null);
                          }}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold text-left">
                              <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl shadow-xl max-h-[280px] overflow-y-auto">
                            {classes?.map((cls: any) => (
                              <SelectItem
                                key={cls.id}
                                value={cls.id.toString()}
                                className="rounded-xl font-medium"
                              >
                                {cls.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-bold text-rose-500" />
                      </FormItem>
                    )}
                  />

                  {/* Arm Selection */}
                  <FormField
                    control={form.control}
                    name="armId"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                          Arm
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(
                              value === "null" ? null : Number(value),
                            )
                          }
                          value={
                            field.value === null
                              ? "null"
                              : field.value?.toString() || "null"
                          }
                          disabled={arms.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 font-semibold disabled:opacity-50 text-left">
                              <SelectValue
                                placeholder={
                                  arms.length > 0 ? "Select Arm" : "No Arms"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl shadow-xl max-h-[280px] overflow-y-auto">
                            <SelectItem
                              value="null"
                              className="rounded-xl font-medium"
                            >
                              No Arm
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
                        <FormMessage className="font-bold text-rose-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold pl-12 dark:[color-scheme:dark]"
                            {...field}
                            value={field.value || ""}
                          />
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500 dark:text-amber-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage className="font-bold text-rose-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="pt-8 border-t border-muted/50 flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1 h-12 rounded-2xl font-bold hover:bg-muted transition-all"
                disabled={isPending || isUploadingPhoto}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-[2] h-12 rounded-2xl font-black bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98]"
                disabled={isPending || isUploadingPhoto}
              >
                {isPending || isUploadingPhoto ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isPending ? "Updating..." : "Uploading photo..."}
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-5 w-5" />
                    Update Record
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>

      {selectedImageUrl && (
        <ImageCropperModal
          image={selectedImageUrl}
          open={cropperOpen}
          onClose={() => setCropperOpen(false)}
          onConfirm={handleCropConfirm}
        />
      )}
    </Dialog>
  );
}
