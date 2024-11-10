"use client";

import { cn } from "@/utils/helpers";
import { createContext, CSSProperties, Dispatch, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, SetStateAction, useCallback, useContext, useImperativeHandle, useMemo, useState } from "react";
import Portal from "../shared/portal";
import { usePopper } from "react-popper";

interface PopupContextState {
  open: boolean;
  togglePopup: () => void;
  setReferenceElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
  setPopperElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
  styles: {
    [key: string]: CSSProperties;
  };
  attributes: {
    [key: string]: {
        [key: string]: string;
    } | undefined;
  }
}

const PopupContext = createContext<PopupContextState | null>(null);

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  comRef?: ForwardedRef<{ toggle: () => void; }>
}

export default function Popup({ children, className, comRef }: PropsWithChildren<PopupProps>) {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const modifiers = useMemo(
    () => [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
    [open]
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers,
    placement: "bottom-end"
  });
  const togglePopup = useCallback(() => {
    setOpen(value => !value);
  }, []);

  useImperativeHandle(comRef, () => ({
    toggle: togglePopup
  }))

  return (
    <PopupContext.Provider value={{
      open,
      togglePopup,
      setReferenceElement,
      setPopperElement,
      styles,
      attributes
    }}>
      <div className={cn("flex flex-col", className)}>
        {children}
      </div>
    </PopupContext.Provider>
  )
}

export function usePopup() {
  const res = useContext(PopupContext);
  if (!res) throw new Error("Component needs to be wrapped with `Popup`");
  return res;
}

interface PopupTriggerProps {}

Popup.Trigger = ({ children }: PropsWithChildren<PopupTriggerProps>) => {
  const { setReferenceElement, togglePopup } = usePopup();

  return (
    <div className="w-max h-max" ref={setReferenceElement} onClick={togglePopup}>
      {children}
    </div>
  )
}

interface PopupContentProps {
  className?: string;
}

Popup.Content = ({ children, className }: PropsWithChildren<PopupContentProps>) => {
  const { styles, attributes, setPopperElement, open } = usePopup();

  if (!open) return;
  return (
    <Portal>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className={cn("bg-background p-3 rounded-md shadow-sm border border-border", className)}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
