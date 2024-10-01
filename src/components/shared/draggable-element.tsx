import { useDraggable } from "@dnd-kit/core";

interface DraggableElementProps {
  id: string;
  data: unknown;
  children: (args: {
    isDragging: boolean;
    transform: { x: number, y: number };
  }) => JSX.Element;
}

export default function DraggableElement({ children, id, data }: DraggableElementProps) {
  const {attributes, listeners, setNodeRef, isDragging, transform} = useDraggable({
    id,
    data: {
      draggedItemData: data,
      dragOverlay: children({
        isDragging: false,
        transform: { x: 0, y: 0 }
      })
    }
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children({
        isDragging,
        transform: { x: transform?.x || 0, y: transform?.y || 0 }
      })}
    </div>
  )
}