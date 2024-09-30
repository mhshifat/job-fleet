import { PropsWithChildren } from "react";
import { useDrag } from 'react-dnd'

interface DraggableElementProps {
  type: string;
  data: unknown;
}

export default function DraggableElement({ children, type, data }: PropsWithChildren<DraggableElementProps>) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { data: {...data as unknown as {}, type} },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      })
    }),
    []
  )

  return drag(
    <div style={{
      opacity: isDragging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}>
      {children}
    </div>
  )
}