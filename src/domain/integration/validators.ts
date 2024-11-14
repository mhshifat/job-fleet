import { z } from "zod";

export const createIntegrationFormSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1),
});

export type ICreateIntegrationFormSchema = z.infer<typeof createIntegrationFormSchema>;
