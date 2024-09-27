"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useId, useState } from "react"
import CheckboxItem from "./checkbox-item";

interface CheckboxProps {
  type?: "radio" | "checkbox";
  identifier?: string;
  className?: string;
  renderItem?: (args: {
    title: string;
    metadata?: Record<string, unknown>;
    isChecked?: boolean;
  }) => JSX.Element;
  onChange?: (args: { item: string, checked: boolean }) => void;
  checked?: string[]
}

interface CheckboxCtxProps extends CheckboxProps {
  toggleCheckbox: (key: string, checked: boolean) => void;
  isChecked: (key: string) => boolean;
}

const CheckboxCtx = createContext<CheckboxCtxProps | null>(null);

export default function Checkbox({ children, renderItem, className, onChange, type = "checkbox", identifier: uniqueIdentifier, checked }: PropsWithChildren<CheckboxProps>) {
  const id = useId();
  const identifier = uniqueIdentifier || id;
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheckbox = useCallback((key: string, checked: boolean) => {
    onChange?.({
      item: key,
      checked
    });
    setCheckedItems(values => {
      return type === 'radio' ? ({
        ...Object.keys(values).reduce((acc, val) => {
          acc[val] = false;
          return acc;
        }, values),
        [key]: checked
      }) : ({
        ...values,
        [key]: checked
      })
    });
  }, [type]);
  const isChecked = useCallback((key: string) => {
    return checkedItems[key] || false;
  }, [checkedItems]);

  return (
    <CheckboxCtx.Provider value={{
      renderItem,
      toggleCheckbox,
      isChecked,
      type,
      identifier,
      checked
    }}>
      <div className={className}>
        {children}
      </div>
    </CheckboxCtx.Provider>
  )
}

Checkbox.Item = CheckboxItem;

export function useCheckbox() {
  const res = useContext(CheckboxCtx);
  if (!res) throw new Error("Component needs to wrapped with Checkbox");
  return res;
}