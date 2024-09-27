"use client";

import { createContext, FormEvent, PropsWithChildren, useContext } from "react";

interface FormContextState {}

const FormContext = createContext<FormContextState | null>(null);

interface FormProps {
  disabled?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit, disabled }: PropsWithChildren<FormProps>) {
  return (
    <FormContext.Provider value={{}}>
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          {children}
        </fieldset>
      </form>
    </FormContext.Provider>
  )
}

export function useForm() {
  const res = useContext(FormContext);
  if (!res) throw new Error("Component needs to be wrapped with `Form`");
  return res;
}
