import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, HeartHandshake, BookOpen, AlertTriangle } from "lucide-react";

interface ColabGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColabGuidelinesModal: React.FC<ColabGuidelinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <DialogTitle className="text-xl font-black text-foreground">
              tlearn coLab Safety & Community Standards
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Our commitment to a safe, productive, and respectful collaborative academic environment for all students.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2 text-xs sm:text-sm text-foreground/90">
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-start gap-3">
            <HeartHandshake className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-foreground">Respect & Encouragement</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Treat all peers with kindness. Everyone learns at different paces. Never ridicule a classmate for asking questions or making mistakes on the whiteboard.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-foreground">Academic Focus & Constructive Collaboration</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Keep room discussions, shared files, and drawings strictly relevant to the chosen subject or course curriculum. Off-topic spam or commercial advertisements are forbidden.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-foreground">Zero Tolerance on Harassment</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Any form of hate speech, inappropriate language, cyberbullying, or academic cheating will lead to immediate room removal and school admin escalation.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <p>
              💡 <strong>Student Moderator Tip:</strong> You can report any participant or message at any time by clicking the <span className="text-rose-500 font-bold">Report</span> button inside any live study room.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button
            onClick={onClose}
            className="rounded-2xl h-11 bg-primary text-primary-foreground font-black text-xs w-full sm:w-auto px-6"
          >
            I Understand & Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
