"use client";

import {DndContext, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';
import ElementList from "../../shared/element-list";
import DroppedElement from "../../shared/dropped-element";
import Label from "../../ui/label";
import { DRAGGABLE_ITEM_TYPES } from "@/utils/constants";
import Input from "../../ui/input";
import Textarea from "../../ui/textarea";
import DateInput from "../../ui/date-input";
import Select from "../../ui/select";
import DragOverlayWrapper from '../../shared/drag-overlay-wrapper';
import React from 'react';
import DraggedElement from '../../shared/dragged-element';
import { useJobApplyFormBuilder } from './apply-form-builder-provider';
import { cn } from '@/utils/helpers';

export default function JobApplyFormBuilder() {
  const { formElements, addFormElement, deleteFormElement, removeAndAddFormElementAt, addFormElementAt, selectFormElement, isSelectedFormElement } = useJobApplyFormBuilder();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(mouseSensor);

  console.log(formElements);
  return (
    <DndContext sensors={sensors}>
      <div className='border-b border-border py-3 px-5 flex flex-col'>
        <p>Welcome</p>
      </div>
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
                      <Label title={(element?.properties?.label || "Title") as string}>
                        {element.title === DRAGGABLE_ITEM_TYPES.TEXT_INPUT ?
                          <Input disabled /> :
                          element.title === DRAGGABLE_ITEM_TYPES.NUMBER_INPUT ?
                          <Input disabled type="number" /> :
                          element.title === DRAGGABLE_ITEM_TYPES.TEXTAREA ?
                          <Textarea disabled /> :
                          element.title === DRAGGABLE_ITEM_TYPES.DATE_INPUT ?
                          <DateInput disabled /> :
                          element.title === DRAGGABLE_ITEM_TYPES.SELECT ?
                          <Select disabled /> :
                        null}
                      </Label>
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
      <DragOverlayWrapper />
    </DndContext>
  )
}