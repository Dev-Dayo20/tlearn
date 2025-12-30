import { useState } from "react";
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
  GraduationCap,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Students", path: "/school-admin/students", icon: Users },
  { title: "Classes", path: "/school-admin/classes", icon: BookOpen },
  { title: "Materials", path: "/school-admin/materials", icon: Video },
  { title: "Analytics", path: "/school-admin/analytics", icon: BarChart3 },
  { title: "Settings", path: "/school-admin/settings", icon: Settings },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
              <GraduationCap className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-sidebar-foreground">
                TLearn
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground transition-colors hover:bg-sidebar-muted"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl p-2",
              collapsed && "justify-center"
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-foreground">
              AD
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  Admin User
                </p>
                <p className="truncate text-xs text-sidebar-foreground/60">
                  admin@tlearn.edu
                </p>
              </div>
            )}
            {!collapsed && (
              <button className="rounded-lg p-2 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
