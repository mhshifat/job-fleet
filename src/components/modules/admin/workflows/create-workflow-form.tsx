"use client";

import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import useCreateWorkflowMutation from "@/domain/workflow/use-create-workflow-mutation";
import { createWorkflowFormSchema } from "@/domain/workflow/validators";

interface CreateWorkflowFormProps {
  onSuccess: () => void;
}

export default function CreateWorkflowForm({ onSuccess }: CreateWorkflowFormProps) {
  const createWorkflow = useCreateWorkflowMutation();

  return (
    <FormHandler
      defaultValues={{
        title: "",
      }}
      onCreate={async (values) => {
        await createWorkflow.mutateAsync({
          ...values,
        });
        onSuccess?.();
      }}
      onUpdate={() => Promise.resolve()}
      onComplete={onSuccess}
      schema={createWorkflowFormSchema}
      renderSubmitBtnText={() => <>Create</>}
    >
      {({ getError, getValue, onFocus, setValue }) => (
        <div className="flex flex-col gap-3">
          <Label title="Title" error={getError("title")}>
            <Input 
              value={getValue("title")}
              onFocus={() => onFocus("title")}
              onChange={({ target }) => setValue("title", target.value)}
            />
          </Label>
        </div>
      )}
    </FormHandler>
  )
}