import { Outlet } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { StudentSidebar } from "./StudentSidebar";
import { Topbar } from "../admin/DashboardHeader";
import { NetworkBanner } from "../NetworkBanner";
import { useAuthStore } from "@/store/authStore";

export const StudentLayout = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const { user } = useAuthStore();

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleWidthChange = useCallback((width: number) => {
    setSidebarWidth(width);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NetworkBanner />
      <StudentSidebar onWidthChange={handleWidthChange} />
      <main
        className="transition-all duration-300"
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-4 py-4 sm:px-6">
          <Topbar
            title="Student Portal"
            subtitle={`Great to see you, ${user?.name?.split(" ")[0] || "Student"}!`}
          />
        </div>

        {/* Content Area */}
        <div className="px-4 pb-12 sm:px-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
