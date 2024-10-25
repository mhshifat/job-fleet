import { z } from "zod";

export const upsertSettingsSchema = z.object({
  id: z.string().optional(),
  streetAddress: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

export type IUpsertSettingsSchema = z.infer<typeof upsertSettingsSchema>;

