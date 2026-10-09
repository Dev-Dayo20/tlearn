import React from "react";
import {
  Users2,
  Video,
  Radio,
  PenTool,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ColabRoom } from "@/types/colab.types";

interface ColabRoomCardProps {
  room: ColabRoom;
  onJoin: (room: ColabRoom) => void;
  onReport?: (roomId: string) => void;
}

const SUBJECT_COLORS: Record<string, string> = {
  Physics: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  Mathematics: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  Chemistry: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Biology: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30",
  "Computer Science": "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30",
  "English Literature": "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Economics: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export const ColabRoomCard: React.FC<ColabRoomCardProps> = ({ room, onJoin }) => {
  const isLive = room.status === "LIVE";
  const isStartingSoon = room.status === "STARTING_SOON";

  return (
    <div
      onClick={() => onJoin(room)}
      className="group relative flex flex-col justify-between rounded-3xl bg-card border border-border/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Banner & Header */}
      <div className="p-5 pb-4 space-y-3">
        {/* Badges row */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className={`text-[11px] font-black tracking-tight ${
              SUBJECT_COLORS[room.subject] || "bg-muted text-foreground"
            }`}
          >
            {room.subject}
          </Badge>

          <div className="flex items-center gap-1.5">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/25 text-[10px] font-black uppercase tracking-wider">
                <span className="colab-live-dot" />
                Live
              </span>
            ) : isStartingSoon ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 text-[10px] font-bold">
                <Clock className="h-3 w-3" />
                Starting Soon
              </span>
            ) : (
              <span className="text-[10px] font-bold text-muted-foreground">
                Scheduled
              </span>
            )}

            <span className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] font-mono font-bold text-muted-foreground">
              #{room.code}
            </span>
          </div>
        </div>

        {/* Room Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-black text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
            {room.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Current discussion focus ticker if present */}
        {room.currentTopic && (
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-muted/40 border border-border/50 text-[11px] font-semibold text-foreground/90">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
            <span className="truncate">
              <strong className="text-primary font-bold">Topic:</strong> {room.currentTopic}
            </span>
          </div>
        )}

        {/* Feature badges (Whiteboard, Q&A, etc.) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {room.whiteboardActive && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold">
              <PenTool className="h-3 w-3" />
              Whiteboard
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold">
            <HelpCircle className="h-3 w-3" />
            Doubt Queue
          </span>
          {room.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-medium text-muted-foreground px-1.5 py-0.5 bg-muted/60 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Host & Participants Footer */}
      <div className="p-4 pt-3 border-t border-border/60 bg-muted/20 flex flex-col gap-3">
        {/* Host row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              {room.host.avatar ? (
                <img
                  src={room.host.avatar}
                  alt={room.host.name}
                  className="h-8 w-8 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center">
                  {room.host.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              {isLive && (
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-card" />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-extrabold text-foreground truncate">
                {room.host.name}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {room.host.role === "PEER_TUTOR"
                  ? "Peer Tutor"
                  : room.host.role === "STUDENT_LEAD"
                  ? "Study Lead"
                  : "Student Host"}
              </p>
            </div>
          </div>

          {/* Participant count */}
          <div className="flex items-center gap-1 text-xs font-black text-muted-foreground bg-card px-2.5 py-1 rounded-xl border border-border/60 shadow-2xs">
            <Users2 className="h-3.5 w-3.5 text-primary" />
            <span>
              {room.participantCount} / {room.maxParticipants}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="sm"
          className="w-full rounded-xl text-xs font-black h-9 bg-primary text-primary-foreground group-hover:bg-primary/95 shadow-sm flex items-center justify-center gap-1.5 transition-all"
        >
          {isLive ? "Join Live Study Room" : "Enter Room"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
