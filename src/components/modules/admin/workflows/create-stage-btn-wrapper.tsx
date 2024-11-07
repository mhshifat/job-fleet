"use client";

import { useDialog } from "@/components/providers/dialog";
import Button from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateStageForm from "./create-stage-form";
import { useParams } from "next/navigation";

export default function CreateStageBtnWrapper() {
  const { id } = useParams();
  const { openDialog, closeDialog } = useDialog();

  return (
    <Button size="sm" onClick={() => openDialog({
      title: "Create new stage",
      description: "Please fill in the information below to create a new stage",
      content: <CreateStageForm workflowId={id as string} onSuccess={closeDialog} />
    })}>
      <PlusIcon className="size-4" />

      <span>Create Stage</span>
    </Button>
  )
}