import { useState, useEffect } from "react";
import { NavLink } from "@/components/super-admin/NavLinks";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LogOut,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/services/api/super-admin/super-admin";
import { LogoutConfirmModal } from "../admin/modals/LogoutConfirmModal";
import { useAuthStore } from "@/store/authStore";
import tlearnWhite from "@/assets/tlearnWhite.png";

const navItems = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  { title: "My Lessons", path: "/student/lessons", icon: BookOpen },
  { title: "Exams", path: "/student/exams", icon: FileText },
  { title: "Settings", path: "/student/settings", icon: Settings },
];

interface StudentSidebarProps {
  onWidthChange?: (width: number) => void;
}

export function StudentSidebar({ onWidthChange }: StudentSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user } = useAuthStore();

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logoutUser();
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const width = collapsed ? 80 : 256;
    onWidthChange?.(width);
  }, [collapsed, onWidthChange]);

  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center transition-all duration-300",
              collapsed && !mobileOpen ? "w-10 overflow-hidden" : "w-auto",
            )}
          >
            <img
              src={tlearnWhite}
              alt="TLearn Logo"
              className={cn(
                "h-10 w-auto min-w-[140px] object-contain object-left transition-all duration-300",
              )}
            />
          </div>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground/70 transition-all duration-300 hover:text-sidebar-foreground hover:bg-sidebar-accent group",
              collapsed && !mobileOpen && "justify-center px-2",
            )}
            activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground shadow-md shadow-primary/10"
          >
            <item.icon className={cn("h-5 w-5 shrink-0 transition-colors")} />
            {(!collapsed || mobileOpen) && (
              <span className="text-sm font-bold tracking-tight">
                {item.title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Student Badge and Logout */}
      <div className="border-t border-sidebar-border p-4">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl  p-3",
            collapsed && !mobileOpen && "justify-center",
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary/10 text-sm font-bold text-sidebar-primary">
            {user?.name?.substring(0, 2).toUpperCase() || "ST"}
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-sidebar-foreground">
                {user?.name || "Student"}
              </p>
              <p className="truncate text-[10px] font-bold text-sidebar-foreground/60 uppercase tracking-widest">
                Student
              </p>
            </div>
          )}
          {(!collapsed || mobileOpen) && (
            <button
              onClick={handleLogoutClick}
              className="rounded-lg p-2 text-sidebar-foreground/60 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-card text-foreground shadow-card border border-border lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Containers */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:block",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {sidebarContent}
      </aside>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
