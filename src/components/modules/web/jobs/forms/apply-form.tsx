"use client";

import FormPreview from "@/components/modules/admin/forms/form-preview";
import { useAuth } from "@/components/providers/auth";
import Spinner from "@/components/shared/spinner";
import Unauthorized from "@/components/shared/unauthorized";
import useCreateApplicationMutation from "@/domain/application/use-create-application-mutation";
import useGetPublicFormQuery from "@/domain/form/use-get-public-form-query";
import { handleError } from "@/utils/error";
import { useParams, useRouter } from "next/navigation";

export default function ApplyForm() {
  const { authState } = useAuth();
  const { formId, id } = useParams();
  const router = useRouter();
  const applicationForm = useCreateApplicationMutation();
  const { data: formData, isLoading } = useGetPublicFormQuery(formId as string);
  const formElements = JSON.parse(formData?.fields || "[]");  
  
  async function handleSubmit(data: Record<string, string>) {
    try {
      await applicationForm.mutateAsync({
        jobId: id as string,
        record: {
          ...data,
          createdAt: new Date().toISOString()
        }
      });
      router.push(`/jobs/${id}`);
    } catch (err) {
      handleError(err);
    }
  }

  if (!authState?.uid) return (
    <div className="flex-1">
      <Unauthorized />
    </div>
  )
  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle className="gap-3" />
    </div>
  );

  return (
    <FormPreview
      submitBtnText="Submit"
      formElements={formElements}
      onSubmit={handleSubmit}
    />
  )
}