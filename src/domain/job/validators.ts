import { z } from "zod";

export const createJobFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  category: z.string().min(1),
  code: z.string().optional(),
  description: z.string().min(1),
  type: z.string().min(1),
  jobPlace: z.string().min(1),
  vacancy: z.number().min(1),
  deadline: z.string().refine((data) => new Date(data) > new Date(), {
    message: "Date must be a future date"
  }),
  jobLevel: z.string().min(1, "Job level is required"),
  numOfExperience: z.string().min(1),
  salaryType: z.string().min(1),
  currency: z.string().min(1),
  salaryRange: z.string().min(1),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
});

export type ICreateJobFormSchema = z.infer<typeof createJobFormSchema>;
