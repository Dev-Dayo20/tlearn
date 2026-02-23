import { z } from "zod";

export const subjectSchema = z.object({
  name: z
    .string()
    .min(2, "Subject name must be at least 2 characters")
    .max(100, "Subject name too long"),
  classId: z.coerce
    .number({
      invalid_type_error: "Please select a class",
      required_error: "Class selection is required",
    })
    .int()
    .positive("Invalid class ID"),
  teacherId: z.coerce
    .number()
    .int()
    .positive("Invalid teacher ID")
    .optional()
    .nullable(),
  description: z.string().optional(),
  code: z.string().optional(),
});

export const updateSubjectSchema = subjectSchema
  .partial()
  .extend({
    teacherId: z.coerce.number().int().positive().optional().nullable(),
  })
  .strict();

export type SubjectType = z.infer<typeof subjectSchema>;
export type UpdateSubjectType = z.infer<typeof updateSubjectSchema>;
