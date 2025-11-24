export interface School {
  id: string;
  name: string;
  subdomain: string;
  logo: string;
  primaryColor?: string;
  secondaryColor?: string;
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

export interface GetSchoolsResponse {
  success: boolean;
  count: number;
  schools: SchoolArray[];
}
