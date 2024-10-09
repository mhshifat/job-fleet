"use client";

import DeleteHandler from "@/components/shared/delete-handler";
import Button from "@/components/ui/button";
import useDeleteFormMutation from "@/domain/form/use-delete-form-mutation";
import { Trash2Icon } from "lucide-react";

export default function DeleteFormBtnWrapper({ id }: { id: string; }) {
  const deleteFrom = useDeleteFormMutation(id);
  
  return (
    <DeleteHandler
      description="Are you sure you want to delete the form?"
      handler={async () => {
        deleteFrom.mutateAsync({});
      }}
    >
      <Button variant="ghost" size="icon" className="w-max h-max">
        <Trash2Icon className="size-5 text-danger" />
      </Button>
    </DeleteHandler>
  )
}