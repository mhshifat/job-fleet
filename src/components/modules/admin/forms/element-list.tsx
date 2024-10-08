import { cn } from "@/utils/helpers";
import DraggableElement from "../../../shared/draggable-element";
import { DRAGGABLE_ELEMENT_LIST } from "@/utils/constants";
import { useFormBuilder } from "./form-builder-provider";
import Button from "../../../ui/button";
import { XIcon } from "lucide-react";
import Label from "../../../ui/label";
import Input from "../../../ui/input";
import Switch from "../../../ui/switch";

export default function ElementList() {
  const { formElements, selectedFormElement, getSelectedFormElement, selectFormElement, updateSelectedFormElementProperty, getSelectedFormElementProperty } = useFormBuilder();
  const element = getSelectedFormElement();

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
        </form>
      </div>
    </div>
  )
  return (
    <div className="py-3 px-5 w-full grid grid-cols-2 gap-5">
      {DRAGGABLE_ELEMENT_LIST.map(({icon: Icon, ...item}) => (
        <DraggableElement data={{
          ...item,
          isSidebarEl: true
        }} id={item.title} key={item.title}>
          {({ isDragging }) => (
            <div className={cn("flex flex-col gap-2 justify-center items-center border border-border rounded-md py-5 px-3 cursor-pointer transition hover:bg-foreground/10", {
              "bg-foreground/10 border-foreground": isDragging
            })}>
              <Icon className="size-6" />

              <span className="text-center text-sm font-geist font-semibold">{item.title}</span>
            </div>
          )}
        </DraggableElement>
      ))}
    </div>
  )
}