import React, { useState } from "react";
import { RegisterStudents } from "@/components/admin/modals/RegisterStudent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, UserPlus, Filter } from "lucide-react";
import { SchoolDomainResponse } from "@/types/types";

interface StudentsProps {
  school: SchoolDomainResponse;
}

const Students = ({ school }: StudentsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <div>
        {/* <h5 className="text-2xl md:text-xl font-bold tracking-tight text-foreground">
          Students
        </h5> */}
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Manage all students
        </p>
      </div>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          {/* FILTERS */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value="">
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value="">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {/* {uniqueClasses.map((cls) => (
              <SelectItem key={cls} value={cls}>
                {cls}
              </SelectItem>
            ))} */}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowRegisterModal(true)}>
          <UserPlus className="h-4 w-4" />
          Add Student
        </Button>
      </div>
      <RegisterStudents
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </>
  );
};

export default Students;
