import { z } from "zod";

export const createApplicationFormSchema = z.object({
  id: z.string().optional(),
  record: z.any({ message: "Record is required" }),
});

export type ICreateApplicationFormSchema = z.infer<typeof createApplicationFormSchema>;
