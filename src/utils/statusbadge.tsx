import { Badge } from "@/components/ui/badge";
import { CheckCircle, Ban } from "lucide-react";

interface StatustBadgeProps {
  isActive: boolean;
}

export const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "Active":
      return (
        <Badge className="bg-success text-success-foreground">Active</Badge>
      );
    case "Pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "Suspended":
      return <Badge variant="destructive">Suspended</Badge>;
  }
};

export function StatusBadge({ isActive }: StatustBadgeProps) {
  if (isActive) {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    );
  }

  return (
    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
      <Ban className="w-3 h-3 mr-1" />
      Inactive
    </Badge>
  );
}
