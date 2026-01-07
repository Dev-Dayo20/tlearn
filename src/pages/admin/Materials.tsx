import React from "react";
import { SchoolDomainResponse } from "@/types/types";

interface MaterialProps {
  school: SchoolDomainResponse;
}
const Materials = ({ school }: MaterialProps) => {
  return <div>Materials</div>;
};

export default Materials;
