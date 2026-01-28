export interface School {
  id: number;
  name: string;
  subdomain: string;
  logo: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface SchoolDomainResponse {
  success: boolean;
  message: string;
  school: School | null;
}

export interface LoginResponseSuperAdmin {
  success: boolean;
  message: string;
  token?: string;
  admin: {
    id: number;
    email: string;
    role: string;
  };
  adminName: string;
}

export interface LoginSuperAdminData {
  email?: string;
  password?: string;
}

export interface DashboardMetrics {
  totalSchools: number;
  activeSchools: number;
  inactiveSchools: number;
  totalStudents: number;
  totalAdmins: number;
  totalVideos: number;
  activeSubscriptions: number;
  growthRate: string;
  recentSchools: number;
}

export interface ChartData {
  month: string;
  users: number;
}

export interface Activity {
  id: number;
  schoolName: string;
  action: string;
  timestamp: string;
  timeAgo: string;
}

export interface ActivitiesResponse {
  success: boolean;
  activities: Activity[];
}

export interface AddSchoolDataResponse {
  success: boolean;
  message: string;
  school: {
    id: number;
    name: string;
    subdomain: string;
    email: string;
    address: string | null;
    logo: string | null;
  };
  admin: {
    id: number;
    name: string;
    email: string;
    token: string;
  };
}

export interface SchoolArray {
  id: number;
  name: string;
  subdomain: string;
  logo: string | null;
  email: string;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    users: number | null;
    classes: number | null;
    videos: number | null;
  };
  users: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
}

// types/types.ts
export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalSchools: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetSchoolsResponse {
  success: boolean;
  count: number;
  schools: SchoolArray[];
  pagination: PaginationInfo;
}

export interface GetUserMetrics {
  totalUsers: number;
  totalAdmins: number;
  totalStudents: number;
  growthRate: string;
  recentUsers: number;
}

export interface GetUserMetricsResponse {
  success: boolean;
  metrics: GetUserMetrics;
}

export interface UsersArray {
  id: number;
  name: string;
  email: string;
  role: string;
  sudentId: number | null;
  classId: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  school: {
    id: number;
    name: string;
    subdomain: string;
  };
  class: {
    id: number;
    grade: string;
  } | null;
}

export interface UsersPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalUsers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetAllUsersResponse {
  success: boolean;
  users: UsersArray[];
  pagination: UsersPaginationInfo;
}

// SCHOOL ADMIN TYPES
export type UserRoles = "TEACHER" | "ADMIN" | "STUDENT";

export interface Classes {
  id: number;
  name: string;
  schoolId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  school: {
    id: number;
    name: string;
  };
  _count: {
    students: number;
    videos: number;
    arms: number;
  };
}

export interface ClassesFetchRes {
  success: boolean;
  classes: Classes[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface TeacherForDropdown {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface TeacherForDropdownRes {
  success: boolean;
  teachers: TeacherForDropdown[];
}

export interface ClassOrArm {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  name: string;
  email: string | null;
  studentId: string;
  profilePicture: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  class: ClassOrArm | null;
  arm: ClassOrArm | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudentPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalStudents: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StudentsResponse {
  success: boolean;
  message: string;
  students: Student[];
  pagination: StudentPaginationInfo;
}
