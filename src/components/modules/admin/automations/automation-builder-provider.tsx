import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react"

interface IAutomationElement {
  triggerForm: () => Promise<boolean>;
}

interface IAutomationBuilderState {
  addFlowElement: (id: string, element: IAutomationElement) => void;
  isValidBuilder: () => Promise<boolean>;
}

const AutomationBuilderCtx = createContext<IAutomationBuilderState | null>(null);

export default function AutomationBuilderProvider({ children }: PropsWithChildren) {
  const [elements, setElements] = useState<Record<string, IAutomationElement>>({});

  const addFlowElement = useCallback((id: string, element: IAutomationElement) => {
    setElements(values => ({
      ...values,
      [id]: element
    }))
  }, [])
  const isValidBuilder = useCallback(async () => {
    const promises = await Promise.all(
      Object.values(elements).map(item => item.triggerForm())
    );
    return !promises.some(pro => pro === false);
  }, [elements])
  return (
    <AutomationBuilderCtx.Provider value={{
      addFlowElement,
      isValidBuilder
    }}>
      {children}
    </AutomationBuilderCtx.Provider>
  )
}

export function useAutomationBuilder() {
  const res = useContext(AutomationBuilderCtx);
  if (!res) throw new Error("Component needs to be wrapped within AutomationBuilderProvider");
  return res;
}