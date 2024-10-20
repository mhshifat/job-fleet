"use client";

import { IFormElement } from "@/components/modules/admin/forms/form-builder-provider";
import FormPreview from "@/components/modules/admin/forms/form-preview";
import Spinner from "@/components/shared/spinner";
import useGetFormQuery from "@/domain/form/use-get-form-query";
import useUpdateFormMutation from "@/domain/form/use-update-form-mutation";
import { handleError } from "@/utils/error";
import { toast } from "@/utils/toast";
import { useParams, useRouter } from "next/navigation";

export default function ApplyForm() {
  const { formId, id } = useParams();
  const router = useRouter();
  const updateForm = useUpdateFormMutation();
  const { data: formData, isLoading } = useGetFormQuery(formId as string);
  const formElements = JSON.parse(formData?.fields || "[]");  
  const formRecords = formData?.records;

  async function handleSubmit(data: Record<string, string>) {
    const uniqueField = formElements.find((el: IFormElement) => el?.properties?.isUnique === true)?.properties?.fieldName;
    const isAlreadyApplied = formRecords?.[id as keyof typeof formRecords]?.some(item => item[uniqueField] === data[uniqueField]);
    if (isAlreadyApplied) return toast.error("Already applied");

    try {
      await updateForm.mutateAsync({
        records: {
          [String(id)]: [{
            ...data,
            createdAt: new Date().toISOString()
          }, ...(formRecords?.[id as keyof typeof formRecords] || []) as any[]]
        },
        id: formId as string
      });
      toast.success("Successfully applied to a job");
      router.push(`/jobs/${id}`);
    } catch (err) {
      handleError(err);
    }
  }

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle className="gap-3" />
    </div>
  )
  return (
    <FormPreview
      submitBtnText="Submit"
      formElements={formElements}
      onSubmit={handleSubmit}
    />
  )
}