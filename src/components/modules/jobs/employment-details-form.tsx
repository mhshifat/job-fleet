import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import DateInput from "@/components/ui/date-input";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useSteps } from "@/components/ui/step";
import { ICreateJobFormSchema } from "@/domain/job/validators";
import { cn } from "@/utils/helpers";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function EmploymentDetailsForm() {
  const { nextStep, prevStep } = useSteps();
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useFormContext<ICreateJobFormSchema>();

  async function handleSubmit() {
    try {
      const isValid = await trigger([
        "type",
        //  "deadline",
        "vacancy",
      ]);
      if (!isValid) throw new Error("Invalid fields");
      nextStep({});
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="mt-8">
      <h3 className="font-geist text-xl">Employment Details</h3>
      <p className="mt-2 font-geist-mono text-sm">
        Write and fill out the information of the job
      </p>

      <Label
        title="Employment Type"
        className="mt-5"
        error={errors?.type?.message}
      >
        <Checkbox
          type="radio"
          className="flex gap-5"
          renderItem={({ title, value, isChecked }) => (
            <span
              className={cn(
                "border border-border w-full flex justify-center items-center h-[var(--size)] rounded-md text-sm font-geist",
                {
                  "border-primary bg-primary text-white":
                    isChecked || getValues("type") === value,
                }
              )}
            >
              {title}
            </span>
          )}
          onChange={({ item }) =>
            setValue("type", item, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        >
          <Checkbox.Item
            className="flex-1"
            title="Full Time"
            value="FULL_TIME"
          />
          <Checkbox.Item
            className="flex-1"
            title="Part Time"
            value="PART_TIME"
          />
          <Checkbox.Item className="flex-1" title="Contract" value="CONTRACT" />
          <Checkbox.Item
            className="flex-1"
            title="Temporary"
            value="TEMPORARY"
          />
          <Checkbox.Item className="flex-1" title="Trainee" value="TRAINEE" />
        </Checkbox>
      </Label>

      <Label
        title="Job Place"
        className="mt-5"
        error={errors?.jobPlace?.message}
      >
        <Checkbox
          type="radio"
          className="flex gap-5"
          renderItem={({ title, value, isChecked }) => (
            <span
              className={cn(
                "border border-border w-full flex justify-center items-center h-[var(--size)] rounded-md text-sm font-geist",
                {
                  "border-primary bg-primary text-white":
                    isChecked || getValues("jobPlace") === value,
                }
              )}
            >
              {title}
            </span>
          )}
          onChange={({ item }) =>
            setValue("jobPlace", item, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        >
          <Checkbox.Item className="flex-1" title="Onsite" value="ONSITE" />
          <Checkbox.Item
            className="flex-1"
            title="Offsite (Remote)"
            value="OFFSITE"
          />
        </Checkbox>
      </Label>

      <div className="flex gap-5">
        <Label
          title="Vacancy"
          className="mt-5 flex-1"
          error={errors?.vacancy?.message}
        >
          <Input
            type="number"
            placeholder="Ex: 2"
            {...register("vacancy", { valueAsNumber: true })}
          />
        </Label>
        <Label
          title="Deadline"
          className="mt-5 flex-1"
          error={errors?.deadline?.message}
        >
          {/* <DateInput
            value={{
              start: getValues("deadline"),
              end: getValues("deadline"),
            }}
            onChange={({ end }) =>
              setValue("deadline", end, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          /> */}
        </Label>
      </div>

      <div className="mt-10 flex items-center gap-10 justify-between">
        <Button
          type="button"
          variant="ghost"
          className="w-max capitalize"
          onClick={() => prevStep({})}
        >
          <ArrowLeftIcon className="size-4" />
          Back to Basic Information
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-max capitalize"
          onClick={handleSubmit}
        >
          Go to Experience
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
