import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react";

export default function DragOverlayWrapper() {
  const [activeNode, setActiveNode] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setActiveNode(event.active);
    },
    onDragCancel: () => setActiveNode(null),
    onDragEnd: () => setActiveNode(null),
  })

  if (!activeNode) return null;
  return (
    <DragOverlay>
      {activeNode?.data?.current?.dragOverlay}
    </DragOverlay>
  )
}