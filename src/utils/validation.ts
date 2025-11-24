import { string, z } from "zod";

export const loginSuperAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type LoginSuperAdminData = z.infer<typeof loginSuperAdminSchema>;

export const schoolDataSchema = z
  .object({
    schoolName: z
      .string()
      .min(1, "School name is required")
      .min(2, "School name must be at least 2 characters")
      .max(100, "School name must be less than 100 characters"),
    subdomain: z
      .string()
      .min(1, "Subdomain is required")
      .min(3, "Subdomain must be at least 3 characters")
      .max(50, "Subdomain must be less than 50 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Subdomain can only contain lowercase letters, numbers, and hyphens"
      ),
    schoolEmail: z
      .string()
      .min(1, "School email is required")
      .email("Invalid school email address"),
    address: z
      .string()
      .min(1, "Address is required")
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address must be less than 200 characters"),
    logo: z.string(),
    adminName: z
      .string()
      .min(1, "Admin name is required")
      .min(2, "Admin name must be at least 2 characters")
      .max(100, "Admin name must be less than 100 characters"),
    adminEmail: z
      .string()
      .min(1, "Admin email is required")
      .email("Invalid admin email address"),
    adminPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmAdminPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.adminPassword === data.confirmAdminPassword, {
    message: "Passwords do not match",
    path: ["confirmAdminPassword"],
  });

export type SchoolData = z.infer<typeof schoolDataSchema>;
export type AddSchoolPayload = Omit<SchoolData, "confirmAdminPassword">;
