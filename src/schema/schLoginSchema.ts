import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.literal("ADMIN"),
});

export const teacherLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.literal("TEACHER"),
});

export const studentLoginSchema = z.object({
  studentId: z
    .string()
    .min(1, "Student ID is required")
    .regex(
      /^[A-Z]{3}\/[A-Z]{3}\/\d{5}$/,
      "Invalid student ID format (e.g., MUW/NUR/00009)",
    ),
  role: z.literal("STUDENT"),
});

// Union type for all login types
export type AdminLoginData = z.infer<typeof adminLoginSchema>;
export type TeacherLoginData = z.infer<typeof teacherLoginSchema>;
export type StudentLoginData = z.infer<typeof studentLoginSchema>;
export type SchoolLoginData =
  | AdminLoginData
  | TeacherLoginData
  | StudentLoginData;
