import React from "react";
import { Radio, Users2, HelpCircle, CalendarCheck2 } from "lucide-react";
import type { ColabStats } from "@/types/colab.types";

interface ColabStatsStripProps {
  stats?: ColabStats;
}

export const ColabStatsStrip: React.FC<ColabStatsStripProps> = ({ stats }) => {
  const statItems = [
    {
      label: "Active Live Rooms",
      value: stats?.activeRoomsCount ?? 6,
      subtext: "Live audio, video & whiteboard",
      icon: Radio,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      indicator: <span className="colab-live-dot mr-1" />,
    },
    {
      label: "Peers Collaborating",
      value: stats?.livePeersCount ?? 42,
      subtext: "Studying right now",
      icon: Users2,
      iconColor: "text-sky-500",
      iconBg: "bg-sky-500/10",
      borderColor: "border-sky-500/20",
    },
    {
      label: "Doubts Resolved Today",
      value: stats?.resolvedTodayCount ?? 89,
      subtext: "Answered by peer mentors",
      icon: HelpCircle,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Upcoming Circles",
      value: stats?.scheduledCount ?? 14,
      subtext: "Exam & subject meetups",
      icon: CalendarCheck2,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statItems.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3.5 p-4 rounded-2xl bg-card border ${item.borderColor} shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div
            className={`h-11 w-11 shrink-0 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center`}
          >
            <item.icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              {item.indicator}
              <p className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                {item.value}
              </p>
            </div>
            <p className="text-xs font-bold text-foreground/80 truncate">
              {item.label}
            </p>
            <p className="text-[11px] font-medium text-muted-foreground truncate">
              {item.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
