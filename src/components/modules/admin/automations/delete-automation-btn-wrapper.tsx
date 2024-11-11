"use client";

import DeleteHandler from "@/components/shared/delete-handler";
import Button from "@/components/ui/button";
import useDeleteAutomationMutation from "@/domain/automation/use-delete-automation-mutation";
import { Trash2Icon } from "lucide-react";

export default function DeleteAutomationBtnWrapper({ id }: { id: string; }) {
  const deleteAutomation = useDeleteAutomationMutation(id);
  
  return (
    <DeleteHandler
      description="Are you sure you want to delete the automation?"
      handler={async () => {
        deleteAutomation.mutateAsync({});
      }}
    >
      <Button variant="ghost" size="icon" className="w-max h-max">
        <Trash2Icon className="size-5 text-danger" />
      </Button>
    </DeleteHandler>
  )
}