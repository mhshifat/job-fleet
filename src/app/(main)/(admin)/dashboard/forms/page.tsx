import FormLists from "@/components/modules/admin/forms/form-lists";
import FormsTopActions from "@/components/modules/admin/forms/forms-top-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Apply Form",
  description: "Create a new job post for your company",
};

export default function FormsPage() {
  return (
    <div className="p-5">
      <FormsTopActions />
      <FormLists />
    </div>
  )
}