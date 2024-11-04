"use client";

import { cloneElement, PropsWithChildren, ReactElement, useState } from "react";
import Confirmation from "./confirmation";
import Spinner from "./spinner";
import { useDialog } from "../providers/dialog";
import { toast } from "@/utils/toast";

interface DeleteHandlerProps {
  title?: string;
  description: string;
  handler: () => Promise<void>;
}

export default function DeleteHandler({ children, title, description, handler }: PropsWithChildren<DeleteHandlerProps>) {
  const { openDialog, closeDialog } = useDialog();
  const [loading, setLoading] = useState(false);

  async function handleOk() {
    setLoading(true);
    try {
      await handler();
      closeDialog();
    } catch (err) {} finally {
      setLoading(false)
    }
  }

  return cloneElement(children as ReactElement, {
    onClick: () => openDialog({
      title: title || "Are you sure?",
      description: description,
      content: <Confirmation
        onCancel={closeDialog}
        onOk={handleOk}
      />
    }),
    disabled: loading,
    children: loading ? <Spinner /> : (children as unknown as { props: { children: unknown } })?.props?.children
  })
}