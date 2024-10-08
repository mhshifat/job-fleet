import FormBuilderWrapper from "@/components/modules/admin/forms/form-builder-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Apply Form",
  description: "Create a new job post for your company",
};

export default function FormBuilderPage() {
  return (
    <div className="w-full flex flex-col flex-1">
      <FormBuilderWrapper />
    </div>
  )
}