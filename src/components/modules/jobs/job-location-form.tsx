import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useSteps } from "@/components/ui/step";
import { ArrowLeftIcon, ArrowRightIcon, SaveIcon } from "lucide-react";

export default function JobLocationForm() {
  const { prevStep } = useSteps();

  return (
    <div className="mt-8">
      <h3 className="font-geist text-xl">Location</h3>
      <p className="mt-2 font-geist-mono text-sm">Write and fill out the information of the job</p>

      <div className="flex gap-5">
        <Label title="Street Address" className="mt-5 flex-1">
          <Input
            placeholder="Ex: 14 Al-Amin Road"
          />
        </Label>
        <Label title="City" className="mt-5 flex-1">
          <Input
            placeholder="Ex: Dhaka"
          />
        </Label>
      </div>

      <div className="flex gap-5">
        <Label title="Zip Code" className="mt-5 flex-1">
          <Input
            placeholder="Ex: 1232"
          />
        </Label>
        <Label title="Country" className="mt-5 flex-1">
          <Input
            placeholder="Ex: Bangladesh"
          />
        </Label>
      </div>

      <div className="mt-10 flex flex-col justify-center items-center gap-5">
        <Button variant="ghost" className="w-max capitalize" onClick={() => prevStep({})}>
          <ArrowLeftIcon className="size-4" />
          Back to Salary
        </Button>

        <Button className="capitalize">
          Post this job now
          <ArrowRightIcon className="size-4" />
        </Button>

        <Button variant="ghost" className="w-max capitalize">
          Save as draft
          <SaveIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}