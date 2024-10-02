import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useSteps } from "@/components/ui/step";
import { ICreateJobFormSchema } from "@/domain/job/validators";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function ExperienceForm() {
  const { nextStep, prevStep } = useSteps();
  const { register, formState: { errors }, trigger, setValue, watch } = useFormContext<ICreateJobFormSchema>();

  async function handleSubmit() {
    try {
      const isValid = await trigger(["jobLabel", "numOfExperience"]);
      if (!isValid) throw new Error("Invalid fields");
      nextStep({});
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="mt-8">
      <h3 className="font-geist text-xl">Experience</h3>
      <p className="mt-2 font-geist-mono text-sm">Write and fill out the information of the job</p>

      <div className="flex gap-5">
        <Label title="Label" className="mt-5 flex-1" error={errors?.jobLabel?.message}>
          <Select
            value={[{ content: watch("jobLabel"), value: watch("jobLabel") }]}
            onChange={(values) => setValue("jobLabel", values[0].value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })}
          >
            <Select.Option value="BEGINNER">Beginner</Select.Option>
            <Select.Option value="INTERMEDIATE">Intermediate</Select.Option>
            <Select.Option value="ADVANCE">Advance</Select.Option>
          </Select>
        </Label>
        <Label title="Year of Experience" className="mt-5 flex-1" error={errors?.numOfExperience?.message}>
          <Input
            placeholder="Ex: 2 - 3 Years"
            {...register("numOfExperience")}
          />
        </Label>
      </div>

      <div className="mt-10 flex items-center gap-10 justify-between">
        <Button type="button" variant="ghost" className="w-max capitalize" onClick={() => prevStep({})}>
          <ArrowLeftIcon className="size-4" />
          Back to Employment Details
        </Button>

        <Button type="button" variant="ghost" className="w-max capitalize" onClick={handleSubmit}>
          Go to Salary
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}