"use client";

import { cn } from "@/utils/helpers";
import { useCheckbox } from ".";

interface CheckboxItemProps {
  title: string;
  value: string;
  metadata?: Record<string, unknown>;
  className?: string;
  disabled?: boolean;
}

export default function CheckboxItem({ title, value, metadata, className, disabled }: CheckboxItemProps) {
  const { type, renderItem, isChecked, toggleCheckbox, identifier, checked } = useCheckbox();
  const checkedByDefault = checked?.some(item => value === item);
  
  return (
    <label className={cn("cursor-pointer", className, {
      "opacity-50": disabled
    })}>
      <input disabled={disabled} type={type} hidden name={identifier} value={value} checked={isChecked(value) || checkedByDefault || false} onChange={({ target }) => toggleCheckbox(value, target.checked)} />
      {renderItem?.({ title, metadata, value, isChecked: isChecked(value) || checkedByDefault }) || title}
    </label>
  )
}