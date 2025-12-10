// DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/super-admin/DashboardSidebar";
import { DashboardHeader } from "@/components/super-admin/DashboardHeader";
import { useEffect } from "react";

export default function DashboardLayout() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    return () => {
      // Restore scroll when leaving dashboard
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar - Fixed, no scroll */}
        <DashboardSidebar />

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Header with sidebar trigger */}
          <div className="sticky top-0 z-10 bg-background border-b px-4 py-3 md:px-6">
            <DashboardHeader />
            {/* <SidebarTrigger /> */}
          </div>

          {/* Page Content - This scrolls */}
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
