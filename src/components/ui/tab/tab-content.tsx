import { PropsWithChildren } from "react";
import { useTab } from ".";

export default function TabContent({ children, className, identifier }: PropsWithChildren<{ className?: string; identifier?: string; }>) {
  const { isSelected } = useTab();

  if (!isSelected(identifier!)) return;
  return (
    <div className={className}>
      {children}
    </div>
  )
}