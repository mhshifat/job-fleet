import { z, ZodIssueCode } from "zod";

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
  currency: z.string(),
  salaryRange: z.string(),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
  linkedinUrl: z.string(),
}).superRefine((data, ctx) => {
  if (data.salaryType !== "NEGOTIABLE" && !data?.currency) ctx.addIssue({
    code: ZodIssueCode.custom,
    message: "Currency is required",
    path: ["currency"]
  });
  if (data.salaryType !== "NEGOTIABLE" && !data?.salaryRange) ctx.addIssue({
    code: ZodIssueCode.custom,
    message: "Salary range is required",
    path: ["salaryRange"]
  });

  return z.NEVER;
});

export type ICreateJobFormSchema = z.infer<typeof createJobFormSchema>;
