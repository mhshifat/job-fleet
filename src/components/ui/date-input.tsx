"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Portal from "../shared/portal";
import { usePopper } from "react-popper";
import { ModifierPhases, State } from "@popperjs/core";
import { cn } from "@/utils/helpers";
import DatePicker from "./date-picker";
import { formatISODate } from "@/utils/date";

interface ISelected {
  start: Date;
  end: Date;
}

interface DateContextState {
  updateValue: (value: ISelected) => void;
}

const DateContext = createContext<DateContextState | null>(null);

interface DateProps {
  placeholder?: string;
  disabled?: boolean;
  value?: ISelected;
  onChange?: (value: ISelected) => void;
}

export default function DateInput({ placeholder, onChange, disabled, value }: PropsWithChildren<DateProps>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ISelected | null>(null);
  
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const modifiers = useMemo(() => [
    { name: 'arrow', options: { element: arrowElement } },
    {
        name: "sameWidth",
        enabled: true,
        fn: ({ state }: { state: State }) => {
          // state.styles.popper.width = `${state.rects.reference.width}px`;
          state.styles.popper.width = `320px`;
        },
        phase: "beforeWrite" as ModifierPhases,
        requires: ["computeStyles"],
    },
    {
      name: 'offset',
      options: {
        offset: [0, 10],
      },
    },
  ], [open]);
  const { styles, attributes } = usePopper
  (referenceElement, popperElement, {
    modifiers: modifiers,
    placement: "bottom-end"
  });

  const updateValue = useCallback((value: ISelected) => {
    const newVal = value;
    setSelected(newVal);
    onChange?.(newVal);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!value) return;
    setSelected(value);
  }, [value])
  return (
    <DateContext.Provider value={{ updateValue }}>
      <div role="button" ref={setReferenceElement} onClick={() => !disabled && setOpen(value => !value)}>
        <DateInput.Placeholder key={JSON.stringify(selected)} disabled={disabled} value={selected ? formatISODate(new Date(selected.end), "do, MMMM yyyy") || "" : ""} placeholder={placeholder || "Select Date"} />
      </div>
      
      <Portal>
        {open && <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-50">
          <div ref={setArrowElement} style={styles.arrow} className="hidden absolute top-0 left-0 -z-50" />
          <div className="w-full h-auto bg-background p-2 shadow-sm rounded-md border border-border">
            <DatePicker
              onChange={(date) => updateValue({ start: date, end: date })}
            />
          </div>
        </div>}
      </Portal>
    </DateContext.Provider>
  )
}

export function useSelect() {
  const res = useContext(DateContext);
  if (!res) throw new Error("Component needs to be wrapped with `Select`");
  return res;
}

interface SelectPlaceholderProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

DateInput.Placeholder = ({ placeholder, value, disabled }: SelectPlaceholderProps) => {
  return (
    <div className={cn("cursor-pointer flex items-center border border-border h-[var(--size)] rounded-md overflow-hidden transition py-2 px-3 font-medium font-geist text-sm focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_hsl(var(--primary))]")}>
      <input readOnly type="text" disabled={disabled} className="cursor-pointer bg-transparent border-none outline-none shadow-none w-full h-full inline-flex focus-visible:border-none focus-visible:outline-none focus-visible:shadow-none placeholder:text-foreground/60 placeholder:font-medium placeholder:font-geist placeholder:text-sm" defaultValue={value} placeholder={placeholder} />
    </div>
  )
}

