import { useEffect, useRef } from "react";
import { useNetworkStore } from "@/store/useNetworkStore";
import { toast } from "sonner";

export const useNetworkListener = () => {
  const { setIsOnline, setIsUnstable, isOnline } = useNetworkStore();
  const prevStatus = useRef<boolean>(isOnline);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Dismiss persistent warning/error toasts
      toast.dismiss("offline-toast");
      toast.dismiss("unstable-toast");

      if (prevStatus.current === false) {
        toast.success("Back Online", {
          description: "Your network connection has been restored.",
          duration: 4000,
        });
      }
      prevStatus.current = true;
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Offline Mode", {
        description: "You are currently disconnected from the network.",
        duration: Infinity,
        id: "offline-toast",
      });
      prevStatus.current = false;
    };

    const checkConnection = () => {
      if (typeof window !== "undefined" && "connection" in navigator) {
        const connection = (navigator as any).connection;
        const updateConnectionStatus = () => {
          // Detect poor connection: 2g or slow downlink (< 1 Mbps)
          const isSlow =
            connection.effectiveType === "2g" ||
            connection.effectiveType === "slow-2g" ||
            connection.downlink < 1;

          setIsUnstable(isSlow);

          if (isSlow) {
            toast.warning("Unstable Connection", {
              description:
                "Your internet connection is currently slow or unstable.",
              id: "unstable-toast",
            });
          }
        };

        connection.addEventListener("change", updateConnectionStatus);
        updateConnectionStatus();
        return () =>
          connection.removeEventListener("change", updateConnectionStatus);
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const cleanupConnection = checkConnection();

    // Initial check
    if (!window.navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (cleanupConnection) cleanupConnection();
    };
  }, [setIsOnline, setIsUnstable]);

  return isOnline;
};
