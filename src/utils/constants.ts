import { MousePointerIcon, SpaceIcon, TextCursorInputIcon } from "lucide-react";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/sign-in",
  MY_JOBS: "/jobs",
  MY_JOB_APPLY_FORM: "/jobs/create/apply",
}

export const DRAGGABLE_ITEM_TYPES = {
  TEXT_INPUT: "Text Input",
  NUMBER_INPUT: "Number Input",
  DATE_INPUT: "Date Input",
  TEXTAREA: "Textarea",
  SELECT: "Select",
}

export const DRAGGABLE_ELEMENT_LIST = [
  {
    title: DRAGGABLE_ITEM_TYPES.TEXT_INPUT,
    icon: TextCursorInputIcon,
  },
  {
    title: DRAGGABLE_ITEM_TYPES.NUMBER_INPUT,
    icon: TextCursorInputIcon,
  },
  {
    title: DRAGGABLE_ITEM_TYPES.DATE_INPUT,
    icon: TextCursorInputIcon,
  },
  {
    title: DRAGGABLE_ITEM_TYPES.TEXTAREA,
    icon: SpaceIcon,
  },
  {
    title: DRAGGABLE_ITEM_TYPES.SELECT,
    icon: MousePointerIcon,
  },
]