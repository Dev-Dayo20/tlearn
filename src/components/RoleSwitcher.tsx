import { Shield, GraduationCap, Users } from "lucide-react";
import { UserRoles } from "@/types/types";
import { cn } from "@/lib/utils";

interface RoleSwitcherProps {
  currentRole: UserRoles;
  onRoleChange: (role: UserRoles) => void;
}

const roles: {
  id: UserRoles;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "ADMIN", label: "Admin", icon: Shield },
  { id: "TEACHER", label: "Teacher", icon: Users },
  { id: "STUDENT", label: "Student", icon: GraduationCap },
];

const RoleSwitcher = ({ currentRole, onRoleChange }: RoleSwitcherProps) => {
  return (
    <div className="relative flex w-full rounded-xl bg-muted p-1">
      {/* Animated background indicator */}
      <div
        className="absolute top-1 h-[calc(100%-8px)] rounded-lg bg-card shadow-md transition-all duration-300 ease-out"
        style={{
          width: `calc(${100 / roles.length}% - 4px)`,
          left: `calc(${
            roles.findIndex((r) => r.id === currentRole) * (100 / roles.length)
          }% + 2px)`,
        }}
      />
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = currentRole === role.id;

        return (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={cn(
              "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("h-4 w-4", isActive && "text-accent")} />
            <span className="hidden sm:inline">{role.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSwitcher;
