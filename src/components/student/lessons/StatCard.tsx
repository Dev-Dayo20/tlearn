import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  gradient: string;
}

export function StatCard({ icon, label, value, gradient }: StatCardProps) {
  return (
    <div className="tl-card flex items-center gap-4 p-4 sm:p-5 flex-1 min-w-[150px]">
      <div
        className="tl-stat-icon h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 text-white"
        style={{ background: gradient }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className="tl-display text-xl sm:text-2xl font-extrabold leading-tight"
          style={{ color: "hsl(var(--primary))" }}
        >
          {value}
        </p>
        <p
          className="text-xs sm:text-sm truncate"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
