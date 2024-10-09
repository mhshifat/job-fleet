import LoadingBtn from "@/components/shared/loading-btn";
import Spinner from "@/components/shared/spinner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useSteps } from "@/components/ui/step";
import useCreateJobMutation from "@/domain/job/use-create-job-mutation";
import useUpdateJobMutation from "@/domain/job/use-update-job-mutation";
import { ICreateJobFormSchema } from "@/domain/job/validators";
import { jobService } from "@/infra/job/service";
import { ROUTE_PATHS } from "@/utils/constants";
import { ArrowLeftIcon, ArrowRightIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

export default function JobLocationForm() {
  const createJob = useCreateJobMutation();
  const updateJob = useUpdateJobMutation();
  const { prevStep } = useSteps();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<ICreateJobFormSchema>();

  const jobId = getValues("id");
  const loading = createJob.isPending || updateJob.isPending;
  
  async function handleSubmit(status?: "DRAFT") {
    try {
      const formValues = getValues();
      const isValid = await trigger([
        "streetAddress",
        "zipCode",
        "city",
        "country",
      ]);
      if (!isValid) throw new Error("Invalid fields");

      if (jobId) await updateJob.mutateAsync({
        ...formValues,
        code: formValues.code || null,
        deadline: formValues.deadline?.toISOString(),
        status: "PUBLISHED",
      });
      else await createJob.mutateAsync({
        ...formValues,
        code: formValues.code || null,
        deadline: formValues.deadline?.toISOString(),
        status: status || "PUBLISHED",
      });
      
      router.push(ROUTE_PATHS.DASHBOARD_JOBS);
    } catch (err) {
      console.error(err);
    } finally {}
  }
  return (
    <div className="mt-8">
      <h3 className="font-geist text-xl">Location</h3>
      <p className="mt-2 font-geist-mono text-sm">
        Write and fill out the information of the job
      </p>

      <div className="flex gap-5">
        <Label
          title="Street Address"
          className="mt-5 flex-1"
          error={errors?.streetAddress?.message}
        >
          <Input
            placeholder="Ex: 14 Al-Amin Road"
            {...register("streetAddress")}
          />
        </Label>
        <Label
          title="City"
          className="mt-5 flex-1"
          error={errors?.city?.message}
        >
          <Input placeholder="Ex: Dhaka" {...register("city")} />
        </Label>
      </div>

      <div className="flex gap-5">
        <Label
          title="Zip Code"
          className="mt-5 flex-1"
          error={errors?.zipCode?.message}
        >
          <Input placeholder="Ex: 1232" {...register("zipCode")} />
        </Label>
        <Label
          title="Country"
          className="mt-5 flex-1"
          error={errors?.country?.message}
        >
          <Input placeholder="Ex: Bangladesh" {...register("country")} />
        </Label>
      </div>

      <div className="mt-10 flex flex-col justify-center items-center gap-5">
        <Button
          disabled={loading}
          variant="ghost"
          className="w-max capitalize"
          onClick={() => prevStep({})}
        >
          <ArrowLeftIcon className="size-4" />
          Back to Salary
        </Button>

        <Button
          disabled={loading}
          className="capitalize"
          onClick={() => handleSubmit()}
        >
          <LoadingBtn loading={loading}>
            {jobId ? "Update" : "Post this job now"}
          </LoadingBtn>
        </Button>

        {!jobId && <Button
          disabled={loading}
          variant="ghost"
          className="w-max capitalize"
          onClick={() => handleSubmit("DRAFT")}
        >
          <LoadingBtn loading={loading} icon={false}>
            <SaveIcon className="size-4" />
            Save as draft
          </LoadingBtn>
        </Button>}
      </div>
    </div>
  );
}
