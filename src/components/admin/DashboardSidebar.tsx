import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/super-admin/NavLinks";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { logoutUser } from "@/services/api/super-admin/super-admin";
import { LogoutConfirmModal } from "./modals/LogoutConfirmModal";
import tlearnWhite from "@/assets/tlearnWhite.png";

const navItems = [
  {
    title: "Dashboard",
    path: "/school-admin/dashboard",
    icon: LayoutDashboard,
  },
  { title: "Classes", path: "/school-admin/classes", icon: BookOpen },
  {
    title: "Users",
    icon: Users,
    subItems: [
      {
        title: "Teachers",
        path: "/school-admin/teachers",
        icon: GraduationCap,
      },
      { title: "Students", path: "/school-admin/students", icon: Users },
    ],
  },
  { title: "Materials", path: "/school-admin/materials", icon: Video },
  { title: "Analytics", path: "/school-admin/analytics", icon: BarChart3 },
  { title: "Settings", path: "/school-admin/settings", icon: Settings },
];
interface SidebarProps {
  onWidthChange?: (width: number) => void;
}
export function Sidebar({ onWidthChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(true); // Default open for better visibility

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

  // Close mobile sidebar on route change
  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // Close mobile menu on resize to desktop
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
    <div className="flex h-full flex-col">
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
                "h-20 w-auto min-w-[140px] object-contain object-left transition-all duration-300",
              )}
            />
          </div>
        </div>
        {/* Desktop collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground transition-colors hover:bg-sidebar-muted"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground transition-colors hover:bg-sidebar-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          if (item.subItems) {
            const isUsersItem = item.title === "Users";
            const isOpen = isUsersItem ? usersOpen : false;
            const toggleOpen = () => isUsersItem && setUsersOpen(!isOpen);

            return (
              <div key={item.title} className="space-y-1">
                <button
                  onClick={() => {
                    if (collapsed && !mobileOpen) {
                      setCollapsed(false);
                      setUsersOpen(true);
                    } else {
                      toggleOpen();
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent",
                    collapsed && !mobileOpen && "justify-center px-2",
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {(!collapsed || mobileOpen) && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">
                        {item.title}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-sidebar-foreground/60" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
                      )}
                    </>
                  )}
                </button>

                {isOpen && (!collapsed || mobileOpen) && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-sidebar-border pl-2 animate-in slide-in-from-top-2 duration-200">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        )}
                        activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-semibold hover:bg-sidebar-primary/15"
                      >
                        <subItem.icon className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-medium">
                          {subItem.title}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path!}
              end={item.path === "/"}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent",
                collapsed && !mobileOpen && "justify-center px-2",
              )}
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!collapsed || mobileOpen) && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl p-2",
            collapsed && !mobileOpen && "justify-center",
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-foreground">
            AD
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                Admin User
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                admin@tlearn.edu
              </p>
            </div>
          )}
          {(!collapsed || mobileOpen) && (
            <button
              onClick={handleLogoutClick}
              className="rounded-lg p-2 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
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
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar text-sidebar-foreground shadow-lg lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen bg-sidebar transition-all duration-300 ease-in-out lg:block",
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
