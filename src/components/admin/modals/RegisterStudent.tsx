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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, User } from "lucide-react";

interface RegisterStudentModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterStudents({ open, onClose }: RegisterStudentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Register New Student
          </DialogTitle>
          <DialogDescription>
            Add a new student to the system. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>

        <form action="">
          {/* Profile Photo Upload */}
          <div className="flex justify-center">
            <div className="group relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-secondary/80">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
