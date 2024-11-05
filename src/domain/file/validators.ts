import { z } from "zod";

export const createFileFormSchema = z.object({
});

export type ICreateFileFormSchema = z.infer<typeof createFileFormSchema>;
