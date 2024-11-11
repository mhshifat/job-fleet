"use client";

import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import useCreateAutomationMutation from "@/domain/automation/use-create-automation-mutation";
import { createAutomationFormSchema } from "@/domain/automation/validators";

interface CreateAutomationFormProps {
  onSuccess: () => void;
}

export default function CreateAutomationForm({ onSuccess }: CreateAutomationFormProps) {
  const createAutomation = useCreateAutomationMutation();

  return (
    <FormHandler
      defaultValues={{
        title: "",
      }}
      onCreate={async (values) => {
        await createAutomation.mutateAsync({
          ...values,
        });
        onSuccess?.();
      }}
      onUpdate={() => Promise.resolve()}
      onComplete={onSuccess}
      schema={createAutomationFormSchema}
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