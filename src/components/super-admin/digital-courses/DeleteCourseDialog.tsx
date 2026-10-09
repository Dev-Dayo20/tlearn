import React from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { DigitalCourse } from "@/types/digitalCourse.types";
import { AlertTriangle } from "lucide-react";

interface DeleteCourseDialogProps {
  isOpen: boolean;
  course: DigitalCourse | null;
  onClose: () => void;
  onConfirm: (courseId: number) => void;
  isDeleting?: boolean;
}

export const DeleteCourseDialog: React.FC<DeleteCourseDialogProps> = ({
  isOpen, course, onClose, onConfirm, isDeleting = false,
}) => {
  if (!course) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="rounded-2xl border-border max-w-md">
        <AlertDialogHeader className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <AlertDialogTitle className="text-lg font-black text-foreground">
            Delete Digital Course?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete{" "}
            <strong className="text-foreground">"{course.title}"</strong>?{" "}
            This is a <strong>soft delete</strong> — the course will be archived and
            no longer visible to students or school admins. This can be reversed by
            a Super Admin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-2">
          <AlertDialogCancel
            disabled={isDeleting}
            onClick={onClose}
            className="rounded-xl font-bold"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={() => onConfirm(course.id)}
            className="rounded-xl font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete Course"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
