"use client";

import Container from "@/components/shared/container";
import Steps from "@/components/ui/step";
import { cn } from "@/utils/helpers";
import { lazy } from "react";

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
  return (
    <Steps>
      <div className="w-full h-auto shadow-sm flex items-center">
        {STEPS.map(({ component: Component, ...step }, stepIdx) => (
          <Steps.Item key={step.title}>
            <Steps.Placeholder current={stepIdx} className={cn("flex-1 self-stretch py-5 px-7 border-r border-b-2 border-border last-of-type:border-r-0")}>
              {({ active }) => (
                <div className="flex items-start gap-[1rem]">
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
  )
}