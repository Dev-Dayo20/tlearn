import { Outlet } from "react-router-dom";
import { useEffect, ReactNode, useState, useCallback } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/admin/DashboardSidebar";
import { Topbar } from "@/components/admin/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const DashboardLayout = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);

  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Only hide horizontal scroll
    document.body.style.overflowY = "auto"; // Allow vertical scroll
    document.body.style.height = "100%";

    return () => {
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
      document.body.style.height = "";
    };
  }, []);

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
      <Sidebar onWidthChange={handleWidthChange} />
      <main
        className=" transition-all duration-300 "
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-30 bg-background px-4 py-4 sm:px-6">
          <Topbar title={"Dashboard"} subtitle={"Welcome back, Admin!"} />
        </div>

        {/* Scrollable Content */}
        <div className="px-4 pb-6 sm:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
