"use client";

import DeleteHandler from "@/components/shared/delete-handler";
import Button from "@/components/ui/button";
import useDeleteJobMutation from "@/domain/job/use-delete-job-mutation";
import { Trash2Icon } from "lucide-react";

export default function DeleteJobBtnWrapper({ id }: { id: string; }) {
  const deleteJob = useDeleteJobMutation(id);
  
  return (
    <DeleteHandler
      description="Are you sure you want to delete the job?"
      handler={async () => {
        deleteJob.mutateAsync({});
      }}
    >
      <Button variant="ghost" size="icon" className="w-max h-max">
        <Trash2Icon className="size-5 text-danger" />
      </Button>
    </DeleteHandler>
  )
}