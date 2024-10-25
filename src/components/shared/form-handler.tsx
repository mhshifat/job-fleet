import { useForm } from "react-hook-form";
import Form from "../ui/form";
import { handleError } from "@/utils/error";
import { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import Button from "../ui/button";
import Spinner from "./spinner";
import { toast } from "@/utils/toast";
import { ArrowRightIcon } from "lucide-react";
import LoadingBtn from "./loading-btn";

interface ChildrenProps<T> {
  getValue: (name: keyof T) => string;
  setValue: (name: keyof T, value: string) => void;
  getError: (name: keyof T) => string;
  onFocus: (name: keyof T) => void;
}

interface FormHandlerProps<T> {
  defaultValues: (T & { id?: string });
  onComplete: (data?: unknown) => void;
  onCreate: (values: T) => Promise<void>;
  onUpdate: (values: T) => Promise<void>;
  children: (args: ChildrenProps<T>) => ReactElement;
  schema: ZodSchema;
  renderSubmitBtnText?: () => JSX.Element;
  showToast?: boolean;
}

export default function FormHandler<T extends {}>({
  onComplete,
  onCreate,
  onUpdate,
  defaultValues,
  children,
  schema,
  renderSubmitBtnText,
  showToast,
}: FormHandlerProps<T>) {
  const [loading, setLoading] = useState(false);
  const { id, ...restProps } = defaultValues;
  const form = useForm({
    defaultValues: {
      ...id?{ id }:{},
      ...restProps as Record<string, unknown>
    },
    resolver: zodResolver(schema),
    mode: "all"
  });

  const disabled = loading || !form.formState.isValid;

  async function handleSubmit(values: unknown) {
    setLoading(true);
    try {
      let data: unknown;
      if (defaultValues?.id) data = await onUpdate(values as T);
      else data = await onCreate(values as T);
      onComplete?.(data);
      if (showToast) toast.success(`Successfully ${defaultValues?.id ? "updated the" : "created a new"} record`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      disabled={loading}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      {children({
        getError(name) {
          return form.formState?.errors?.[name as "id"]?.message || "";
        },
        getValue(name) {
          return (form.watch(name as "id") || "") as string;
        },
        setValue(name, value) {
          form.setError(`root.${name as string}`, {});
          form.setValue(name as "id", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        },
        onFocus(name) {
          form.trigger(name as "id");
        },
      })}

      <div className="mt-5">
        <Button disabled={disabled} type="submit" className="capitalize mt-5">
          <LoadingBtn loading={loading}>
            {renderSubmitBtnText?.() || (defaultValues?.id ? "Update" : "Create")}
          </LoadingBtn>
        </Button>
      </div>
    </Form>
  )
}