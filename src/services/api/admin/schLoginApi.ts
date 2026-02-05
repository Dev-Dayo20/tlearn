import api from "@/services/api/super-admin/super-admin";
import { SchoolLoginData } from "@/schema/schLoginSchema";
import { ClassType } from "@/schema/ClassSchema";
import {
  ClassesFetchRes,
  DashboardStats,
  StudentAnalyticsResponse,
} from "@/types/types";
import { URLSearchParams } from "url";
import { CreateStudentType } from "@/schema/createStudentSchema";

export const loginSchool = async (data: SchoolLoginData, schoolId: number) => {
  const payload = { ...data, schoolId };

  const response = await api.post("/sch-admin/login", payload);
  return response.data;
};

export const createClass = async (data: ClassType) => {
  const response = await api.post("/sch-admin/class", data);
  return response.data;
};

export const fetchClasses = async (
  search?: string,
  page: number = 1,
  pageSize: number = 10,
  isActive?: boolean,
): Promise<ClassesFetchRes> => {
  const params: Record<string, string> = {
    page: page.toString(),
    pageSize: pageSize.toString(),
  };

  if (search) params.search = search;
  if (isActive !== undefined) params.isActive = isActive.toString();

  const { data } = await api.get("/sch-admin/classes", { params });
  return data;
};

export const getClasses = async () => {
  const response = await api.get("/sch-admin/classes/list");
  return response.data;
};

export const createStudent = async (data: CreateStudentType) => {
  const response = await api.post("/sch-admin/register/students", data);
  return response.data;
};

export const fetchMaterials = async (params: any) => {
  const response = await api.get("/sch-admin/materials", { params });
  return response.data;
};

export const uploadMaterial = async (formData: FormData) => {
  const response = await api.post("/sch-admin/materials/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateMaterial = async (id: number, data: any) => {
  const response = await api.patch(`/sch-admin/materials/${id}`, data);
  return response.data;
};

export const deleteMaterial = async (id: number) => {
  const response = await api.delete(`/sch-admin/materials/${id}`);
  return response.data;
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/sch-admin/dashboard/stats");
  return response.data;
};

export const fetchStudentAnalytics = async (
  id: string,
): Promise<StudentAnalyticsResponse> => {
  const response = await api.get(`/sch-admin/students/${id}/analytics`);
  return response.data;
};
