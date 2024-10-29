import Button from "@/components/ui/button";
import { IJob } from "@/domain/job/job";
import Link from "next/link";
import DeleteJobBtnWrapper from "./delete-job-btn-wrapper";
import Select from "@/components/ui/select";
import CreateFormForm from "../forms/create-form-form";
import { useDialog } from "@/components/providers/dialog";
import useGetMyFormsQuery from "@/domain/form/use-get-my-forms-query";
import { useMemo } from "react";
import useUpdateJobMutation from "@/domain/job/use-update-job-mutation";
import { toast } from "@/utils/toast";
import { handleError } from "@/utils/error";
import { copyToClipboard } from "@/utils/helpers";

export default function JobCard({ data }: { data: IJob }) {
  const updateJob = useUpdateJobMutation();
  const { openDialog, closeDialog } = useDialog();
  const { data: forms, refetch: refetchForms, isLoading: formsIsLoading } =  useGetMyFormsQuery({
    status: "PUBLISHED"
  });
  const form = useMemo(() => {
    return forms?.find(f => f.id === data.formId)
  }, [forms, data]);

  const isLoading = updateJob.isPending || formsIsLoading;

  async function handleAttachForm(formId: string) {
    try {
      await updateJob.mutateAsync({
        ...data,
        formId,
        id: data.id
      });
      toast.success("Successfully attached a form");
    } catch (err) {
      handleError(err);
    }
  }
  return (
    <div className="border-[5px] border-background rounded-lg overflow-hidden shadow-sm ring-1 ring-background-secondary">
      <div className="aspect-square w-full bg-primary/10 rounded-tl-md rounded-tr-md py-4 px-5 flex flex-col">
        <div className="flex items-center gap-5 justify-between">
          <small className="text-sm font-geist-mono font-medium">{data?.salaryRange} {data?.currency}</small>

          <DeleteJobBtnWrapper id={data.id} />
        </div>
        <div className="flex-1 flex items-center">
          <h3 className="text-3xl font-geist-mono font-semibold max-w-[95%]">{data?.title}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-7 pb-[calc(1.75rem-5px)] px-3">
        <div className="flex items-center gap-5 justify-between bg-background">
          <h3 className="text-lg tracking-tighter font-geist-mono font-semibold leading-[1] text-foreground/80">{data?.type} ({data?.jobPlace})</h3>

          <div className="flex items-center gap-2">
            <Link href={`/dashboard/jobs/${data.id}`}>
              <Button className="rounded-full">View</Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-5 justify-between bg-background">
          <Select 
            disabled={isLoading}
            value={[{ content: form?.title || "", value: form?.id || "" }]}
            onChange={(values) => handleAttachForm(values[0].value)}
            onCreateNew={() => openDialog({
              title: "Create new form",
              description: "Please fill up the form below to create a new form",
              content: <CreateFormForm
                onSuccess={async () => {
                  await refetchForms();
                  closeDialog();
                }}
              />
            })}
            placeholder={isLoading ? "Loading..." : "Attach Form"}
          >
            {forms?.map(c => (
              <Select.Option key={c.id} value={c.id}>{c.title}</Select.Option>
            ))}
          </Select>
          {form?.id && (
            <Link href={`/dashboard/forms/${data.formId}`}>
              <Button className="rounded-full">Edit</Button>
            </Link>
          )}
        </div>

        {form && <div className="flex items-center gap-5 justify-between bg-background">
          <h3 className="text-lg tracking-tighter font-geist-mono font-semibold leading-[1] text-foreground/80">View Records</h3>

          <Link href={`/dashboard/forms/${data.formId}/records?jobId=${data.id}`}>
            <Button className="rounded-full">View</Button>
          </Link>
        </div>}
        <div className="flex items-center gap-5 justify-between bg-background">
          <h3 className="text-lg tracking-tighter font-geist-mono font-semibold leading-[1] text-foreground/80">Share</h3>

          <div>
            <Button className="rounded-full" onClick={() => copyToClipboard(`${window.location.origin}/jobs/${data.id}`)}>Copy</Button>
          </div>
        </div>
      </div>
    </div>
  )
}