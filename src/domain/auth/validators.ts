import { z } from "zod";

export const createJobFormSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  code: z.string().optional(),
  description: z.string().min(1),
});

export type ICreateJobFormSchema = z.infer<typeof createJobFormSchema>;