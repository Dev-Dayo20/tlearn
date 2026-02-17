import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2).max(100),
  classId: z.number().int().positive(),
  armId: z.number().int().positive().optional(),
  dateOfBirth: z.string().optional().or(z.literal("")),
  profilePicture: z.string().url().nullable().optional().or(z.literal("")),
});

export const updateStudentSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  classId: z.number().int().positive().optional(),
  armId: z.number().int().positive().optional().nullable(),
  dateOfBirth: z.string().optional().nullable().or(z.literal("")),
  profilePicture: z.string().url().optional().nullable().or(z.literal("")),
});

export type CreateStudentType = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
