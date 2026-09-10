import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Eye, EyeOff, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SchoolData,
  schoolDataSchema,
  AddSchoolPayload,
} from "@/utils/validation";
import { SchoolArray } from "@/types/types";
import { useAddSchool } from "@/hooks/useSuperAdminLogin";
import { toast } from "@/components/ui/sonner";
import {
  sanitizeText,
  sanitizeSubdomain,
  sanitizeEmail,
} from "@/utils/sanitize";
import {
  useToggleSchoolStatus,
  useDeleteSchool,
} from "@/hooks/useSuperAdminLogin";

interface AddSchoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSchoolDialog({ open, onOpenChange }: AddSchoolDialogProps) {
  const { mutate: addSchool, isPending } = useAddSchool();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showConfirmAdminPassword, setShowConfirmAdminPassword] =
    useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<SchoolArray | null>(
    null,
  );

  const { mutate: toggleStatus, isPending: isToggling } =
    useToggleSchoolStatus();
  const { mutate: deleteSchool, isPending: isDeleting } = useDeleteSchool();

  const handleToggleStatus = (school: SchoolArray) => {
    toggleStatus({ schoolId: school.id, isActive: !school.isActive });
  };

  const handleDeleteClick = (school: SchoolArray) => {
    setSchoolToDelete(school);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (schoolToDelete) {
      deleteSchool(schoolToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSchoolToDelete(null);
        },
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm<SchoolData>({
    resolver: zodResolver(schoolDataSchema),
  });

  const password = watch("adminPassword");

  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file for the logo", {
          duration: 5000,
        });
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo file size must be less than 5MB", { duration: 5000 });
        return;
      }

      setLogoFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  // Reset form fields and logo
  const handleReset = () => {
    reset({
      schoolName: "",
      subdomain: "",
      schoolEmail: "",
      address: "",
      adminName: "",
      adminEmail: "",
      adminPassword: "",
      confirmAdminPassword: "",
    });
    setLogoFile(null);
    setLogoPreview(null);
  };

  const onSubmit = (data: SchoolData) => {
    const { confirmAdminPassword, logo, ...submitData } = data;

    const sanitizedata: AddSchoolPayload = {
      schoolName: sanitizeText(data.schoolName),
      subdomain: sanitizeSubdomain(data.subdomain),
      schoolEmail: sanitizeEmail(data.schoolEmail),
      address: sanitizeText(data.address),
      adminEmail: sanitizeText(data.adminEmail),
      adminName: sanitizeText(data.adminName),
      adminPassword: data.adminPassword,
      logo: logoFile ? logoFile : undefined,
    };
    // console.log(sanitizedata);

    addSchool(sanitizedata, {
      onSuccess: () => {
        reset();
        setLogoFile(null);
        setLogoPreview(null);
        onOpenChange(false);
        toast.success("School registered successfully!");
      },
      onError: (error: any) => {
        if (
          error.message === "Validation failed" &&
          Array.isArray(error.details)
        ) {
          let firstErrMsg = "";

          error.details.forEach((detail) => {
            setError(detail.path as keyof SchoolData, {
              type: "server",
              message: detail.msg,
            });
            if (firstErrMsg === "") {
              firstErrMsg = detail.msg;
            }
          });
          if (firstErrMsg) {
            // Check if we captured an error message
            toast.error(`Validation Failed: ${firstErrMsg}`, {
              duration: 5000,
            });
          }
        } else {
          const errorMessage =
            error.message || "Failed to add school due to an unexpected error.";
          toast.error(errorMessage, { duration: 5000 });
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-6">
            <div>
              <DialogTitle className="text-2xl font-black text-foreground">
                Add New School
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground mt-1">
                Register a new school on the platform. Fill in all required
                information.
              </DialogDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              title="Reset all form fields"
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-muted-foreground/20 hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-sm shrink-0 gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* School Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              School Information
            </h4>

            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name *</Label>
              <Input
                id="schoolName"
                placeholder="Lincoln High School"
                disabled={isPending}
                {...register("schoolName")}
              />
              {errors.schoolName && (
                <p className="text-sm text-red-600">
                  {errors.schoolName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomain *</Label>
              <Input
                id="subdomain"
                placeholder="lincoln-high"
                disabled={isPending}
                {...register("subdomain")}
              />
              {errors.subdomain && (
                <p className="text-sm text-red-600">
                  {errors.subdomain.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolEmail">School Email *</Label>
              <Input
                id="schoolEmail"
                type="email"
                placeholder="admin@school.edu"
                disabled={isPending}
                {...register("schoolEmail")}
              />
              {errors.schoolEmail && (
                <p className="text-sm text-red-600">
                  {errors.schoolEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">School Address *</Label>
              <Input
                id="address"
                placeholder="123 School Street, City"
                disabled={isPending}
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">School Logo URL (Optional)</Label>
              {logoPreview ? (
                <div className="relative w-32 h-32 border-2 border-dashed rounded-lg p-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    disabled={isPending}
                    className="hidden"
                  />
                  <label htmlFor="logo" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload logo
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* ADMIN INFORMATION */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground">
              Admin Information
            </h4>

            <div className="space-y-2">
              <Label htmlFor="adminName">Admin Name *</Label>
              <Input
                id="adminName"
                placeholder="Dr. Sarah Johnson"
                disabled={isPending}
                {...register("adminName")}
              />
              {errors.adminName && (
                <p className="text-sm text-red-600">
                  {errors.adminName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email *</Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder="admin@email.com"
                disabled={isPending}
                {...register("adminEmail")}
              />
              {errors.adminEmail && (
                <p className="text-sm text-red-600">
                  {errors.adminEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword">Create Password *</Label>
              <div className="relative">
                <Input
                  id="adminPassword"
                  type={showAdminPassword ? "text" : "password"}
                  placeholder="Min 8 chars, uppercase, lowercase, number"
                  disabled={isPending}
                  className="pr-10"
                  {...register("adminPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showAdminPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.adminPassword && (
                <p className="text-sm text-red-600">
                  {errors.adminPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmAdminPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmAdminPassword"
                  type={showConfirmAdminPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  disabled={isPending}
                  className="pr-10"
                  {...register("confirmAdminPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmAdminPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmAdminPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmAdminPassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmAdminPassword.message}
                </p>
              )}
              {password &&
                watch("confirmAdminPassword") &&
                !errors.confirmAdminPassword && (
                  <p className="text-sm text-green-600">✓ Passwords match</p>
                )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isPending}
              className="gap-1.5 rounded-xl border-muted-foreground/20 hover:bg-muted font-bold text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add School"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
