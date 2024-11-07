import StageLists from "@/components/modules/admin/workflows/stage-lists";
import WorkflowStagesTopActions from "@/components/modules/admin/workflows/workflow-stages-top-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet",
  description: "Create a new job post for your company",
};

export default function FormBuilderPage() {
  return (
    <div className="w-full flex flex-col flex-1 p-5">
      <WorkflowStagesTopActions />
      <StageLists />
    </div>
  )
}