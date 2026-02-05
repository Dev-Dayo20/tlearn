import React, { useState, useEffect } from "react";
import { useNetworkStore } from "@/store/useNetworkStore";
import { AlertTriangle, WifiOff, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const NetworkBanner = () => {
  const isOnline = useNetworkStore((state) => state.isOnline);
  const isUnstable = useNetworkStore((state) => state.isUnstable);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOnline || isUnstable) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOnline, isUnstable]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "px-4 py-2 flex items-center justify-center gap-3 animate-in slide-in-from-top duration-300 sticky top-0 z-[100] shadow-lg transition-colors",
        !isOnline ? "bg-rose-600 text-white" : "bg-amber-500 text-white",
      )}
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-white/20 rounded-lg animate-pulse">
          {!isOnline ? (
            <WifiOff className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
        </div>
        <p className="text-sm font-black tracking-tight uppercase">
          {!isOnline ? "Offline Mode" : "Unstable Connection"}
        </p>
      </div>
      <div className="h-4 w-px bg-white/20 mx-1" />
      <p className="text-xs font-bold text-white/90">
        {!isOnline
          ? "Changes you make may not be saved until you're back online."
          : "Your connection is weak. Things might take longer to load."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-[10px] font-black uppercase tracking-widest border border-white/20"
      >
        <RefreshCcw className="h-3 w-3" />
        {isOnline ? "Retry" : "Check Connection"}
      </button>
    </div>
  );
};
