import api from "@/services/api/super-admin/super-admin";
import { SchoolLoginData } from "@/schema/schLoginSchema";
import { ClassType } from "@/schema/ClassSchema";

export const loginSchool = async (data: SchoolLoginData, schoolId: number) => {
  const payload = { ...data, schoolId };

  const response = await api.post("/sch-admin/login", payload);
  return response.data;
};

export const createClass = async (data: ClassType) => {
  const response = await api.post("", data);
  return response.data;
};
