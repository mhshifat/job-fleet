"use client";

import DeleteHandler from "@/components/shared/delete-handler";
import Button from "@/components/ui/button";
import useDeleteWorkflowMutation from "@/domain/workflow/use-delete-workflow-mutation";
import { Trash2Icon } from "lucide-react";

export default function DeleteWorkflowBtnWrapper({ id }: { id: string; }) {
  const deleteWorkflow = useDeleteWorkflowMutation(id);
  
  return (
    <DeleteHandler
      description="Are you sure you want to delete the workflow?"
      handler={async () => {
        deleteWorkflow.mutateAsync({});
      }}
    >
      <Button variant="ghost" size="icon" className="w-max h-max">
        <Trash2Icon className="size-5 text-danger" />
      </Button>
    </DeleteHandler>
  )
}