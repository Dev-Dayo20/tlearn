import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Calendar,
  Layers,
  Fingerprint,
  Phone,
  MapPin,
} from "lucide-react";
import { Student } from "@/types/types";

interface StudentDetailsSheetProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
}

export const StudentDetailsSheet: React.FC<StudentDetailsSheetProps> = ({
  open,
  onClose,
  student,
}) => {
  if (!student) return null;

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="sm:max-w-[450px] p-0 overflow-y-auto">
        <SheetHeader className="p-6 bg-prim/5 border-b sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-background shadow-lg">
              <AvatarImage
                src={student.profilePicture || ""}
                alt={student.name}
              />
              <AvatarFallback className="bg-prim/10 text-prim font-black text-xl">
                {student.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <SheetTitle className="text-2xl font-bold capitalize">
                {student.name}
              </SheetTitle>
              <Badge
                variant="prim"
                className="font-mono text-[10px] tracking-widest uppercase"
              >
                {student.studentId}
              </Badge>
            </div>
          </div>
          <SheetDescription className="pt-2 text-sm">
            Joined on{" "}
            {student.createdAt
              ? new Date(student.createdAt).toLocaleDateString()
              : "N/A"}
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-8">
          {/* Quick Stats/Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Fingerprint className="w-3 h-3" /> Student ID
              </p>
              <p className="font-mono font-bold text-sm tracking-tight text-prim">
                {student.studentId}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3 h-3" /> Class
              </p>
              <p className="font-bold text-sm">
                {student.class?.name || "N/A"}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Fingerprint className="w-3 h-3" /> Arm
              </p>
              <p className="font-bold text-sm">
                {student.arm?.name || "No Arm Assigned"}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50 space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3 h-3" /> Joined Date
              </p>
              <p className="font-bold text-sm">
                {student.createdAt
                  ? new Date(student.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Detailed sections */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-prim border-l-4 border-prim pl-3 leading-none uppercase tracking-widest">
                Contact Information
              </h4>
              <div className="space-y-4 px-1">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 transition-colors group-hover:bg-blue-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold italic opacity-80">
                      {student.email || "No email available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 transition-colors group-hover:bg-emerald-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">
                      Phone Number
                    </p>
                    <p className="text-sm font-semibold">N/A</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-prim border-l-4 border-prim pl-3 leading-none uppercase tracking-widest">
                Personal Details
              </h4>
              <div className="space-y-4 px-1">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 transition-colors group-hover:bg-amber-100">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">
                      Date of Birth
                    </p>
                    <p className="text-sm font-semibold">
                      {student.dateOfBirth
                        ? new Date(student.dateOfBirth).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 transition-colors group-hover:bg-rose-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">
                      Address
                    </p>
                    <p className="text-sm font-semibold">N/A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 font-bold text-prim hover:bg-prim hover:text-white transition-all"
            >
              Edit Profile
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="h-12 rounded-xl font-bold transition-all shadow-sm"
            >
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
