import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Palette,
  LogOut,
  HelpCircle,
  Bell,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/contexts/ThemeContext";
import { logoutUser } from "@/services/api/super-admin/super-admin";
import { useState } from "react";
import { LogoutConfirmModal } from "@/components/admin/modals/LogoutConfirmModal";
import { toast } from "sonner";

const StudentSettings = () => {
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logoutUser();
    setIsLogoutModalOpen(false);
  };

  const handleHelpRequest = () => {
    toast.info(
      "Need help? Contact our student support desk at students@tlearn.edu",
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Account Settings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your student profile and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>My Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {user?.name?.substring(0, 2).toUpperCase() || "ST"}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">
                  {user?.name || "Student Name"}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 text-primary border-none"
                >
                  Student Account
                </Badge>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Email Address
                </Label>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Mail className="h-4 w-4" />
                  {user?.email || "student@tlearn.edu"}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Student Status
                </Label>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Verified • Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appearance */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  App Theme
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "light", icon: "☀️", label: "Light" },
                    { val: "dark", icon: "🌙", label: "Dark" },
                    { val: "system", icon: "💻", label: "System" },
                  ].map((t) => (
                    <Button
                      key={t.val}
                      variant={theme === t.val ? "default" : "outline"}
                      onClick={() => setTheme(t.val as any)}
                      className="flex flex-col h-auto py-3 gap-1 rounded-xl"
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span className="text-[10px] uppercase font-bold">
                        {t.label}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Features */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Manage how you receive alerts for new lessons and upcoming
                exams.
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                Configure Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support & Logout */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            variant="outline"
            className="flex-1 rounded-xl h-11"
            onClick={handleHelpRequest}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Support
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded-xl h-11"
            onClick={handleLogoutClick}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default StudentSettings;
