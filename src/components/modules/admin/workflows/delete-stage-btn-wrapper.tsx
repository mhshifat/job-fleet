"use client";

import DeleteHandler from "@/components/shared/delete-handler";
import Button from "@/components/ui/button";
import useDeleteStageMutation from "@/domain/workflow/use-delete-stage-mutation";
import { Trash2Icon } from "lucide-react";

export default function DeleteStageBtnWrapper({ id }: { id: string; }) {
  const deleteStage = useDeleteStageMutation(id);
  
  return (
    <DeleteHandler
      description="Are you sure you want to delete the workflow?"
      handler={async () => {
        deleteStage.mutateAsync({});
      }}
    >
      <Button variant="ghost" size="icon" className="w-max h-max">
        <Trash2Icon className="size-5 text-danger" />
      </Button>
    </DeleteHandler>
  )
}