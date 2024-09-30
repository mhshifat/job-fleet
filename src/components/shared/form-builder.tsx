"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import ElementList from "./element-list";
import DroppedElement from "./dropped-element";
import { useState } from "react";
import Label from "../ui/label";
import { DRAGGABLE_ITEM_TYPES } from "@/utils/constants";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import DateInput from "../ui/date-input";
import Select from "../ui/select";

export default function FormBuilder() {
  const [formElements, setFormElements] = useState<{ type: string }[]>([]);
  console.log(formElements);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-[1fr_320px] flex-1">
        <div className="border-r border-border py-10 px-5">
          <div className="h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <DroppedElement
              className="flex flex-col gap-5"
              onDrop={(data) => setFormElements(values => [...values, (data as { data: { type: string } }).data])}
            >
              {formElements.map((element, formElementIdx) => (
                <Label title="TItle" key={"DroppedElement_" + formElementIdx}>
                  {element.type === DRAGGABLE_ITEM_TYPES.TEXT_INPUT ?
                    <Input disabled /> :
                    element.type === DRAGGABLE_ITEM_TYPES.NUMBER_INPUT ?
                    <Input disabled type="number" /> :
                    element.type === DRAGGABLE_ITEM_TYPES.TEXTAREA ?
                    <Textarea disabled /> :
                    element.type === DRAGGABLE_ITEM_TYPES.DATE_INPUT ?
                    <DateInput disabled /> :
                    element.type === DRAGGABLE_ITEM_TYPES.SELECT ?
                    <Select disabled /> :
                    null}
                </Label>
              ))}
            </DroppedElement>
          </div>
        </div>
        <div className="py-3 px-5 w-full bg-background-secondary">
          <ElementList />
        </div>
      </div>
    </DndProvider>
  )
}