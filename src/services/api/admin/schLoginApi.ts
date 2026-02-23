import api from "@/services/api/super-admin/super-admin";
import { SchoolLoginData } from "@/schema/schLoginSchema";
import { ClassType } from "@/schema/ClassSchema";
import {
  ClassesFetchRes,
  DashboardStats,
  StudentAnalyticsResponse,
  TeachersResponse,
  TeacherAssignmentData,
} from "@/types/types";
import {
  CreateStudentType,
  UpdateStudentInput,
} from "@/schema/createStudentSchema";
import { SubjectType } from "@/schema/SubjectSchema";
import { SubjectsFetchRes, SubjectsAllRes } from "@/types/types";

export const loginSchool = async (data: SchoolLoginData, schoolId: number) => {
  const payload = { ...data, schoolId };
  const endpoint =
    data.role === "STUDENT" ? "/student/login" : "/sch-admin/login";

  const response = await api.post(endpoint, payload);
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
export const fetchTeachers = async (
  search?: string,
  page: number = 1,
  limit: number = 10,
): Promise<TeachersResponse> => {
  const params: Record<string, string> = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (search) params.search = search;

  const { data } = await api.get("/sch-admin/teachers", { params });
  return data;
};

export const createTeacher = async (data: any) => {
  const response = await api.post("/sch-admin/teacher", data);
  return response.data;
};

export const updateTeacher = async (id: number, data: any) => {
  const response = await api.patch(`/sch-admin/teachers/${id}`, data);
  return response.data;
};

export const assignTeacher = async (data: TeacherAssignmentData) => {
  const response = await api.post("/sch-admin/teachers/assign", data);
  return response.data;
};

export const updateStudent = async (id: number, data: UpdateStudentInput) => {
  const response = await api.patch(`/sch-admin/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await api.delete(`/sch-admin/students/${id}`);
  return response.data;
};

// Subjects API
export const fetchSubjects = async (
  search?: string,
  page: number = 1,
  limit: number = 10,
  classId?: number,
): Promise<SubjectsFetchRes> => {
  const params: Record<string, string> = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (search) params.search = search;
  if (classId) params.classId = classId.toString();

  const { data } = await api.get("/sch-admin/subjects", { params });
  return data;
};

export const fetchAllSubjects = async (): Promise<SubjectsAllRes> => {
  const { data } = await api.get("/sch-admin/subjects/all");
  return data;
};

export const createSubject = async (data: SubjectType) => {
  const { description, code, ...payload } = data;
  const response = await api.post("/sch-admin/subject", payload);
  return response.data;
};

export const updateSubject = async (id: number, data: Partial<SubjectType>) => {
  const response = await api.patch(`/sch-admin/subject/${id}`, data);
  return response.data;
};

export const deleteSubject = async (id: number) => {
  const response = await api.delete(`/sch-admin/subjects/${id}`);
  return response.data;
};
