import React, { useState } from "react";
import { RegisterStudents } from "@/components/admin/modals/RegisterStudent";
import { SchoolDomainResponse } from "@/types/types";
import StudentsLists from "@/components/admin/students/StudentsLists";

interface StudentsProps {
  school: SchoolDomainResponse;
}

const Students = ({ school }: StudentsProps) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            View and manage all students in {school.school?.name}
          </p>
        </div>
      </div>

      <StudentsLists />

      <RegisterStudents
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
};

export default Students;
