import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import api from "@/services/api/super-admin/super-admin";

// Fetch students with pagination and filters
const fetchStudents = async (
  page: number,
  limit: number,
  search?: string,
  classId?: string,
  armId?: string,
) => {
  const params: any = { page, limit };
  if (search) params.search = search;
  if (classId) params.classId = classId;
  if (armId) params.armId = armId;

  const response = await api.get(`/sch-admin/students`, { params });
  return response.data;
};

const StudentsLists = () => {
  return <div>StudentsLists</div>;
};

export default StudentsLists;
