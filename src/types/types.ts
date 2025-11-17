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
