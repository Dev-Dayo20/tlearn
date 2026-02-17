import * as z from "zod";

export const teacherSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional().nullable(),
  profilePicture: z.string().optional().nullable().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TeacherFormValues = z.infer<typeof teacherSchema>;
