import { Eye, MoreVertical, CheckCircle, Ban, Trash2 } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { UsersArray } from "@/types/types";
import { StatusBadge } from "@/utils/statusbadge";
import { formatDate } from "@/utils/dateFormatter";
import { useToggleUser } from "@/hooks/useSuperAdminLogin";

interface UserTableProps {
  users: UsersArray[];
  isLoading: boolean;
  role: "STUDENT" | "ADMIN" | "all";
  onViewUser: (user: UsersArray) => void;
}

export function UserTable({
  users,
  isLoading,
  role,
  onViewUser,
}: UserTableProps) {
  const { mutate: toggleUser, isPending: isToggling } = useToggleUser();

  const handleToggleUser = (user: UsersArray) => {
    toggleUser({ userId: user.id, isActive: !user.isActive });
  };
  // Mobile Card View
  const MobileUsersView = ({ user }: { user: UsersArray }) => {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-base">{user?.name} </h3>
              <p className="text-sm text-muted-foreground"> {user?.email} </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewUser(user)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user?.isActive ? (
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Role</span>
            <span> {user?.role} </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">School</span>
            <span> {user?.school?.name} </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <StatusBadge isActive={user?.isActive} />
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Registered</span>
            <span className="font-medium">{formatDate(user?.createdAt)} </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          Loading users...
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
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
      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <MobileUsersView key={user?.id} user={user} />
        ))}
      </div>

      {/* Desktop View */}
      <Card className="shadow-card hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">School</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">
                    Date Registered
                  </TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user?.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{user?.name} </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user?.email}{" "}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user?.role}{" "}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user?.school?.name}{" "}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <StatusBadge isActive={user?.isActive} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(user?.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Details"
                          onClick={() => onViewUser(user)}
                        >
                          {" "}
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title={user?.isActive ? "Deactivate" : "Activate"}
                          disabled={isToggling}
                          onClick={() => handleToggleUser(user)}
                        >
                          {user?.isActive ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Ban className="w-4 h-4 text-red-600" />
                          )}
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
    </>
  );
}
