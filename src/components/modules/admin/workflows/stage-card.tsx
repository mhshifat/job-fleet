import Button from "@/components/ui/button";
import Link from "next/link";
import { IStage } from "@/domain/stage/stage";
import DeleteStageBtnWrapper from "./delete-stage-btn-wrapper";
import Select from "@/components/ui/select";
import useGetAutomationsQuery from "@/domain/automation/use-get-automations-query";
import { useMemo } from "react";
import useUpdateStageMutation from "@/domain/stage/use-update-stage-mutation";

export default function StageCard({ data }: { data: IStage }) {
  const updateStage = useUpdateStageMutation();
  const { data: automations, isLoading: automationsIsLoading } =  useGetAutomationsQuery({});
  const automation = useMemo(() => {
    return automations?.find(w => w.id === data.automationId)
  }, [automations, data]);
  
  const isLoading = automationsIsLoading;
  
  async function handleAttachAutomation(automationId: string) {
    await updateStage.mutateAsync({
      id: data.id,
      automationId,
      workflowId: data?.workflowId
    });
  }
  return (
    <div className="border-[5px] border-background rounded-lg overflow-hidden shadow-sm ring-1 ring-background-secondary">
      <div className="aspect-square w-full bg-primary/10 rounded-tl-md rounded-tr-md py-4 px-5 flex flex-col">
        <div className="flex items-center gap-5 justify-between">
          <small className="text-sm font-geist-mono font-medium">
          </small>

          <DeleteStageBtnWrapper id={data.id} />
        </div>
        <div className="flex-1 flex items-center">
          <h3 className="text-3xl font-geist-mono font-semibold max-w-[95%]">{data?.title}</h3>
        </div>
      </div>
      {/* <div className="flex items-center gap-5 justify-between bg-background pt-7 pb-[calc(1.75rem-5px)] px-3">
        <h3 className="text-lg tracking-tighter font-geist-mono font-semibold leading-[1] text-foreground/80"></h3>

        <Link href={`/dashboard/${data.workflowId}/stages/${data.id}`}>
          <Button className="rounded-full">View</Button>
        </Link>
      </div> */}
      <div className="flex flex-col gap-5 pt-7 pb-[calc(1.75rem-5px)] px-3">
        <div className="flex items-center gap-5 justify-between bg-background">
          <Select 
            disabled={isLoading}
            value={[{ content: automation?.title || "", value: automation?.id || "" }]}
            onChange={(values) => handleAttachAutomation(values[0].value)}
            placeholder={isLoading ? "Loading..." : "Attach Automation"}
          >
            {automations?.map(a => (
              <Select.Option key={a.id} value={a.id}>{a.title}</Select.Option>
            ))}
          </Select>
          {automation?.id && (
            <Link href={`/dashboard/workflows/${data.workflowId}`}>
              <Button className="rounded-full">Edit</Button>
            </Link>
          )}
        </div>
      </div>
      </div>
  )
}