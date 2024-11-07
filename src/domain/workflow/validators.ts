import { z } from "zod";

export const createWorkflowFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
});

export type ICreateWorkflowFormSchema = z.infer<typeof createWorkflowFormSchema>;
