import Label from "@/components/ui/label";
import Checkbox from '../../../ui/checkbox/index';
import { cn } from "@/utils/helpers";
import Select from "@/components/ui/select";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useSteps } from "@/components/ui/step";
import { useFormContext } from "react-hook-form";
import { ICreateJobFormSchema } from "@/domain/job/validators";

export default function SalaryForm() {
  const { nextStep, prevStep } = useSteps();
  const { register, formState: { errors }, trigger, setValue, getValues, watch } = useFormContext<ICreateJobFormSchema>();

  async function handleSubmit() {
    try {
      const isValid = await trigger(["salaryType", "currency", "salaryRange"]);
      if (!isValid) throw new Error("Invalid fields");
      nextStep({});
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="mt-8">
      <h3 className="font-geist text-xl">Salary</h3>
      <p className="mt-2 font-geist-mono text-sm">Write and fill out the information of the job</p>

      <Label title="Salary Type" className="mt-5" error={errors?.salaryType?.message}>
        <Checkbox
          type="radio"
          className="flex gap-5"
          renderItem={({ title, isChecked, value }) => (
            <span className={cn("border border-border w-full flex justify-center items-center h-[var(--size)] rounded-md text-sm font-geist", {
              "border-primary bg-primary text-white": isChecked || value === getValues("salaryType")
            })}>{title}</span>
          )}
          onChange={({ item }) => setValue("salaryType", item, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })}
        >
          <Checkbox.Item
            className="flex-1"
            title="Hourly"
            value="HOURLY"
          />
          <Checkbox.Item
            className="flex-1"
            title="Daily"
            value="DAILY"
          />
          <Checkbox.Item
            className="flex-1"
            title="Weekly"
            value="WEEKLY"
          />
          <Checkbox.Item
            className="flex-1"
            title="Monthly"
            value="MONTHLY"
          />
          <Checkbox.Item
            className="flex-1"
            title="Negotiable"
            value="NEGOTIABLE"
          />
        </Checkbox>
      </Label>

      {watch("salaryType") !== "NEGOTIABLE" && (
        <div className="flex gap-5">
          <Label title="Currency" className="mt-5 flex-1" error={errors?.currency?.message}>
            <Select
              value={[{ content: getValues("currency"), value: getValues("currency") }]}
              onChange={(values) => setValue("currency", values[0].value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })}
            >
              <Select.Option value="BDT">BDT</Select.Option>
            </Select>
          </Label>
          <Label title="Salary" className="mt-5 flex-1" error={errors?.salaryRange?.message}>
            <Input
              placeholder="Ex: 70000 - 100000"
              {...register("salaryRange")}
            />
          </Label>
        </div>
      )}

      <div className="mt-10 flex items-center gap-10 justify-between">
        <Button type="button" variant="ghost" className="w-max capitalize" onClick={() => prevStep({})}>
          <ArrowLeftIcon className="size-4" />
          Back to Experience
        </Button>

        <Button type="button" variant="ghost" className="w-max capitalize" onClick={handleSubmit}>
          Go to Location
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}