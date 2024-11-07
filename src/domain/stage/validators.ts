import { z } from "zod";

export const createStageFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  workflowId: z.string().min(1),
});

export type ICreateStageFormSchema = z.infer<typeof createStageFormSchema>;
