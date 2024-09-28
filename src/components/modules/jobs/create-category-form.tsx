import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { categoryService } from "@/infra/category/service";
import { z } from "zod";

export default function CreateCategoryForm({ onComplete }: { onComplete: () => void }) {
  return (
    <FormHandler
      defaultValues={{
        name: ""
      }}
      schema={z.object({
        name: z.string().min(1)
      })}
      onCreate={async (values) => {
        await categoryService.create({
          name: values.name
        })
      }}
      onUpdate={() => Promise.resolve()}
      onComplete={onComplete}
      renderSubmitBtnText={() => <>Create Category</>}
    >
      {({ getValue, setValue, getError, onFocus }) => (
        <div className="w-full flex flex-col">
          <Label title="Name" className="flex-1" error={getError("name")}>
            <Input
              value={getValue("name")}
              placeholder="Ex: Development"
              onFocus={() => onFocus("name")}
              onChange={({ target }) => setValue("name", target.value)}
            />
          </Label>
        </div>
      )}
    </FormHandler>
  )
}