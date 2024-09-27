import { cn } from "@/utils/helpers";
import { PropsWithChildren } from "react";

export default function Badge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <span className={cn("rounded-md bg-primary text-background text-xs flex items-center justify-center py-1 px-2 h-max", className)}>
      {children}
    </span>
  )
}