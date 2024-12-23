"use client";

import FormPreview from "@/components/modules/admin/forms/form-preview";
import { useAuth } from "@/components/providers/auth";
import Spinner from "@/components/shared/spinner";
import Unauthorized from "@/components/shared/unauthorized";
import useCreateApplicationMutation from "@/domain/application/use-create-application-mutation";
import useGetPublicApplicationsQuery from "@/domain/application/use-get-public-applications-query";
import useGetPublicFormQuery from "@/domain/form/use-get-public-form-query";
import { handleError } from "@/utils/error";
import { useParams, useRouter } from "next/navigation";

export default function ApplyForm() {
  const { authState } = useAuth();
  const { formId, id } = useParams();
  const router = useRouter();
  const createApplication = useCreateApplicationMutation();
  const { data: formData, isLoading } = useGetPublicFormQuery(formId as string);
  const { isLoading: isApplicationLoading } = useGetPublicApplicationsQuery({
    jobId: id as string,
    candidateId: authState?.uid,
  }, {
    enabled: !!authState?.uid,
    onSuccess(data) {
      const isAlreadyApplied = !!data?.length;
      if (isAlreadyApplied) router.push(`/jobs/${id}`);
    },
  });
  
  const loading = isLoading || isApplicationLoading;
  const formElements = JSON.parse(formData?.fields || "[]");  
  
  async function handleSubmit(data: Record<string, string>) {
    try {
      await createApplication.mutateAsync({
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
  if (loading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle className="gap-3" />
    </div>
  );

  return (
    <FormPreview
      submitBtnText="Submit"
      formElements={formElements}
      onSubmit={handleSubmit}
      loading={createApplication.isPending}
    />
  )
}