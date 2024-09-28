import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useSteps } from "@/components/ui/step";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function ExperienceForm() {
  const { nextStep, prevStep } = useSteps();

  return (
    <div className="mt-8">
      <h3 className="font-geist text-xl">Experience</h3>
      <p className="mt-2 font-geist-mono font-xs">Write and fill out the information of the job</p>

      <div className="flex gap-5">
        <Label title="Label" className="mt-5 flex-1">
          <Select>
            <Select.Option>Beginner</Select.Option>
          </Select>
        </Label>
        <Label title="Year of Experience" className="mt-5 flex-1">
          <Input
            placeholder="Ex: 2 - 3 Years"
          />
        </Label>
      </div>

      <div className="mt-10 flex items-center gap-10 justify-between">
        <Button type="button" variant="ghost" className="w-max capitalize" onClick={() => prevStep({})}>
          <ArrowLeftIcon className="size-4" />
          Back to Employment Details
        </Button>

        <Button type="button" variant="ghost" className="w-max capitalize" onClick={() => nextStep({})}>
          Go to Salary
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}