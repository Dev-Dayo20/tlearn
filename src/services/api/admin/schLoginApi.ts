import api from "@/services/api/super-admin/super-admin";
import { SchoolLoginData } from "@/schema/schLoginSchema";

export const loginSchool = async (data: SchoolLoginData, schoolId: number) => {
  const payload = { ...data, schoolId };

  const response = await api.post("/sch-admin/login", payload);
  return response.data;
};
