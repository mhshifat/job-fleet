import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react"

export interface IFormElement {
  title: string;
  currentPosition?: number;
  updatedPosition?: number;
  properties?: Record<string, unknown>;
}

interface IFormBuilderState {
  formElements: IFormElement[];
  addFormElement: (el: IFormElement) => void;
  deleteFormElement: (index: number) => void;
  addFormElementAt: (idx: number, el: IFormElement) => void;
  removeAndAddFormElementAt: (rmIdx: number, idx: number, el: IFormElement) => void;
  selectFormElement: (idx: number | null) => void;
  isSelectedFormElement: (index: number) => boolean;
  getSelectedFormElement: () => IFormElement | undefined;
  selectedFormElement: number | null;
  updateSelectedFormElementProperty: (key: string, value: unknown) => void;
  getSelectedFormElementProperty: (key: string) => unknown;
  togglePreviewForm: () => void;
  previewForm: boolean;
}

const FormBuilderCtx = createContext<IFormBuilderState | null>(null);

export default function FormBuilderProvider({ children }: PropsWithChildren) {
  const [formElements, setFormElements] = useState<IFormElement[]>([]);
  const [selectedFormElement, setSelectedFormElement] = useState<number | null>(null);
  const [previewForm, setPreviewForm] = useState(false);

  const addFormElement = useCallback((el: IFormElement) => {
    setFormElements(values => [...structuredClone(values), el])
  }, []);
  const deleteFormElement = useCallback((index: number) => {
    setFormElements(values => structuredClone(values.filter((_, itemIdx) => itemIdx !== index)))
  }, []);
  const addFormElementAt = useCallback((idx: number, el: IFormElement) => {
    setFormElements(values => {
      const newValues = structuredClone(values);
      newValues.splice(idx, 0, el);
      return newValues;
    });
  }, []);
  const removeAndAddFormElementAt = useCallback((rmIdx: number, idx: number, el: IFormElement) => {
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
  const togglePreviewForm = useCallback(() => {
    setPreviewForm(value => !value);
  }, []);

  return (
    <FormBuilderCtx.Provider value={{
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
      getSelectedFormElementProperty,
      togglePreviewForm,
      previewForm
    }}>
      {children}
    </FormBuilderCtx.Provider>
  )
}

export function useFormBuilder() {
  const res = useContext(FormBuilderCtx);
  if (!res) throw new Error("Component needs to be wrapped within FormBuilderProvider");
  return res;
}