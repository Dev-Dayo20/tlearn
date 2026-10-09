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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldAlert } from "lucide-react";
import type { ColabReportDto } from "@/types/colab.types";

interface ColabReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: ColabReportDto) => void;
  isSubmitting: boolean;
  target: { roomId: string; userId?: string; userName?: string } | null;
}

export const ColabReportModal: React.FC<ColabReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  target,
}) => {
  const [reason, setReason] = useState<
    "INAPPROPRIATE_LANGUAGE" | "HARASSMENT" | "OFF_TOPIC_SPAM" | "CHEATING" | "OTHER"
  >("INAPPROPRIATE_LANGUAGE");
  const [details, setDetails] = useState("");

  if (!target) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      roomId: target.roomId,
      reportedUserId: target.userId,
      reportedUserName: target.userName,
      reason,
      details: details.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <DialogTitle className="text-xl font-black text-foreground">
              Report Academic Misconduct
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            {target.userName
              ? `Reporting student: ${target.userName}`
              : "Report inappropriate activity in this collaborative room."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-foreground">Reason Category</Label>
            <Select
              value={reason}
              onValueChange={(val: any) => setReason(val)}
            >
              <SelectTrigger className="rounded-2xl h-11 bg-muted/40 border-border text-xs sm:text-sm">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="INAPPROPRIATE_LANGUAGE" className="text-xs">
                  Inappropriate / Abusive Language
                </SelectItem>
                <SelectItem value="HARASSMENT" className="text-xs">
                  Harassment or Bullying
                </SelectItem>
                <SelectItem value="OFF_TOPIC_SPAM" className="text-xs">
                  Off-Topic Spam or Disruptive Behavior
                </SelectItem>
                <SelectItem value="CHEATING" className="text-xs">
                  Academic Dishonesty / Cheating
                </SelectItem>
                <SelectItem value="OTHER" className="text-xs">
                  Other Concerns
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="details" className="text-xs font-bold text-foreground">
              Explanation (Optional)
            </Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide context for our educational moderation team..."
              rows={3}
              className="rounded-2xl bg-muted/40 border-border text-xs resize-none"
            />
          </div>

          <DialogFooter className="pt-2 flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-2xl h-11 text-xs font-bold w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl h-11 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs w-full sm:w-auto px-6"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
