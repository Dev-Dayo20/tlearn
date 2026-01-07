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
import { Upload, FileVideo, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadMaterialModalProps {
  open: boolean;
  onClose: () => void;
}

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
];

const classLevels = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export function UploadMaterial({ open, onClose }: UploadMaterialModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Upload Learning Material
          </DialogTitle>
          <DialogDescription>
            Upload videos, documents, or quizzes for students.
          </DialogDescription>
        </DialogHeader>

        <form action=""></form>
      </DialogContent>
    </Dialog>
  );
}
