import React from "react";
import { SchoolDomainResponse } from "@/types/types";
import MaterialsList from "@/components/admin/materials/MaterialsList";

interface MaterialProps {
  school: SchoolDomainResponse;
}

const Materials = ({ school }: MaterialProps) => {
  return (
    <div className="container mx-auto py-6">
      <MaterialsList />
    </div>
  );
};

export default Materials;
