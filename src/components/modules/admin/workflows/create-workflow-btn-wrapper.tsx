"use client";

import { useDialog } from "@/components/providers/dialog";
import Button from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateWorkflowForm from "./create-workflow-form";

export default function CreateWorkflowBtnWrapper() {
  const { openDialog, closeDialog } = useDialog();

  return (
    <Button size="sm" onClick={() => openDialog({
      title: "Create new workflow",
      description: "Please fill in the information below to create a new workflow",
      content: <CreateWorkflowForm onSuccess={closeDialog} />
    })}>
      <PlusIcon className="size-4" />

      <span>Create Workflow</span>
    </Button>
  )
}