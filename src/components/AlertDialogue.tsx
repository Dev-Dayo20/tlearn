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
import { AlertTriangle, Trash2, LogOut, CheckCircle } from "lucide-react";

type AlertType = "default" | "destructive" | "warning" | "success";

interface AlertProp {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  disabled?: boolean;
  type?: AlertType;
  icon?: React.ReactNode; // Optional custom icon
}

export function AlertDialogue({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  disabled = false,
  type = "default",
  icon,
}: AlertProp) {
  const getTypeConfig = () => {
    const config = {
      default: {
        buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90",
        icon: null,
      },
      destructive: {
        buttonClass:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        icon: <Trash2 className="w-4 h-4" />,
      },
      warning: {
        buttonClass:
          "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      success: {
        buttonClass:
          "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        icon: <CheckCircle className="w-4 h-4" />,
      },
    };
    return config[type];
  };

  const { buttonClass, icon: defaultIcon } = getTypeConfig();
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {icon || defaultIcon}
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription> {description} </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={disabled}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={disabled}
              onClick={onConfirm}
              className={`${buttonClass} flex items-center justify-center gap-2`}
            >
              {icon || defaultIcon}
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
