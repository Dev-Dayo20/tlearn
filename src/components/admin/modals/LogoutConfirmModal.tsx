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
import { LogOut } from "lucide-react";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[420px] rounded-2xl">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500 mb-2">
            <LogOut className="h-7 w-7" />
          </div>
          <AlertDialogTitle className="text-xl font-bold">
            Logout Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium">
            Are you sure you want to log out? <br />
            You will need to sign in again to access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-3 mt-6">
          <AlertDialogCancel
            onClick={onClose}
            className="flex-1 h-11 rounded-xl font-bold border-none bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-all"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 h-11 rounded-xl font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-200 transition-all border-none"
          >
            Yes, Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
