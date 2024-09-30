"use client";

import Container from "@/components/shared/container";
import Steps from "@/components/ui/step";
import { createJobFormSchema, ICreateJobFormSchema } from "@/domain/job/validators";
import { cn } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";

const STEPS = [
  {
    title: "Basic Information",
    description: "Write and fill out the information of the job",
    component: lazy(() => import("./basic-information-form"))
  },
  {
    title: "Employment Details",
    description: "Write and fill out the information of the job",
    component: lazy(() => import("./employment-details-form"))
  },
  {
    title: "Experience",
    description: "Write and fill out the information of the job",
    component: lazy(() => import("./experience-form"))
  },
  {
    title: "Salary",
    description: "Write and fill out the information of the job",
    component: lazy(() => import("./salary-form"))
  },
  {
    title: "Location",
    description: "Write and fill out the information of the job",
    component: lazy(() => import("./job-location-form"))
  },
];

export default function CreateJobForm() {
  const form = useForm<ICreateJobFormSchema>({
    mode: "all",
    resolver: zodResolver(createJobFormSchema)
  });
  console.log(form.watch());

  return (
    <FormProvider {...form}>
      <Steps>
        <div className="w-full h-auto shadow-sm flex items-center">
          {STEPS.map(({ component: Component, ...step }, stepIdx) => (
            <Steps.Item key={step.title}>
              <Steps.Placeholder current={stepIdx} className={cn("border-b-[1.5px] border-border py-5 px-7 flex-1 self-stretch last-of-type:border-r-0 relative before:content-[''] before:absolute before:top-0 before:right-[2px] before:rounded-md before:aspect-square before:h-full before:bg-transparent before:border-r-2 before:border-t-2 before:border-border before:rotate-45 before:scale-75 last-of-type:before:hidden overflow-hidden")}>
                {({ active }) => (
                  <div className={cn("flex items-start gap-[1rem] relative")}>
                    <div className={cn("text-foreground/50 text-base font-geist font-semibold antialiased", {
                      "text-primary": active === stepIdx
                    })}>{(stepIdx + 1).toString().padStart(2, '0')}</div>
                    <div className="flex flex-col">
                      <h3 className={cn("text-base font-geist-mono font-semibold text-foreground/50 antialiased", {
                        "text-primary": active === stepIdx
                      })}>{step.title}</h3>
                    </div>
                  </div>
                )}
              </Steps.Placeholder>
              <Steps.Content>
                <Component />
              </Steps.Content>
            </Steps.Item>
          ))}
        </div>

        <div className="w-full p-[2rem]">
          <Container>
            <Steps.Body />
          </Container>
        </div>

        <Steps.Progress
          className="mt-auto flex fixed bottom-0 left-0 w-full"
          renderItem={({ isActive }) => <span className={cn("flex flex-1 bg-border h-1", {
            "bg-primary": isActive
          })} />}
        />
      </Steps>
    </FormProvider>
  )
}