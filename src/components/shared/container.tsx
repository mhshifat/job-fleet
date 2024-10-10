import { cn } from "@/utils/helpers";
import { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

export default function Container({ children, className }: PropsWithChildren<ContainerProps>) {
  return (
    <div className={cn("max-w-[1023px] mx-auto", className)}>
      {children}
    </div>
  )
}