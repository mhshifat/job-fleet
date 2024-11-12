import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";
import { IApplication } from "@/domain/application/application";
import useUpdateApplicationMutation from "@/domain/application/use-update-application-mutation";
import useGetJobQuery from "@/domain/job/use-get-job-query";
import useGetStagesQuery from "@/domain/workflow/use-get-stages-query";
import { CheckIcon } from "lucide-react";
import { useMemo, useRef } from "react";

interface AssignStageBtnWrapperProps {
  data: IApplication;
}

export default function AssignStageBtnWrapper({ data }: AssignStageBtnWrapperProps) {
  const { data: jobData } = useGetJobQuery(data.jobId);
  const { data: stagesData, isLoading } = useGetStagesQuery({
    workflowId: jobData?.workflowId
  }, { enabled: !!jobData?.workflowId });
  const updateApplication = useUpdateApplicationMutation()
  const popUpRef = useRef<{ toggle: () => void; }>({
    toggle() {},
  });
  const assignedStage = useMemo(() => {
    return stagesData?.find(stage => stage.id === data?.stageId)
  }, [data?.stageId, stagesData])

  async function handleAssignStage(stageId: string) {
    await updateApplication.mutateAsync({
      id: data.id,
      stageId
    });
  }
  return (
    <Popup
      comRef={popUpRef}
    >
      <Popup.Trigger>
        <Button disabled={isLoading} className="w-[200px]" variant={assignedStage?.id ? "default" : "secondary-outlined"} size="sm">{assignedStage?.title || "Assign Stage"}</Button>
      </Popup.Trigger>
      <Popup.Content>
        <ul className="min-w-[240px]">
          {stagesData?.filter(s => !!s.automationId)?.map(item => (
            <li className="w-full hover:opacity-50 cursor-pointer font-geist-mono font-medium flex items-center justify-between gap-2" key={item.id} onClick={() => {
              handleAssignStage(item.id);
              popUpRef.current.toggle();
            }}>
              <span>{item.title}</span>
              {item.id === assignedStage?.id && <CheckIcon className="size-4" />}
            </li>
          ))}
        </ul>
      </Popup.Content>
    </Popup>
  )
}