import CreateFormBtnWrapper from "./create-form-btn-wrapper";

export default function FormsTopActions() {
  return (
    <div className="flex items-center gap-5">
      <h3 className="text-2xl font-geist font-medium text-foreground/80 leading-[1]">My Forms</h3>

      <div className="ml-auto">
        <CreateFormBtnWrapper />
      </div>
    </div>
  )
}