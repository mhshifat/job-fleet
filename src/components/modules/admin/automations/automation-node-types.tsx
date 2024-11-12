import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Handle, Position } from "@xyflow/react";
import { register } from "module";
import { PropsWithChildren, ReactNode, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAutomationBuilder } from "./automation-builder-provider";
import Button from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Input from "@/components/ui/input";

interface AutomationNodeTypesProps {
  type?: "trigger";
  title: ReactNode;
  onDelete?: () => void
}

export default function AutomationNodeTypes({ children, type, title, onDelete }: PropsWithChildren<AutomationNodeTypesProps>) {
  return (
    <div className="border border-border px-5 py-3 bg-background shadow-md rounded-md">
      {type !== "trigger" && <Handle type="target" position={Position.Top} />}
      <div className="w-full">
        <div className="w-full flex items-center justify-between gap-2">
          <span className="flex items-center justify-center rounded-full py-1 px-3 bg-primary text-background font-geist-mono text-xs font-medium w-max">{title}</span>
          <Button variant="ghost" size="icon" className="w-max h-max" onClick={onDelete}>
            <Trash2Icon className="size-4 text-danger" />
          </Button>
        </div>
        {children}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

const RESOURCES = [
  { id: "1", title: "Application", value: "APPLICATION" }
];
const APPLICATION_PROPERTIES = [
  { id: "1", title: "Stage", value: "stage_id" }
];

AutomationNodeTypes.ResourceTrigger = (props: { id: string; data: Record<string, unknown>, onChange: (data: unknown) => void }) => {
  const { addFlowElement } = useAutomationBuilder();

  const form = useForm({
    defaultValues: {
      resource: (props?.data?.resource || "") as string,
      property: (props?.data?.property || "") as string
    },
    resolver: zodResolver(
      z.object({
        resource: z.string({ message: "Resource is required!" }).min(1, "Resource is required!"),
        property: z.string({ message: "Property is required!" }).min(1, "Property is required!")
      })
    )
  });
  const formValues = form.watch();
  const resourceOptions = useMemo(() => {
    if (formValues?.resource === "APPLICATION") return structuredClone(APPLICATION_PROPERTIES);
    return [];
  }, [formValues]);
  const selectedResourceObj = useMemo(() => RESOURCES.find(item => item.value === formValues?.resource), [RESOURCES, formValues]);
  const selectedResourceFieldObj = useMemo(() => resourceOptions.find(item => item.value === formValues?.property), [resourceOptions, formValues]);

  useEffect(() => {
    if (!props.id) return;
    addFlowElement(props.id, {
      async triggerForm() {
        return form.trigger();
      },
    })
  }, [props.id])

  function updateDate() {
    const formValues = form.getValues();
    props?.onChange(formValues);
  }
  return (
    <ul className="flex flex-col gap-2 py-3">
      <li className="flex items-start justify-between gap-5">
        <span className="text-sm font-geist-mono font-medium">Resource: </span>
        <Label title="" error={form.formState.errors.resource?.message}>
          <Select
            value={[{ content: selectedResourceObj?.title || "", value: selectedResourceObj?.value || "" }]}
            onChange={(values) => {
              form.setValue("resource", values[0].value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
              });
              updateDate();
            }}
            placeholder={"Select a Resource"}
          >
            {RESOURCES?.map(j => (
              <Select.Option key={j.id} value={j.value}>{j.title}</Select.Option>
            ))}
          </Select>
        </Label>
      </li>
      {!!form.watch("resource") && (
        <li className="flex items-start justify-between gap-5">
          <span className="text-sm font-geist-mono font-medium">Property: </span>
          <Label title="" error={form.formState.errors.property?.message}>
            <Select
              value={[{ content: selectedResourceFieldObj?.title || "", value: selectedResourceFieldObj?.value || "" }]}
              onChange={(values) => {
                form.setValue("property", values[0].value, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true
                });
                updateDate();
              }}
              placeholder={"Select a Field"}
            >
              {resourceOptions?.map(r => (
                <Select.Option key={r.id} value={r.value}>{r.title}</Select.Option>
              ))}
            </Select>
          </Label>
        </li>
      )}
    </ul>
  )
}

AutomationNodeTypes.EmailAction = (props: { id: string; data: Record<string, unknown>, onChange: (data: unknown) => void }) => {
  const { addFlowElement } = useAutomationBuilder();

  const form = useForm({
    defaultValues: {
      subject: (props?.data?.subject || "") as string,
      content: (props?.data?.content || "") as string
    },
    resolver: zodResolver(
      z.object({
        content: z.string({ message: "Content is required!" }).min(1, "Content is required!"),
      })
    )
  });

  useEffect(() => {
    if (!props.id) return;
    addFlowElement(props.id, {
      async triggerForm() {
        return form.trigger();
      },
    })
  }, [props.id])

  function updateDate() {
    const formValues = form.getValues();
    props?.onChange(formValues);
  }
  return (
    <ul className="flex flex-col gap-2 py-3">
      <li className="flex items-center justify-between gap-5">
        <Label title="Email Subject" error={form.formState.errors.subject?.message}>
          <Input
            placeholder="Type Subject"
            value={form.watch("subject") || ""}
            onChange={({ target }) => {
              form.setValue("subject", target.value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
              });
              updateDate();
            }}
          />
        </Label>
      </li>
      <li className="flex items-center justify-between gap-5">
        <Label title="Email Content" error={form.formState.errors.content?.message}>
          <Textarea
            placeholder="Type your message"
            value={form.watch("content") || ""}
            onChange={({ target }) => {
              form.setValue("content", target.value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
              });
              updateDate();
            }}
          />
        </Label>
      </li>
    </ul>
  )
}