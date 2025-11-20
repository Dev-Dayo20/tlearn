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
  success: boolean;
  metric: {
    totalSchools: number;
    activeSchools: number;
    inactiveSchools: number;
    totalStudents: number;
    totalAdmins: number;
    totalVideos: number;
    activeSubscriptions: number;
    growthRate: string;
    recentSchools: number;
  };
}

export interface ChartData {
  month: string;
  users: number;
}

export interface Activity {
  id: number;
  schoolName: string;
  action: string;
  timestamp: Date;
  timeAgo: string;
}
