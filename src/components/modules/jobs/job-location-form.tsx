import Spinner from "@/components/shared/spinner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useSteps } from "@/components/ui/step";
import { ICreateJobFormSchema } from "@/domain/job/validators";
import { jobService } from "@/infra/job/service";
import { ROUTE_PATHS } from "@/utils/constants";
import { ArrowLeftIcon, ArrowRightIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function JobLocationForm() {
  const [loading, setLoading] = useState(false);
  const { prevStep } = useSteps();
  const router = useRouter();
  const { register, formState: { errors }, trigger, getValues } = useFormContext<ICreateJobFormSchema>();

  async function handleSubmit(status?: "DRAFT") {
    try {
      setLoading(true);
      const isValid = await trigger(["streetAddress", "zipCode", "city", "country"]);
      if (!isValid) throw new Error("Invalid fields");
      const formValues = getValues();
      await jobService.create({
        ...formValues,
        code: formValues.code || null,
        deadline: formValues.deadline?.toISOString(),
        status: status || "PUBLISHED"
      });
      router.push(ROUTE_PATHS.MY_JOBS);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mt-8">
      <h3 className="font-geist text-xl">Location</h3>
      <p className="mt-2 font-geist-mono text-sm">Write and fill out the information of the job</p>

      <div className="flex gap-5">
        <Label title="Street Address" className="mt-5 flex-1" error={errors?.streetAddress?.message}>
          <Input
            placeholder="Ex: 14 Al-Amin Road"
            {...register("streetAddress")}
          />
        </Label>
        <Label title="City" className="mt-5 flex-1" error={errors?.city?.message}>
          <Input
            placeholder="Ex: Dhaka"
            {...register("city")}
          />
        </Label>
      </div>

      <div className="flex gap-5">
        <Label title="Zip Code" className="mt-5 flex-1"  error={errors?.zipCode?.message}>
          <Input
            placeholder="Ex: 1232"
            {...register("zipCode")}
          />
        </Label>
        <Label title="Country" className="mt-5 flex-1"  error={errors?.country?.message}>
          <Input
            placeholder="Ex: Bangladesh"
            {...register("country")}
          />
        </Label>
      </div>

      <div className="mt-10 flex flex-col justify-center items-center gap-5">
        <Button disabled={loading} variant="ghost" className="w-max capitalize" onClick={() => prevStep({})}>
          <ArrowLeftIcon className="size-4" />
          Back to Salary
        </Button>

        <Button disabled={loading} className="capitalize" onClick={() => handleSubmit()}>
          {loading && <Spinner className="size-4 animate-spin text-foreground/50" />}
          {loading ? "Loading..." : false ? "Update" : "Post this job now"}
          {!loading && <ArrowRightIcon className="size-4" />}
        </Button>

        <Button disabled={loading} variant="ghost" className="w-max capitalize" onClick={() => handleSubmit("DRAFT")}>
          Save as draft
          <SaveIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}