import React, { useState } from "react";
import {
  CheckCircle,
  Ban,
  Trash2,
  Mail,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Video,
  User,
  Building2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/utils/statusbadge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { UsersArray } from "@/types/types";
import { formatDate } from "@/utils/dateFormatter";
import { useToggleUser } from "@/hooks/useSuperAdminLogin";

interface UsersProps {
  user: UsersArray | null;
  open: boolean;
  onChange: (open: boolean) => void;
}

export function UsersDrawer({ user, open, onChange }: UsersProps) {
  if (!user) return null;

  const { mutate: toggleUser, isPending: isToggling } = useToggleUser();

  const handleToggleUser = (user: UsersArray) => {
    toggleUser({ userId: user.id, isActive: !user.isActive });
  };
  return (
    <>
      <Sheet open={open} onOpenChange={onChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            {/* USER INFO */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {user.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={user?.role === "ADMIN" ? "default" : "outline"}
                  >
                    {user?.role}{" "}
                  </Badge>
                  <StatusBadge isActive={user?.isActive} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user?.school && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">{user?.school?.name}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Joined {user?.createdAt}</span>
              </div>
            </div>

            <Separator />

            {/* STATUS TOGGLE */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status-toggle" className="text-base">
                  {" "}
                  Account Status
                </Label>
                <p className="text-sm text-muted-foreground">
                  {user?.isActive === true
                    ? "User can access the platform"
                    : "User access is disabled"}
                </p>
              </div>
              <Switch id="status-toggle" checked={user?.isActive} />
            </div>

            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">Actions</h4>
              <Button
                variant="ghost"
                className="w-full gap-2"
                onClick={() => handleToggleUser(user)}
                disabled={isToggling}
              >
                {user?.isActive ? (
                  <>
                    <Ban className="w-4 h-4" />
                    Deactivate User
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate School
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
