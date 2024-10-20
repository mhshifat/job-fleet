import DateInput from "@/components/ui/date-input";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DRAGGABLE_ITEM_TYPES } from "@/utils/constants";
import { IFormElement } from "./form-builder-provider";
import Uploader from "@/components/ui/uploader";

interface FormElementPreviewProps {
  readonly?: boolean;
  label?: string;
  element?: IFormElement;
  error?: string;
  onChange?: (value: string) => void;
}

export default function FormElementPreview({ label, element, readonly, error, onChange }: FormElementPreviewProps) {
  return (
    <Label title={(label || "Title") as string} error={error} preventDefault={element?.title === DRAGGABLE_ITEM_TYPES.FILE}>
      {element?.title === DRAGGABLE_ITEM_TYPES.TEXT_INPUT ?
        <Input disabled={readonly} onChange={({ target }) => onChange?.(target.value)} /> :
        element?.title === DRAGGABLE_ITEM_TYPES.FILE ?
        <Uploader type="single" disabled={readonly} onChange={([file]) => onChange?.(file.url || "")} /> :
        element?.title === DRAGGABLE_ITEM_TYPES.NUMBER_INPUT ?
        <Input disabled={readonly} type="number" onChange={({ target }) => onChange?.(target.value)} /> :
        element?.title === DRAGGABLE_ITEM_TYPES.TEXTAREA ?
        <Textarea disabled={readonly} onChange={({ target }) => onChange?.(target.value)} /> :
        element?.title === DRAGGABLE_ITEM_TYPES.DATE_INPUT ?
        <DateInput placeholder="sdasdasdasd" disabled={readonly} onChange={(v) => onChange?.(v.end.toISOString())} /> :
        element?.title === DRAGGABLE_ITEM_TYPES.SELECT ?
        <Select disabled={readonly} onChange={(values) => onChange?.(values[0].value)}>
          {(element?.properties?.options as { title: string; value: string }[])?.map(item => (
            <Select.Option key={item.title} value={item.value}>{item.title}</Select.Option>
          ))}
        </Select> :
      null}
    </Label>
  )
}