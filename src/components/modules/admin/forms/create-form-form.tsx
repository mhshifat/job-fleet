"use client";

import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import useCreateFormMutation from "@/domain/form/use-create-form-mutation";
import { createFormFormSchema } from "@/domain/form/validators";

interface CreateFormFormProps {
  onSuccess: () => void;
}

export default function CreateFormForm({ onSuccess }: CreateFormFormProps) {
  const createForm = useCreateFormMutation();

  return (
    <FormHandler
      defaultValues={{
        title: "",
      }}
      onCreate={async (values) => {
        await createForm.mutateAsync({
          ...values,
          status: "PUBLISHED",
          records: {},
          fields: "",
        });
        onSuccess?.();
      }}
      onUpdate={() => Promise.resolve()}
      onComplete={onSuccess}
      schema={createFormFormSchema}
      renderSubmitBtnText={() => <>Create</>}
    >
      {({ getError, getValue, onFocus, setValue }) => (
        <div className="flex flex-col mt-5 gap-3">
          <Label title="Email" error={getError("title")}>
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