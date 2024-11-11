import CreateAutomationBtnWrapper from "./create-automation-btn-wrapper";

export default function AutomationsTopActions() {
  return (
    <div className="flex items-center gap-5">
      <h3 className="text-2xl font-geist font-medium text-foreground/80 leading-[1]">Automations</h3>

      <div className="ml-auto">
        <CreateAutomationBtnWrapper />
      </div>
    </div>
  )
}