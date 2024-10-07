import { z, ZodIssueCode } from "zod";

export const registerFormSchema = z.object({
  signUpAs: z.string().min(1),
  organization: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).superRefine(({ signUpAs, organization, password, confirmPassword }, ctx) => {
  if (signUpAs === "ORGANIZATION" && !organization?.length) ctx.addIssue({
    code: ZodIssueCode.custom,
    message: "Required",
    path: ["organization"]
  });
  if (password !== confirmPassword) ctx.addIssue({
    code: ZodIssueCode.custom,
    message: "Not matched",
    path: ["confirmPassword"]
  });
});

export type IRegisterFormSchema = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
