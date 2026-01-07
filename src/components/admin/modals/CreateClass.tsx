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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface CreateClassModalProps {
  open: boolean;
  onClose: () => void;
}

const availableSubjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Art",
  "Music",
];

const teachers = [
  "Dr. Sarah Mitchell",
  "Mr. Robert Clark",
  "Ms. Jennifer Lee",
  "Dr. Michael Brown",
  "Mrs. Emily White",
  "Mr. David Garcia",
];

export function CreateClass({ open, onClose }: CreateClassModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Class
          </DialogTitle>
          <DialogDescription>
            Set up a new class with teacher and subject assignments.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>

      <form action="">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="className">Class Name</Label>
            <Input
              id="className"
              placeholder="e.g., Grade 10-A"
              //   value={formData.name}
              //   onChange={(e) =>
              //     setFormData({ ...formData, name: e.target.value })
              //   }
              required
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
}
