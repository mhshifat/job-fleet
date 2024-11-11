"use client";

import { useDialog } from "@/components/providers/dialog";
import Button from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateAutomationForm from "./create-automation-form";

export default function CreateAutomationBtnWrapper() {
  const { openDialog, closeDialog } = useDialog();

  return (
    <Button size="sm" onClick={() => openDialog({
      title: "Create new automation",
      description: "Please fill in the information below to create a new automation",
      content: <CreateAutomationForm onSuccess={closeDialog} />
    })}>
      <PlusIcon className="size-4" />

      <span>Create Automation</span>
    </Button>
  )
}