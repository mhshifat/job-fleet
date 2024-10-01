import { cn } from "@/utils/helpers";
import DraggableElement from "./draggable-element";
import { DRAGGABLE_ELEMENT_LIST } from "@/utils/constants";

export default function ElementList() {
  return (
    <div className="w-full grid grid-cols-2 gap-5">
      {DRAGGABLE_ELEMENT_LIST.map(({icon: Icon, ...item}) => (
        <DraggableElement data={{
          ...item,
          isSidebarEl: true
        }} id={item.title} key={item.title}>
          {({ isDragging }) => (
            <div className={cn("flex flex-col gap-2 justify-center items-center border border-border rounded-md py-5 px-3 cursor-pointer transition hover:bg-foreground/10", {
              "bg-foreground/10 border-foreground": isDragging
            })}>
              <Icon className="size-6" />

              <span className="text-center text-sm font-geist font-semibold">{item.title}</span>
            </div>
          )}
        </DraggableElement>
      ))}
    </div>
  )
}