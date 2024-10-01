"use client";

import JobApplyFormBuilder from "@/components/modules/jobs/job-apply-form-builder";
import ApplyFormBuilderProvider from "./apply-form-builder-provider";

export default function ApplyFormBuilder() {
  return (
    <ApplyFormBuilderProvider>
      <JobApplyFormBuilder />
    </ApplyFormBuilderProvider>
  )
}