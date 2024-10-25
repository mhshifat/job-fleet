import { useFormBuilder } from "./form-builder-provider";
import Button from "../../../ui/button";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import Label from "../../../ui/label";
import Input from "../../../ui/input";
import Switch from "../../../ui/switch";
import { useFieldArray, useForm } from "react-hook-form";

export default function ElementConfig() {
  const { formElements, selectedFormElement, getSelectedFormElement, selectFormElement, updateSelectedFormElementProperty, getSelectedFormElementProperty } = useFormBuilder();
  const element = getSelectedFormElement();
  const form = useForm({
    defaultValues: {
      options: (element?.properties?.options as { title: string; value: string }[]) || [{ title: "", value: "" }]
    },
  });
  const fieldArr = useFieldArray({
    name: "options",
    control: form.control
  });

  function updateElementData() {
    updateSelectedFormElementProperty("options", form.watch().options);
  }
  if (selectedFormElement !== null && !!formElements.length) return (
    <div className="w-full flex flex-col h-full" key={"ElementList_" + selectedFormElement}>
      <div className="flex items-center justify-between gap-5 border-b border-border py-3 px-5 text-foreground/80">
        <h3 className="text-base font-bold font-geist-mono capitalize">{element?.title}</h3>
        <Button variant="ghost" size="max" onClick={() => selectFormElement(null)}>
          <XIcon className="size-5" />
        </Button>
      </div>

      <div className="py-3 px-5 flex-1">
        <form className="flex flex-col gap-3">
          <Label title="Label">
            <Input
              placeholder="Ex: Email"
              defaultValue={getSelectedFormElementProperty("label") as string}
              onChange={({ target }) => updateSelectedFormElementProperty("label", target.value)}
            />
          </Label>

          <Label title="Field Name">
            <Input
              placeholder="Ex: email"
              defaultValue={getSelectedFormElementProperty("fieldName") as string}
              onChange={({ target }) => updateSelectedFormElementProperty("fieldName", target.value)}
            />
          </Label>

          <Label title="Required" className="flex-row items-center justify-between gap-5">
            <Switch
              defaultChecked={getSelectedFormElementProperty("isRequired") as boolean}
              onChange={({ target }) => updateSelectedFormElementProperty("isRequired", target.checked)}
            />
          </Label>
          <Label title="Unique" className="flex-row items-center justify-between gap-5">
            <Switch
              defaultChecked={getSelectedFormElementProperty("isUnique") as boolean}
              onChange={({ target }) => updateSelectedFormElementProperty("isUnique", target.checked)}
            />
          </Label>

          {element?.title === "Select" && (
            <Label title="Options">
              {fieldArr.fields.map((item, idx) => (
                <div key={item.id} className="flex items-start gap-2">
                  <Input
                    placeholder="Title"
                    defaultValue={item.value}
                    onChange={({ target }) => {
                      form.setValue(`options.${idx}.title`, target.value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      });
                      updateElementData();
                    }}
                  />

                  <Input
                    placeholder="Value"
                    defaultValue={item.value}
                    onChange={({ target }) => {
                      form.setValue(`options.${idx}.value`, target.value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      });
                      updateElementData();
                    }}
                  />

                  {idx === (fieldArr.fields.length - 1) && <Button size="icon" className="shrink-0" onClick={() => fieldArr.append({ title: "", value: "" })}>
                    <PlusIcon />
                  </Button>}
                  {(fieldArr.fields.length > 1 && idx !== (fieldArr.fields.length - 1)) && <Button size="icon" variant="secondary-outlined" className="shrink-0" onClick={() => fieldArr.remove(idx)}>
                    <MinusIcon />
                  </Button>}
                </div>
              ))}
            </Label>
          )}
        </form>
      </div>
    </div>
  )
  return null;
}