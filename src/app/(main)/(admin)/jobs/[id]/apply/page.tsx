import ApplyFormBuilder from "@/components/modules/jobs/apply-form-builder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Apply Form",
  description: "Create a new job post for your company",
};

export default function ApplyFormPage() {
  return (
    <div className="w-full flex flex-col flex-1">
      <ApplyFormBuilder />
    </div>
  )
}