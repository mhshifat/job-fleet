import Button from "@/components/ui/button";
import Editor from "@/components/ui/editor";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useSteps } from "@/components/ui/step";
import { ArrowRightIcon } from "lucide-react";

export default function BasicInformationForm() {
  const { nextStep } = useSteps();

  return (
    <div className="mt-14">
      <h3 className="font-geist text-xl">Title & Description</h3>
      <p className="mt-2 font-geist-mono font-xs">Write and fill out the information of the job</p>

      <Label title="Job Title" className="mt-5">
        <Input
          placeholder="Ex: Full Stack Web Developer"
        />
      </Label>

      <div className="flex gap-5">
        <Label title="Category" className="mt-5 flex-1">
          <Select>
            <Select.Option>Category 1</Select.Option>
          </Select>
        </Label>
        <Label title="Job Code" className="mt-5 flex-1">
          <Input
            placeholder="Ex: 001"
          />
        </Label>
      </div>

      <Label title="Job Description" className="mt-5">
        <Editor />
      </Label>

      <div className="mt-10 flex items-center gap-10 justify-between">
        <span></span>

        <Button type="button" variant="ghost" className="w-max capitalize" onClick={() => nextStep({})}>
          Go to Employment Details
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}