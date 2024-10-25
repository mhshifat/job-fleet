import { FilesIcon, MousePointerIcon, SpaceIcon, TextCursorInputIcon } from "lucide-react";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/sign-in",
  REGISTER: "/sign-up",
  DASHBOARD: "/dashboard",
  DASHBOARD_JOBS: "/dashboard/jobs",
  DASHBOARD_JOB_CREATE: "/dashboard/jobs/create",
  DASHBOARD_FORMS: "/dashboard/forms",
  DASHBOARD_FORM_CREATE: "/dashboard/forms/create",
  DASHBOARD_SETTINGS: "/dashboard/settings",
}

export const DRAGGABLE_ITEM_TYPES = {
  TEXT_INPUT: "Text Input",
  NUMBER_INPUT: "Number Input",
  DATE_INPUT: "Date Input",
  TEXTAREA: "Textarea",
  SELECT: "Select",
  FILE: "File Input",
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
  {
    title: DRAGGABLE_ITEM_TYPES.FILE,
    icon: FilesIcon,
  },
]