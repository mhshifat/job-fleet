"use client";

import { createContext, PropsWithChildren, SetStateAction, useCallback, useContext, useMemo, useState } from "react";
import Portal from "../shared/portal";
import { usePopper } from "react-popper";
import { ModifierPhases, State } from "@popperjs/core";
import { cn } from "@/utils/helpers";
import DatePicker from "./date-picker";

interface ISelected {
  value: string;
  content: string;
}

interface DateContextState {
  updateValue: (value: ISelected) => void;
}

const DateContext = createContext<DateContextState | null>(null);

interface DateProps {
  placeholder?: string;
}

export default function DateInput({ children, placeholder }: PropsWithChildren<DateProps>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ISelected[]>([]);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const modifiers = useMemo(() => [
    { name: 'arrow', options: { element: arrowElement } },
    {
        name: "sameWidth",
        enabled: true,
        fn: ({ state }: { state: State }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
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
    setSelected([value]);
    setOpen(false);
  }, []);

  return (
    <DateContext.Provider value={{ updateValue }}>
      <div role="button" ref={setReferenceElement} onClick={() => setOpen(value => !value)}>
        <DateInput.Placeholder placeholder={selected?.[0]?.content || placeholder || "Select Date"} />
      </div>
      
      <Portal>
        {open && <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-50">
          <div ref={setArrowElement} style={styles.arrow} className="hidden absolute top-0 left-0 -z-50" />
          <div className="w-full h-auto bg-background p-2 shadow-sm rounded-md border border-border">
            <DatePicker />
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
}

DateInput.Placeholder = ({ placeholder }: SelectPlaceholderProps) => {
  return (
    <div className={cn("cursor-pointer flex items-center border border-border h-[var(--size)] rounded-md overflow-hidden transition py-2 px-3 font-medium font-geist text-sm focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_hsl(var(--primary))]")}>
      <input readOnly type="text" className="cursor-pointer bg-transparent border-none outline-none shadow-none w-full h-full inline-flex focus-visible:border-none focus-visible:outline-none focus-visible:shadow-none placeholder:text-foreground/60 placeholder:font-medium placeholder:font-geist placeholder:text-sm" placeholder={placeholder} />
    </div>
  )
}

