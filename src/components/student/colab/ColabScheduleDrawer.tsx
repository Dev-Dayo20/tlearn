import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users2, Bell, CheckCircle2 } from "lucide-react";
import type { ColabScheduledSession } from "@/types/colab.types";

interface ColabScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ColabScheduledSession[];
  onToggleRsvp: (sessionId: string) => void;
}

export const ColabScheduleDrawer: React.FC<ColabScheduleDrawerProps> = ({
  isOpen,
  onClose,
  sessions,
  onToggleRsvp,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
              <Calendar className="h-5 w-5" />
            </span>
            <DialogTitle className="text-xl font-black text-foreground">
              Scheduled Study Circles & Meetups
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            RSVP to group exam prep, project sprints, and doubt-clearing sessions organized by peers and tutors.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-black uppercase bg-primary/10 text-primary border-primary/25"
                  >
                    {sess.subject}
                  </Badge>

                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-foreground">
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                    {sess.startTime} ({sess.durationMinutes} mins)
                  </span>
                </div>

                <h4 className="text-base font-black text-foreground leading-snug">
                  {sess.title}
                </h4>

                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground/80">Topic:</strong> {sess.topic}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div className="flex items-center gap-2">
                  {sess.hostAvatar ? (
                    <img
                      src={sess.hostAvatar}
                      alt={sess.hostName}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                      {sess.hostName.substring(0, 2)}
                    </div>
                  )}
                  <div className="text-xs font-semibold text-foreground/80">
                    {sess.hostName}
                    <span className="text-[10px] text-muted-foreground block">
                      {sess.registeredCount} students attending
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant={sess.isRegistered ? "outline" : "default"}
                  onClick={() => onToggleRsvp(sess.id)}
                  className={`rounded-xl text-xs font-black h-8 px-3.5 gap-1.5 transition-all ${
                    sess.isRegistered
                      ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {sess.isRegistered ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Attending
                    </>
                  ) : (
                    <>
                      <Bell className="h-3.5 w-3.5" />
                      Remind Me
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
