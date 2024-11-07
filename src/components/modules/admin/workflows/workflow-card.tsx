import Button from "@/components/ui/button";
import Link from "next/link";
import { IWorkflow } from "@/domain/workflow/workflow";
import DeleteWorkflowBtnWrapper from "./delete-workflow-btn-wrapper";

export default function WorkflowCard({ data }: { data: IWorkflow }) {
  return (
    <div className="border-[5px] border-background rounded-lg overflow-hidden shadow-sm ring-1 ring-background-secondary">
      <div className="aspect-square w-full bg-primary/10 rounded-tl-md rounded-tr-md py-4 px-5 flex flex-col">
        <div className="flex items-center gap-5 justify-between">
          <small className="text-sm font-geist-mono font-medium">
          </small>

          <DeleteWorkflowBtnWrapper id={data.id} />
        </div>
        <div className="flex-1 flex items-center">
          <h3 className="text-3xl font-geist-mono font-semibold max-w-[95%]">{data?.title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-between bg-background pt-7 pb-[calc(1.75rem-5px)] px-3">
        <h3 className="text-lg tracking-tighter font-geist-mono font-semibold leading-[1] text-foreground/80"></h3>

        <Link href={`/dashboard/workflows/${data.id}`}>
          <Button className="rounded-full">View</Button>
        </Link>
      </div>
    </div>
  )
}