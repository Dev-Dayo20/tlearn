import { useState } from "react";
import { Eye, CheckCircle, Ban, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/utils/statusbadge";
import { formatDate } from "@/utils/dateFormatter";
import { SchoolArray } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useToggleSchoolStatus,
  useDeleteSchool,
} from "@/hooks/useSuperAdminLogin";

interface SchoolsTableProps {
  schools: SchoolArray[];
  isLoading: boolean;
  onViewSchool: (school: SchoolArray) => void;
}

export function SchoolsTable({
  schools,
  isLoading,
  onViewSchool,
}: SchoolsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<SchoolArray | null>(
    null
  );

  const { mutate: toggleStatus, isPending: isToggling } =
    useToggleSchoolStatus();
  const { mutate: deleteSchool, isPending: isDeleting } = useDeleteSchool();

  const handleToggleStatus = (school: SchoolArray) => {
    toggleStatus({ schoolId: school.id, isActive: !school.isActive });
  };

  const handleDeleteClick = (school: SchoolArray) => {
    setSchoolToDelete(school);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (schoolToDelete) {
      deleteSchool(schoolToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSchoolToDelete(null);
        },
      });
    }
  };

  // const handleSchoolDetails = (schoolId: number) => {
  //   console.log("View details for school:", schoolId);
  // };

  // Mobile Card View
  const MobileSchoolCard = ({ school }: { school: SchoolArray }) => (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-base">{school.name}</h3>
            <p className="text-sm text-muted-foreground">{school.email}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewSchool(school)}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleToggleStatus(school)}
                disabled={isToggling}
              >
                {school.isActive ? (
                  <>
                    <Ban className="w-4 h-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteClick(school)}
                className="text-red-600"
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subdomain:</span>
          <span className="font-medium">{school.subdomain}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Address:</span>
          <span className="font-medium text-right">
            {school.address || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Status:</span>
          <StatusBadge isActive={school.isActive} />
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Registered:</span>
          <span className="font-medium">{formatDate(school.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          Loading schools...
        </CardContent>
      </Card>
    );
  }

  if (schools.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          No schools found
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile View: Cards */}
      <div className="grid gap-4 md:hidden">
        {schools.map((school) => (
          <MobileSchoolCard key={school.id} school={school} />
        ))}
      </div>

      {/* Desktop View: Table */}
      <Card className="shadow-card hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">School Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Subdomain</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">
                    Registered Date
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {school.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {school.subdomain}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {school.address || "Not specified"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge isActive={school.isActive} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(school.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Details"
                          onClick={() => onViewSchool(school)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title={school.isActive ? "Deactivate" : "Activate"}
                          onClick={() => handleToggleStatus(school)}
                          disabled={isToggling}
                        >
                          {school.isActive ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Ban className="w-4 h-4 text-red-600" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Delete"
                          onClick={() => handleDeleteClick(school)}
                          className="text-red-600"
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{schoolToDelete?.name}</strong> and all associated data
              including users, classes, and videos. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
