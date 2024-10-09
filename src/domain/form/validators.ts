import { z } from "zod";

export const createFormFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
});

export type ICreateFormFormSchema = z.infer<typeof createFormFormSchema>;
