import { cn } from "@/utils/helpers";
import { HTMLAttributes, PropsWithChildren } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: JSX.Element;
}

export default function Card({ children, title, description, className, actions }: PropsWithChildren<CardProps>) {
  return (
    <div className="bg-background-secondary rounded-lg shadow-sm overflow-hidden border border-border">
      <div className="bg-background-secondary py-2 px-5 border-b border-border flex items-center gap-5">
        <div className="flex flex-col">
          <h3 className="font-archivo font-medium text-foreground/80 text-xl">{title}</h3>
          {description && <p className="font-archivo font-medium text-foreground/60 text-sm mt-[1px]">{description}</p>}
        </div>

        <div className="ml-auto">
          {actions}
        </div>
      </div>
      <div className={cn("bg-background p-5", className)}>
        {children}
      </div>
    </div>
  )
}