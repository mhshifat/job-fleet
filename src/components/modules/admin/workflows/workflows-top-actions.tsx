import CreateWorkflowBtnWrapper from "./create-workflow-btn-wrapper";

export default function WorkflowsTopActions() {
  return (
    <div className="flex items-center gap-5">
      <h3 className="text-2xl font-geist font-medium text-foreground/80 leading-[1]">Workflows</h3>

      <div className="ml-auto">
        <CreateWorkflowBtnWrapper />
      </div>
    </div>
  )
}