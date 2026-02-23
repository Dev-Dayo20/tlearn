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
  Fingerprint,
  Phone,
  MapPin,
  Trash2,
} from "lucide-react";
import { Student } from "@/types/types";
import { UpdateStudentModal } from "./UpdateStudentModal";
import { useDeleteStudent } from "@/hooks/useSchAdmHooks";
import { ConfirmationModal } from "./ConfirmationModal";
import { toast } from "sonner";

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
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  if (!student) return null;

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="sm:max-w-[450px] p-0 overflow-y-auto">
        <SheetHeader className="p-6 bg-prim/5 border-b sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Avatar className="w-16 h-16 border-4 border-background shadow-lg transition-transform duration-300 group-hover:scale-105 active:scale-95">
                <AvatarImage
                  src={student.profilePicture || ""}
                  alt={student.name}
                />
                <AvatarFallback className="bg-prim/10 text-prim font-black text-xl">
                  {student.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white font-bold uppercase tracking-tighter">
                  View
                </span>
              </div>
            </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => setIsUpdateOpen(true)}
              className="h-12 rounded-xl border-2 font-bold text-prim hover:bg-prim hover:text-white transition-all"
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(true)}
              className="h-12 rounded-xl border-2 font-bold text-rose-500 border-rose-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all group"
            >
              <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Delete Student
            </Button>
          </div>

          <div className="pt-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-full h-12 rounded-xl font-bold transition-all shadow-sm"
            >
              Close
            </Button>
          </div>
        </div>
      </SheetContent>

      {/* Update Modal */}
      <UpdateStudentModal
        open={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        student={student}
      />

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          if (student) {
            deleteStudent(student.id, {
              onSuccess: () => {
                setIsDeleteOpen(false);
                onClose();
              },
            });
          }
        }}
        title="Delete Student Record"
        description={`Are you sure you want to delete ${student.name}'s record? This action is permanent and cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete Record"}
        variant="danger"
        isLoading={isDeleting}
      />

      {/* Profile Picture Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none shadow-none sm:rounded-3xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{student.name}'s Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="relative flex items-center justify-center bg-black/50 backdrop-blur-md p-4 min-h-[300px]">
            <img
              src={student.profilePicture || ""}
              alt={student.name}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};
