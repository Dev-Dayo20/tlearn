import { UserPlus, BookPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onRegisterStudent: () => void;
  onCreateClass: () => void;
  onUploadMaterial: () => void;
}

export function QuickActions({
  onRegisterStudent,
  onCreateClass,
  onUploadMaterial,
}: QuickActionsProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-soft">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <Button
          variant="prim"
          className="w-full justify-start gap-3"
          onClick={onRegisterStudent}
        >
          <UserPlus className="h-5 w-5" />
          Register Student
        </Button>
        <Button
          variant="success"
          className="w-full justify-start gap-3"
          onClick={onCreateClass}
        >
          <BookPlus className="h-5 w-5" />
          Create Class
        </Button>
        <Button
          className="w-full justify-start gap-3 bg-sidebar-accent text-black hover:bg-yellow-300"
          onClick={onUploadMaterial}
        >
          <Upload className="h-5 w-5" />
          Upload Material
        </Button>
      </div>
    </div>
  );
}
