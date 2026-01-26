import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2).max(100),
  //   email: z.email().optional().or(z.literal("")),
  classId: z.number().int().positive(),
  armId: z.number().int().positive().optional(),
  dateOfBirth: z.string().optional().or(z.literal("")), // Optional date of birth
  profilePicture: z.string().url().optional().or(z.literal("")), // Optional URL
});

export type CreateStudentType = z.infer<typeof createStudentSchema>;
