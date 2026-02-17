import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}) => {
  const variantStyles = {
    danger: "bg-rose-500 hover:bg-rose-600 shadow-rose-200",
    warning: "bg-amber-500 hover:bg-amber-600 shadow-amber-200",
    info: "bg-primary hover:bg-primary/90 shadow-primary/20",
  };

  const iconStyles = {
    danger: "bg-rose-50 text-rose-500",
    warning: "bg-amber-50 text-amber-500",
    info: "bg-primary/10 text-primary",
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[420px] rounded-3xl border-none shadow-2xl p-6">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl mb-2 transition-transform duration-500 animate-in zoom-in-50",
              iconStyles[variant],
            )}
          >
            <AlertCircle className="h-8 w-8" />
          </div>
          <AlertDialogTitle className="text-2xl font-black tracking-tight">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium text-base leading-relaxed px-2">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-3 mt-8">
          <AlertDialogCancel
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-12 rounded-2xl font-bold bg-muted/50 border-none hover:bg-muted text-muted-foreground transition-all active:scale-95"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className={cn(
              "flex-1 h-12 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 border-none",
              variantStyles[variant],
            )}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
