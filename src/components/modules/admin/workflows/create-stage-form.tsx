"use client";

import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { createStageFormSchema } from "@/domain/stage/validators";
import useCreateStageMutation from "@/domain/workflow/use-create-stage-mutation";

interface CreateStageFormProps {
  onSuccess: () => void;
  workflowId: string;
}

export default function CreateStageForm({ onSuccess, workflowId }: CreateStageFormProps) {
  const createStage = useCreateStageMutation();

  return (
    <FormHandler
      defaultValues={{
        title: "",
        workflowId
      }}
      onCreate={async (values) => {
        await createStage.mutateAsync({
          ...values,
        });
        onSuccess?.();
      }}
      onUpdate={() => Promise.resolve()}
      onComplete={onSuccess}
      schema={createStageFormSchema}
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