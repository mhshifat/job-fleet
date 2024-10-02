import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react"

interface IApplyFormElement {
  title: string;
  currentPosition?: number;
  updatedPosition?: number;
  properties?: Record<string, unknown>;
}

interface IApplyFormBuilderState {
  formElements: IApplyFormElement[];
  addFormElement: (el: IApplyFormElement) => void;
  deleteFormElement: (index: number) => void;
  addFormElementAt: (idx: number, el: IApplyFormElement) => void;
  removeAndAddFormElementAt: (rmIdx: number, idx: number, el: IApplyFormElement) => void;
  selectFormElement: (idx: number | null) => void;
  isSelectedFormElement: (index: number) => boolean;
  getSelectedFormElement: () => IApplyFormElement | undefined;
  selectedFormElement: number | null;
  updateSelectedFormElementProperty: (key: string, value: unknown) => void;
  getSelectedFormElementProperty: (key: string) => unknown;
}

const ApplyFormBuilderCtx = createContext<IApplyFormBuilderState | null>(null);

export default function ApplyFormBuilderProvider({ children }: PropsWithChildren) {
  const [formElements, setFormElements] = useState<IApplyFormElement[]>([]);
  const [selectedFormElement, setSelectedFormElement] = useState<number | null>(null);

  const addFormElement = useCallback((el: IApplyFormElement) => {
    setFormElements(values => [...structuredClone(values), el])
  }, []);
  const deleteFormElement = useCallback((index: number) => {
    setFormElements(values => structuredClone(values.filter((_, itemIdx) => itemIdx !== index)))
  }, []);
  const addFormElementAt = useCallback((idx: number, el: IApplyFormElement) => {
    setFormElements(values => {
      const newValues = structuredClone(values);
      newValues.splice(idx, 0, el);
      return newValues;
    });
  }, []);
  const removeAndAddFormElementAt = useCallback((rmIdx: number, idx: number, el: IApplyFormElement) => {
    setFormElements(values => {
      const newValues = structuredClone(values);
      newValues.splice(rmIdx, 1);
      newValues.splice(idx, 0, el);
      return newValues;
    });
  }, []);
  const selectFormElement = useCallback((idx: number | null) => {
    setSelectedFormElement(idx);
  }, []);
  const isSelectedFormElement = useCallback((index: number) => {
    return selectedFormElement === index;
  }, [selectedFormElement]);
  const getSelectedFormElement = useCallback(() => {
    return formElements.find((_, idx) => idx === selectedFormElement);
  }, [selectedFormElement, formElements]);
  const updateSelectedFormElementProperty = useCallback((key: string, value: unknown) => {
    setFormElements(values => values.map((_, idx) => idx === selectedFormElement ? ({
      ..._,
      properties: {
        ..._?.properties || {},
        [key]: value
      }
    }) : _));
  }, [selectedFormElement]);
  const getSelectedFormElementProperty = useCallback((key: string) => {
    return formElements?.find((_, idx) => idx === selectedFormElement)?.properties?.[key];
  }, [selectedFormElement, formElements]);

  return (
    <ApplyFormBuilderCtx.Provider value={{
      formElements,
      addFormElement,
      addFormElementAt,
      deleteFormElement,
      removeAndAddFormElementAt,
      selectFormElement,
      isSelectedFormElement,
      getSelectedFormElement,
      selectedFormElement,
      updateSelectedFormElementProperty,
      getSelectedFormElementProperty
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