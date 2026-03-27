import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Calendar,
  Layers,
  GraduationCap,
  BookOpen,
  Phone,
  Edit2,
  UserCheck,
  Loader2,
} from "lucide-react";
import { Teacher } from "@/types/types";
import { useGetTeacherById } from "@/hooks/useSchAdmHooks";

interface TeacherDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  onEdit: (teacher: Teacher) => void;
  onAssign: (teacher: Teacher) => void;
}

export const TeacherDetailsSheet: React.FC<TeacherDetailsSheetProps> = ({
  open,
  onClose,
  teacher,
  onEdit,
  onAssign,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const { data: teacherDetail, isLoading } = useGetTeacherById(teacher?.id);

  if (!teacher) return null;

  // Use the detailed data if available, otherwise fallback to the basic teacher prop
  const displayTeacher = teacherDetail?.data || teacher;
  const teachingSubjects = teacherDetail?.data?.teachingSubjects || [];

  const joinedDate = providerDate(displayTeacher.createdAt);

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="w-full sm:max-w-[480px] p-0 overflow-y-auto border-l-0 sm:border-l text-foreground">
        <SheetHeader className="p-6 bg-prim/5 border-b sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Avatar className="w-20 h-20 border-4 border-background shadow-lg transition-transform duration-300 group-hover:scale-105 active:scale-95">
                <AvatarImage
                  src={displayTeacher.profilePicture || ""}
                  alt={displayTeacher.name}
                />
                <AvatarFallback className="bg-prim/10 text-prim font-black text-2xl">
                  {displayTeacher.name.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
                  <Loader2 className="h-6 w-6 animate-spin text-prim" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white font-bold uppercase tracking-tighter">
                  View
                </span>
              </div>
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <SheetTitle className="text-2xl font-black capitalize truncate">
                {displayTeacher.name}
              </SheetTitle>
              <Badge
                variant="outline"
                className="font-bold text-[10px] tracking-widest uppercase bg-background"
              >
                {displayTeacher.role}
              </Badge>
            </div>
          </div>
          <SheetDescription className="pt-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            Joined on {joinedDate}
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-8">
          {/* Quick Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-prim uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="h-1 w-4 bg-prim rounded-full" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-muted/50 group transition-all hover:bg-muted/50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-bold truncate">
                    {displayTeacher.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-muted/50 group transition-all hover:bg-muted/50">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">
                    Phone Number
                  </p>
                  <p className="text-sm font-bold">
                    {displayTeacher.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assignments */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-prim uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="h-1 w-4 bg-prim rounded-full" />
              Assigned Subjects & Classes
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {isLoading ? (
                <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p className="text-xs font-bold">Loading assignments...</p>
                </div>
              ) : teachingSubjects.length > 0 ? (
                teachingSubjects.map((sub: any) => (
                  <div
                    key={sub.id}
                    className="flex flex-col gap-2 p-4 rounded-2xl bg-accent/10 border border-accent/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-prim/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-prim" />
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {sub.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <Layers className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-bold text-prim">
                        {sub.class?.name || "No Class Assigned"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center text-muted-foreground">
                  <BookOpen className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-xs font-bold">No Subjects Assigned</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 grid grid-cols-2 gap-3 sticky bottom-4">
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
                onEdit(displayTeacher);
              }}
              className="h-14 rounded-2xl border-2 font-black text-prim hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all shadow-lg active:scale-95"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              onClick={() => {
                onClose();
                onAssign(displayTeacher);
              }}
              className="h-14 rounded-2xl font-black bg-prim text-white hover:bg-prim/90 transition-all shadow-lg shadow-prim/20 active:scale-95 transition-transform hover:scale-[1.02]"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Assign Class
            </Button>
          </div>

          <div className="pb-6">
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full h-12 rounded-xl font-bold text-muted-foreground hover:bg-muted/50"
            >
              Back to List
            </Button>
          </div>
        </div>
      </SheetContent>

      {/* Profile Picture Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none shadow-none sm:rounded-3xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{teacher.name}'s Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="relative flex items-center justify-center bg-black/50 backdrop-blur-md p-4 min-h-[300px]">
            <img
              src={displayTeacher.profilePicture || ""}
              alt={displayTeacher.name}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};

function providerDate(date: string) {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
}
