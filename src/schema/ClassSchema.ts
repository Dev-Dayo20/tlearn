import { z } from "zod";

export const createClassSchema = z.object({
  name: z.string().min(1, "Class name is required").trim(),
  teacherId: z.string().optional(),
  arms: z.array(z.string().min(1)).optional(), // Array of arm names
  subjects: z.array(z.string().min(1)).optional(),
});

export type ClassType = z.infer<typeof createClassSchema>;
