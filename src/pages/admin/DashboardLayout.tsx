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
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    return () => {
      // Restore scroll when leaving dashboard
      document.body.style.overflow = "";
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
        className="min-h-screen transition-all duration-300"
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        <div className="min-h-screen overflow-x-hidden p-4 pt-16 sm:p-6 sm:pt-6 lg:pt-6">
          <Topbar title={"Dashboard"} subtitle={"Welcome back, Admin!"} />
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
