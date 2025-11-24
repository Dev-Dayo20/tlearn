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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateFormatter";
import { StatusBadge } from "@/utils/statusbadge";
import { SchoolArray } from "@/types/types";

interface SchoolDetailDrawerProps {
  school: SchoolArray | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SchoolDetailDrawer({
  school,
  open,
  onOpenChange,
}: SchoolDetailDrawerProps) {
  if (!school) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>School Details</SheetTitle>
          <SheetDescription>
            View and manage school information
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* School Logo and Name */}
          <div className="flex items-center gap-4">
            {school.logo ? (
              <img
                src={school.logo}
                alt={school.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {school.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">
                {school.name}
              </h3>
              <div className="mt-1">
                <StatusBadge isActive={school.isActive} />
              </div>
            </div>
          </div>

          <Separator />
          {/* School Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              School Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{school.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm text-foreground">
                    {school.address || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xs font-medium text-muted-foreground mt-0.5">
                  🌐
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Subdomain</p>
                  <p className="text-sm text-foreground font-mono">
                    {school.subdomain}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Registration Date
                  </p>
                  <p className="text-sm text-foreground">
                    {formatDate(school.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              Statistics
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1 text-center p-3 bg-secondary/50 rounded-lg">
                <Users className="w-5 h-5 mx-auto text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">
                  {school._count?.users || 0}
                </p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
              <div className="space-y-1 text-center p-3 bg-secondary/50 rounded-lg">
                <BookOpen className="w-5 h-5 mx-auto text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">
                  {school._count?.classes || 0}
                </p>
                <p className="text-xs text-muted-foreground">Classes</p>
              </div>
              <div className="space-y-1 text-center p-3 bg-secondary/50 rounded-lg">
                <Video className="w-5 h-5 mx-auto text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">
                  {school._count?.videos || 0}
                </p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* SCHOOLADMIN DETAILS */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              School Administrator
            </h4>
            {school.users && school.users[0] ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm text-foreground">
                      {school.users[0].name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm text-foreground">
                      {school.users[0].email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="text-sm text-foreground">
                      {formatDate(school.users[0].createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No administrator assigned
              </p>
            )}
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Actions</h4>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => console.log("Toggle status")}
              >
                {school.isActive ? (
                  <>
                    <Ban className="w-4 h-4 mr-2" />
                    Deactivate School
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate School
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-white border-red-600 hover:bg-red-600"
                onClick={() => console.log("Delete school")}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete School
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
