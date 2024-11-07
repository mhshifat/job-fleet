import WorkflowLists from "@/components/modules/admin/workflows/workflow-lists";
import WorkflowsTopActions from "@/components/modules/admin/workflows/workflows-top-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet",
  description: "Create a new job post for your company",
};

export default function WorkflowsPage() {
  return (
    <div className="p-5">
      <WorkflowsTopActions />
      <WorkflowLists />
    </div>
  )
}