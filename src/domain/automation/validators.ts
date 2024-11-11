import { z } from "zod";

export const createAutomationFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
});

export type ICreateAutomationFormSchema = z.infer<typeof createAutomationFormSchema>;
