import CreateStageBtnWrapper from "./create-stage-btn-wrapper";

export default function WorkflowStagesTopActions() {
  return (
    <div className="flex items-center gap-5">
      <h3 className="text-2xl font-geist font-medium text-foreground/80 leading-[1]">Stages</h3>

      <div className="ml-auto">
        <CreateStageBtnWrapper />
      </div>
    </div>
  )
}