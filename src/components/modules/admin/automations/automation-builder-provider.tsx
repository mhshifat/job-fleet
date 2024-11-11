import { createContext, PropsWithChildren, useContext } from "react"

interface IAutomationBuilderState {}

const AutomationBuilderCtx = createContext<IAutomationBuilderState | null>(null);

export default function AutomationBuilderProvider({ children }: PropsWithChildren) {
  return (
    <AutomationBuilderCtx.Provider value={{
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