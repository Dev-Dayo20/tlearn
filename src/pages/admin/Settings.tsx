import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { useSchoolStore } from "@/store/SchoolStore";
import { useTheme } from "@/contexts/ThemeContext";
import { logoutUser } from "@/services/api/super-admin/super-admin";
import {
  User,
  School,
  Palette,
  LogOut,
  Mail,
  Building2,
  Globe,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { LogoutConfirmModal } from "@/components/admin/modals/LogoutConfirmModal";

const Settings = () => {
  const { user } = useAuthStore();
  const { school } = useSchoolStore();
  const { theme, setTheme } = useTheme();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logoutUser();
    setIsLogoutModalOpen(false);
  };

  const handlePasswordChangeRequest = () => {
    toast.info(
      "To change your password, please contact TLearn support at support@tlearn.com",
      { duration: 5000 },
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Information Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Name
                </Label>
                <p className="text-base font-medium text-foreground">
                  {user?.name || "Admin User"}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Email
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base font-medium text-foreground">
                    {user?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePasswordChangeRequest}
                className="w-full sm:w-auto"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Request Password Change
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* School Information Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              <CardTitle>School Information</CardTitle>
            </div>
            <CardDescription>Details about your institution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  School Name
                </Label>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base font-medium text-foreground">
                    {school?.school?.name || "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Subdomain
                </Label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base font-medium text-foreground">
                    {school?.school?.subdomain || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {school?.school?.logo && (
              <div className="space-y-2 pt-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  School Logo
                </Label>
                <div className="flex items-center gap-4">
                  <img
                    src={school.school.logo}
                    alt={`${school.school.name} logo`}
                    className="h-16 w-16 rounded-lg object-contain bg-muted p-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contact support to update your school logo
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appearance Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize how TLearn looks for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-muted-foreground">
                Theme
              </Label>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex-1 sm:flex-none"
                >
                  ☀️ Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex-1 sm:flex-none"
                >
                  🌙 Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="flex-1 sm:flex-none"
                >
                  💻 System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Card */}
        <Card className="shadow-soft border-destructive/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">
                Account Actions
              </CardTitle>
            </div>
            <CardDescription>Sign out of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={handleLogoutClick}
              className="w-full sm:w-auto"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Settings;
