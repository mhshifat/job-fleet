import { PropsWithChildren, useEffect } from "react";
import { useTab } from ".";

export default function TabTrigger({ children, identifier }: PropsWithChildren<{ identifier?: string }>) {
  const { setTabContents } = useTab();
  
  useEffect(() => {
    if (!identifier) return;
    setTabContents(values => ({
      ...values,
      [identifier]: {
        title: identifier,
        content: children,
      }
    }))
  }, [identifier])
  
  return null;
}