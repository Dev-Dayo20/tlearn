import React from "react";
import {
  Users2,
  Radio,
  PlusCircle,
  KeyRound,
  Calendar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ColabHeroProps {
  studentClassLevel: string;
  activeRoomsCount: number;
  livePeersCount: number;
  onOpenCreateRoom: () => void;
  onOpenJoinByCode: () => void;
  onOpenSchedule: () => void;
  onOpenGuidelines: () => void;
}

export const ColabHero: React.FC<ColabHeroProps> = ({
  studentClassLevel,
  activeRoomsCount,
  livePeersCount,
  onOpenCreateRoom,
  onOpenJoinByCode,
  onOpenSchedule,
  onOpenGuidelines,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-indigo-500/20">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Floating dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Title, description, live indicators */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge
              variant="outline"
              className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs font-black tracking-wide flex items-center gap-2 shadow-sm"
            >
              <span className="colab-live-dot" />
              LIVE COLLABORATION
            </Badge>

            <Badge
              variant="outline"
              className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border-sky-400/30 text-xs font-bold"
            >
              {studentClassLevel}
            </Badge>

            <button
              onClick={onOpenGuidelines}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 text-white/90 text-xs font-bold transition-colors border border-white/10"
              title="View student community & moderation rules"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              Safety Standards
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              tlearn{" "}
              <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                coLab
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Study together, solve complex calculations, clear doubts in
              real-time, and collaborate with peers and tutors on interactive
              digital whiteboards.
            </p>
          </div>

          {/* Real-time pulse stats */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm text-slate-300 font-bold">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
              <Radio className="h-4 w-4 text-rose-400 animate-pulse" />
              <span>
                <strong className="text-white font-extrabold">
                  {activeRoomsCount}
                </strong>{" "}
                Study Rooms Live
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
              <Users2 className="h-4 w-4 text-sky-400" />
              <span>
                <strong className="text-white font-extrabold">
                  {livePeersCount}
                </strong>{" "}
                Students Online Now
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: High impact actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <Button
            size="lg"
            onClick={onOpenCreateRoom}
            className="rounded-2xl h-12 px-6 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Host a Live Room
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenJoinByCode}
              className="rounded-xl h-10 px-3 bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <KeyRound className="h-3.5 w-3.5 text-amber-400" />
              Join with Code
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSchedule}
              className="rounded-xl h-10 px-3 bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 text-sky-400" />
              Scheduled Meetups
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
