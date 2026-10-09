import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Layers, Loader2 } from "lucide-react";
import { useBulkAssignCourses } from "@/hooks/useAdminDigitalCourses";
import type { DigitalCourse } from "@/types/digitalCourse.types";

interface BulkAssignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availableCourses: DigitalCourse[];
}

export const BulkAssignDialog: React.FC<BulkAssignDialogProps> = ({
  isOpen,
  onClose,
  availableCourses,
}) => {
  const [schoolId, setSchoolId] = useState("");
  const [pairs, setPairs] = useState<Array<{ courseId: string; classId: string }>>([
    { courseId: "", classId: "" },
  ]);

  const { mutate: bulkAssign, isPending } = useBulkAssignCourses();

  const handleAddPair = () => {
    setPairs([...pairs, { courseId: "", classId: "" }]);
  };

  const handleRemovePair = (index: number) => {
    if (pairs.length === 1) return;
    setPairs(pairs.filter((_, i) => i !== index));
  };

  const handlePairChange = (index: number, field: "courseId" | "classId", value: string) => {
    const next = [...pairs];
    next[index][field] = value;
    setPairs(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sId = parseInt(schoolId, 10);
    if (isNaN(sId)) return;

    const validAssignments = pairs
      .map((p) => ({
        courseId: parseInt(p.courseId, 10),
        classId: parseInt(p.classId, 10),
      }))
      .filter((p) => !isNaN(p.courseId) && !isNaN(p.classId));

    if (validAssignments.length === 0) return;

    bulkAssign(
      { schoolId: sId, assignments: validAssignments },
      {
        onSuccess: () => {
          setSchoolId("");
          setPairs([{ courseId: "", classId: "" }]);
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-6 rounded-2xl border border-border bg-card">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-black text-foreground">
                Bulk Assign Courses
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Assign multiple digital courses to classes in a school at once.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">
              School ID <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              placeholder="e.g. 1"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="h-9 text-xs"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">
                Course &amp; Class Pairs
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddPair}
                className="h-7 text-xs font-bold text-primary gap-1 px-2"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Pair
              </Button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {pairs.map((pair, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <select
                      value={pair.courseId}
                      onChange={(e) => handlePairChange(index, "courseId", e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      required
                    >
                      <option value="">Select Course...</option>
                      {availableCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          #{c.id} - {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-28">
                    <Input
                      type="number"
                      placeholder="Class ID"
                      value={pair.classId}
                      onChange={(e) => handlePairChange(index, "classId", e.target.value)}
                      className="h-9 text-xs"
                      required
                    />
                  </div>
                  {pairs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePair(index)}
                      className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="text-xs font-bold bg-primary text-primary-foreground"
            >
              {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
              Assign Courses
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};