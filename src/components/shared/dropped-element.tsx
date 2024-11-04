import { cn } from "@/utils/helpers";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";

interface DroppedElementProps {
  className?: string;
  onDrop?: (data: { active: unknown; over: unknown; }) => void;
  children: (args: {
    isOver: boolean;
  }) => JSX.Element;
}

export default function DroppedElement({ children, className, onDrop }: DroppedElementProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'job-form-elements-droppable',
  });

  useDndMonitor({
    onDragEnd(event) {
      if (!event.active || !event.over) return;
      onDrop?.({
        active: event.active.data.current?.draggedItemData,
        over: event.over.data.current,
      });
    },
  })

  return (
    <div ref={setNodeRef} className={cn("w-full max-w-[600px] bg-background border border-border rounded-md mx-auto p-3 shadow-md h-full", className, {
      "border-foreground/20": isOver
    })}>
      {children({
        isOver
      })}
    </div>
  )
}