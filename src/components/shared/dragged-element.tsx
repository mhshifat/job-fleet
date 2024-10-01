import { TrashIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import DraggableElement from "./draggable-element";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/utils/helpers";

interface DraggedElementProps { 
  onDelete: () => void; 
  metadata: Record<string, unknown>;
}

export default function DraggedElement({ children, onDelete, metadata }: PropsWithChildren<DraggedElementProps>) {
  const typedMetadata = metadata as { currentPosition: number };
  const topHalf = useDroppable({
    id: `JobApplyFormDraggedEl_Top_${typedMetadata?.currentPosition}`,
    data: {
      ...typedMetadata,
      isTop: true,
      isSidebarEl: false,
      isSortableEl: true,
    }
  });
  const bottomHalf = useDroppable({
    id: `JobApplyFormDraggedEl_Bottom_${typedMetadata?.currentPosition}`,
    data: {
      ...typedMetadata,
      isBottom: true,
      isSidebarEl: false,
      isSortableEl: true,
    }
  });

  return (
    <div className="w-full h-auto relative rounded-md overflow-hidden">
      <div ref={topHalf.setNodeRef} className={cn("absolute top-0 left-0 w-full h-[50%] bg-transparent z-50 before:content-[''] before:w-full before:h-2 before:top-0 before:absolute before:left-0 before:bg-primary/50 before:hidden pointer-events-none", {
        "before:flex": topHalf.isOver
      })} />
      <div ref={bottomHalf.setNodeRef} className={cn("absolute bottom-0 left-0 w-full h-[50%] bg-transparent z-50 before:content-[''] before:w-full before:h-2 before:bottom-0 before:absolute before:left-0 before:bg-primary/50 before:hidden pointer-events-none", {
        "before:flex": bottomHalf.isOver
      })} />
      <DraggableElement
        data={{
          ...metadata,
          isSidebarEl: false,
          isSortableEl: true,
        }}
        id={`JobApplyFormDraggedEl_${metadata?.currentPosition}`}
      >
        {({ transform, isDragging }) => isDragging ? <></> : (
          <div style={{
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }} className="group relative bg-background-secondary p-3 rounded-md border border-border overflow-hidden cursor-pointer">
            {children}
            <div className="absolute inset-0 w-full h-full bg-background-secondary/60 grid grid-cols-[1fr_auto] z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-sm font-geist font-semibold text-foreground/70">Click for properties or drag for move</p>
              </div>
              <button onClick={onDelete} className="border-none outline-none w-auto h-full bg-danger p-3 flex justify-center items-center text-background cursor-pointer">
                <TrashIcon className="size-5" />
              </button>
            </div>
          </div>
        )}
      </DraggableElement>
    </div>
  )
}