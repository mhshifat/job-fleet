import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react"

interface IApplyFormElement {
  title: string;
  currentPosition?: number;
  updatedPosition?: number;
}

interface IApplyFormBuilderState {
  formElements: IApplyFormElement[];
  addFormElement: (el: IApplyFormElement) => void;
  deleteFormElement: (index: number) => void;
  addFormElementAt: (idx: number, el: IApplyFormElement) => void;
  removeAndAddFormElementAt: (rmIdx: number, idx: number, el: IApplyFormElement) => void;
}

const ApplyFormBuilderCtx = createContext<IApplyFormBuilderState | null>(null);

export default function ApplyFormBuilderProvider({ children }: PropsWithChildren) {
  const [formElements, setFormElements] = useState<IApplyFormElement[]>([]);

  const addFormElement = useCallback((el: IApplyFormElement) => {
    setFormElements(values => [...values, el])
  }, []);
  const deleteFormElement = useCallback((index: number) => {
    setFormElements(values => values.filter((_, itemIdx) => itemIdx !== index))
  }, []);
  const addFormElementAt = useCallback((idx: number, el: IApplyFormElement) => {
    setFormElements(values => {
      const newValues = values;
      newValues.splice(idx, 0, el);
      return newValues;
    });
  }, []);
  const removeAndAddFormElementAt = useCallback((rmIdx: number, idx: number, el: IApplyFormElement) => {
    setFormElements(values => {
      const newValues = values;
      newValues.splice(rmIdx, 1);
      newValues.splice(idx, 0, el);
      return newValues;
    });
  }, []);

  return (
    <ApplyFormBuilderCtx.Provider value={{
      formElements,
      addFormElement,
      addFormElementAt,
      deleteFormElement,
      removeAndAddFormElementAt
    }}>
      {children}
    </ApplyFormBuilderCtx.Provider>
  )
}

export function useJobApplyFormBuilder() {
  const res = useContext(ApplyFormBuilderCtx);
  if (!res) throw new Error("Component needs to be wrapped within ApplyFormBuilderProvider");
  return res;
}