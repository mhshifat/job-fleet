import { DRAGGABLE_ITEM_TYPES } from "@/utils/constants";
import { cn } from "@/utils/helpers";
import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";

interface DroppedElementProps {
  className?: string;
  onDrop?: (data: unknown) => void;
}

export default function DroppedElement({ children, className, onDrop }: PropsWithChildren<DroppedElementProps>) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(DRAGGABLE_ITEM_TYPES),
    drop: (data) => onDrop?.(data),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), []);

  return drop(
    <div className={cn("w-full max-w-[600px] bg-background border border-border rounded-md mx-auto py-3 px-5 shadow-sm h-full", className, {
      "border-primary": isOver
    })}>
      {children}
    </div>
  )
}