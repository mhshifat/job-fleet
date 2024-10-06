import DateInput from "@/components/ui/date-input";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DRAGGABLE_ITEM_TYPES } from "@/utils/constants";

interface FormElementPreviewProps {
  readonly?: boolean;
  label?: string;
  element?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export default function FormElementPreview({ label, element, readonly, error, onChange }: FormElementPreviewProps) {
  return (
    <Label title={(label || "Title") as string} error={error}>
      {element === DRAGGABLE_ITEM_TYPES.TEXT_INPUT ?
        <Input disabled={readonly} onChange={({ target }) => onChange?.(target.value)} /> :
        element === DRAGGABLE_ITEM_TYPES.NUMBER_INPUT ?
        <Input disabled={readonly} type="number" onChange={({ target }) => onChange?.(target.value)} /> :
        element === DRAGGABLE_ITEM_TYPES.TEXTAREA ?
        <Textarea disabled={readonly} onChange={({ target }) => onChange?.(target.value)} /> :
        element === DRAGGABLE_ITEM_TYPES.DATE_INPUT ?
        <DateInput disabled={readonly} onChange={({ end }) => onChange?.(end.toISOString())} /> :
        element === DRAGGABLE_ITEM_TYPES.SELECT ?
        <Select disabled={readonly} onChange={(values) => onChange?.(values[0].value)} /> :
      null}
    </Label>
  )
}