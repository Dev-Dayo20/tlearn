import React from "react";
import { Link } from "react-router-dom";
import {
  Users2,
  Radio,
  Sparkles,
  ArrowRight,
  PenTool,
  MessageSquare,
  HelpCircle,
  Play,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_COLAB_ROOMS, MOCK_COLAB_STATS } from "@/services/api/student/colabApi";

export const ColabDashboardSection: React.FC = () => {
  const liveRooms = MOCK_COLAB_ROOMS.filter((r) => r.status === "LIVE").slice(0, 2);

  return (
    <Card className="relative overflow-hidden border border-sky-500/20 shadow-soft bg-gradient-to-br from-card via-card to-sky-500/[0.04]">
      {/* Decorative ambient glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="pb-3 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/25 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Live Study Space
            </Badge>

            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
              <Users2 className="h-3.5 w-3.5 text-sky-500" />
              {MOCK_COLAB_STATS.livePeersCount} classmates online
            </span>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            tlearn coLab
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm font-medium text-muted-foreground">
            Hop into live audio & video study circles, share whiteboard calculations, and clear doubts in real-time.
          </CardDescription>
        </div>

        <Link
          to="/student/colab"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-sky-500 hover:bg-sky-600 text-white shadow-sm shadow-sky-500/20 transition-all shrink-0 w-fit"
        >
          Enter coLab Space
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>

      <CardContent className="relative z-10 pt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveRooms.map((room) => (
            <Link
              to="/student/colab"
              key={room.id}
              className="group p-4 rounded-2xl bg-card border border-border/70 hover:border-sky-500/40 hover:shadow-md transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-extrabold bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25"
                  >
                    {room.subject}
                  </Badge>

                  <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                    <Users2 className="h-3 w-3 text-sky-500" />
                    {room.participantCount} active
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {room.title}
                </h4>

                <p className="text-xs text-muted-foreground line-clamp-1">
                  {room.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-border/50 text-muted-foreground">
                <span className="font-semibold text-foreground/80">
                  Lead: {room.host.name}
                </span>
                <span className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold group-hover:translate-x-1 transition-transform">
                  Join Room <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
