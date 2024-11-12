"use client";

import { useParams, useRouter } from "next/navigation";
import AutomationBuilderProvider from "./automation-builder-provider";
import AutomationBuilder from "./automation-builder";
import Button from "@/components/ui/button";
import { ArrowLeftIcon, BookCheckIcon, FlaskConicalIcon } from "lucide-react";
import Badge from "@/components/ui/badge";
import LoadingBtn from "@/components/shared/loading-btn";
import { useRef } from "react";
import { toast } from "@/utils/toast";
import useGetAutomationQuery from "@/domain/automation/use-get-automation-query";
import Spinner from "@/components/shared/spinner";
import { ROUTE_PATHS } from "@/utils/constants";
import { ReactFlowProvider } from "@xyflow/react";
import useRunAutomationMutation from "@/domain/automation/use-run-automation-mutation";

export default function AutomationBuilderWrapper() {
  const { id } = useParams();
  const router = useRouter();
  const runAutomation = useRunAutomationMutation(id as string);
  const { data: automationData, isLoading } = useGetAutomationQuery(id as string);
  const builderRef = useRef({
    isValid: () => Promise.resolve({
      isValid: false,
      message: ""
    }),
    save: async () => {},
  });

  async function handleSave() {
    const { isValid, message } = await builderRef.current.isValid();
    if (!isValid) return toast.error(message || "Invalid fields");
    await builderRef.current.save();
  }
  async function handleTest() {
    const { isValid, message } = await builderRef.current.isValid();
    if (!isValid) return toast.error(message || "Invalid fields");
    await runAutomation.mutateAsync(id);
  }
  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle className="gap-3" />
    </div>
  )
  return (
    <AutomationBuilderProvider>
      <div className='border-b border-border py-3 px-5 flex justify-between items-center gap-5'>
        <h1 className='text-xl font-geist text-foreground font-normal capitalize flex items-center gap-2'>
          <Button variant='ghost' className='p-0 w-max h-max' onClick={() => router.push(ROUTE_PATHS.DASHBOARD_AUTOMATIONS)}>
            <ArrowLeftIcon className='size-6' />
          </Button>
          <span>{automationData?.title}</span>
        </h1>
        <div className='flex gap-2'>
          <Button variant="outlined" className='w-max' onClick={handleTest}>
            <LoadingBtn loading={false} icon={false}>
              <FlaskConicalIcon className='size-4' />
              <span>Test</span>
            </LoadingBtn>
          </Button>
          <Button className='w-max' onClick={handleSave}>
            <LoadingBtn loading={false} icon={false}>
              <BookCheckIcon className='size-4' />
              <span>Save</span>
            </LoadingBtn>
          </Button>
        </div>
      </div>
      <ReactFlowProvider>
        <AutomationBuilder innerRef={builderRef} automationId={id as string} />
      </ReactFlowProvider>
    </AutomationBuilderProvider>
  )
}