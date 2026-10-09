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
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowRight } from "lucide-react";

interface ColabJoinByCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

export const ColabJoinByCodeModal: React.FC<ColabJoinByCodeModalProps> = ({
  isOpen,
  onClose,
  onJoin,
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    onJoin(code.trim());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <KeyRound className="h-5 w-5" />
            </span>
            <DialogTitle className="text-xl font-black text-foreground">
              Join Study Room by Code
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Enter the 6-character room code shared by your classmate or peer tutor (e.g. PHY-902).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <Label htmlFor="code" className="text-xs font-bold text-foreground">
              Room Code or Link
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. PHY-902"
              className="rounded-2xl h-12 text-center text-lg font-mono font-black tracking-widest bg-muted/40 border-border uppercase focus-visible:ring-primary"
              maxLength={20}
              autoFocus
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
              disabled={!code.trim()}
              className="rounded-2xl h-11 bg-primary text-primary-foreground font-black text-xs w-full sm:w-auto px-6 gap-1"
            >
              Enter Room
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
