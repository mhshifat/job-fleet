"use client";

import {DndContext, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';
import ElementList from "./element-list";
import DroppedElement from "../../shared/dropped-element";
import DragOverlayWrapper from '../../shared/drag-overlay-wrapper';
import React from 'react';
import DraggedElement from '../../shared/dragged-element';
import { useFormBuilder } from './form-builder-provider';
import { cn } from '@/utils/helpers';
import Button from '@/components/ui/button';
import { BookCheckIcon, FullscreenIcon } from 'lucide-react';
import FormPreview from './form-preview';
import FormElementPreview from './form-element-preview';
import { toast } from '@/utils/toast';

export default function FormBuilder() {
  const { formElements, addFormElement, deleteFormElement, removeAndAddFormElementAt, addFormElementAt, selectFormElement, isSelectedFormElement, togglePreviewForm, previewForm } = useFormBuilder();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(mouseSensor);

  console.log(formElements);
  return (
    <DndContext sensors={sensors}>
      <div className='border-b border-border py-3 px-5 flex justify-between items-center gap-5'>
        <h1 className='text-xl font-geist text-foreground font-normal capitalize'>Form</h1>
        {!previewForm && <Button disabled={!formElements.length} onClick={togglePreviewForm} className='w-max'>
          <FullscreenIcon className='size-4' />
          <span>Preview</span>
        </Button>}
        {previewForm && <Button onClick={() => {}} className='w-max'>
          <BookCheckIcon className='size-4' />
          <span>Publish</span>
        </Button>}
      </div>
      {!previewForm && (
        <div className="grid grid-cols-[1fr_320px] flex-1">
          <div className="border-r border-border py-10 px-5">
            <div className="h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
              <DroppedElement
                className="flex flex-col gap-3"
                onDrop={({ active, over }) => {
                  console.log({
                    active,
                    over
                  });
                  
                  const typedData = active as { title: string; currentPosition?: number; isSidebarEl: boolean; isSortableEl?: boolean }
                  const typedOverData = over as { isTop?: boolean; isBottom?: boolean; title: string; currentPosition?: number; updatedPosition?: number; isSidebarEl: boolean; isSortableEl?: boolean }
                  if (!typedOverData) addFormElement(typedData);
                  else if (typedData?.isSidebarEl) addFormElementAt(typedOverData.isTop ? typedOverData.currentPosition! : typedOverData.isBottom ? typedOverData.currentPosition! + 1 : 0, typedData);
                  else if (typedData?.isSortableEl) removeAndAddFormElementAt(typedData.currentPosition!, typedOverData.currentPosition!, typedData);
                }}
              >
                {({ isOver }) => (
                  <>
                    {isOver && !formElements.length && <div className="h-28 bg-foreground/10 rounded-md" />}
                    {!isOver && !formElements.length && (
                      <div className='w-full flex flex-col h-full justify-center items-center'>
                        <p className='text-2xl font-geist-mono font-semibold text-foreground/50'>Drop Here</p>
                      </div>
                    )}
                    {!!formElements.length && formElements.map((element, formElementIdx) => (
                      <DraggedElement
                        key={"DroppedElement_" + formElementIdx}
                        onDelete={() => deleteFormElement(formElementIdx)}
                        metadata={{
                          ...element,
                          currentPosition: formElementIdx
                        }}
                        onClick={() => selectFormElement(formElementIdx)}
                        className={cn("", {
                          "shadow-[0_0_0_1px_white,0_0_0_3px_hsl(var(--primary))]": isSelectedFormElement(formElementIdx)
                        })}
                      >
                        <FormElementPreview
                          readonly
                          label={(element?.properties?.label) as string}
                          element={element.title}
                        />
                      </DraggedElement>
                    ))}
                  </>
                )}
              </DroppedElement>
            </div>
          </div>
          <div className="w-full bg-background-secondary">
            <ElementList />
          </div>
        </div>
      )}
      {previewForm && (
        <FormPreview
          formElements={formElements}
          onSubmit={() => toast.success("Form Works!")}
        />
      )}
      <DragOverlayWrapper />
    </DndContext>
  )
}