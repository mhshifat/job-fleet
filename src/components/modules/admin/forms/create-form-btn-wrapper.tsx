"use client";

import { useDialog } from "@/components/providers/dialog";
import Button from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateFormForm from "./create-form-form";

export default function CreateFormBtnWrapper() {
  const { openDialog, closeDialog } = useDialog();

  return (
    <Button size="sm" onClick={() => openDialog({
      title: "Create new form",
      description: "Please fill in the information below to create a new form",
      content: <CreateFormForm onSuccess={closeDialog} />
    })}>
      <PlusIcon className="size-4" />

      <span>Create Form</span>
    </Button>
  )
}