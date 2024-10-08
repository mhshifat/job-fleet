"use client";

import Steps from "@/components/ui/step";
import { IRegisterFormSchema, registerFormSchema } from "@/domain/auth/validators";
import { ROUTE_PATHS } from "@/utils/constants";
import { cn } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";

const STEPS = [
  {
    title: "Sign Up As",
    component: lazy(() => import("./sign-up-as-form")),
  },
  {
    title: "Basic Information",
    component: lazy(() => import("./sign-up-basic-info-form")),
  },
  {
    title: "Account Activation",
    component: lazy(() => import("./sign-up-account-activation")),
  },
];

export default function SignUpForm() {
  const form = useForm<IRegisterFormSchema>({
    mode: "all",
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      signUpAs: ""
    },
    shouldUnregister: false
  });

  return (
    <>
      <FormProvider {...form}>
        <Steps>
          <div className="w-full">
            {STEPS.map(({ component: Component, ...step }) => (
              <Steps.Item key={step.title}>
                <Steps.Content>
                  <p className="text-xl font-semibold font-geist-mono text-foreground/50 mt-1">{step.title}</p>
                  <Component />
                </Steps.Content>
              </Steps.Item>
            ))}
          </div>

          <div className="w-full">
            <Steps.Body />
          </div>

          <Steps.Progress
            className="w-full absolute bottom-0 flex gap-5"
            renderItem={({ isActive }) => (
              <span
                className={cn("flex flex-1 bg-border h-2 rounded-md", {
                  "bg-primary": isActive,
                })}
              />
            )}
          />
        </Steps>
      </FormProvider>
      <p className="text-center mt-5 text-sm font-geist font-medium text-foreground/60">Already have an account? <Link className="font-geist-mono text-primary hover:underline underline-offset-4" href={ROUTE_PATHS.LOGIN}>Login</Link></p>
    </>
  )
}