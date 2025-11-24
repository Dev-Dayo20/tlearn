import { Button } from "@/components/ui/button";
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
import { useAddSchool } from "@/hooks/useSuperAdminLogin";

interface AddSchoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSchoolDialog({ open, onOpenChange }: AddSchoolDialogProps) {
  const { mutate: addSchool, isPending } = useAddSchool();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SchoolData>({
    resolver: zodResolver(schoolDataSchema),
  });

  const password = watch("adminPassword");

  const onSubmit = (data: SchoolData) => {
    const { confirmAdminPassword, ...submitData } = data;
    addSchool(submitData as AddSchoolPayload, {
      onSuccess: () => {
        reset(); // Clear form
        onOpenChange(false); // Close dialog
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New School</DialogTitle>
          <DialogDescription>
            Register a new school on the platform. Fill in all required
            information.
          </DialogDescription>
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
              <Input
                id="logo"
                placeholder="https://example.com/logo.png"
                disabled={isPending}
                {...register("logo")}
              />
              {errors.logo && (
                <p className="text-sm text-red-600">{errors.logo.message}</p>
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
              <Input
                id="adminPassword"
                type="password"
                placeholder="Min 8 chars, uppercase, lowercase, number"
                disabled={isPending}
                {...register("adminPassword")}
              />
              {errors.adminPassword && (
                <p className="text-sm text-red-600">
                  {errors.adminPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmAdminPassword">Confirm Password *</Label>
              <Input
                id="confirmAdminPassword"
                type="password"
                placeholder="Re-enter password"
                disabled={isPending}
                {...register("confirmAdminPassword")}
              />
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add School"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
