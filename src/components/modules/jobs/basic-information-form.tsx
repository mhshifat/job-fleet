import { useDialog } from "@/components/providers/dialog";
import Button from "@/components/ui/button";
import Editor from "@/components/ui/editor";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useSteps } from "@/components/ui/step";
import { ICreateJobFormSchema } from "@/domain/auth/validators";
import { ArrowRightIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import CreateCategoryForm from "./create-category-form";
import useCategoriesQuery from "@/domain/category/use-categories-query";

export default function BasicInformationForm() {
  const { nextStep } = useSteps();
  const { register, formState: { errors }, trigger, setValue } = useFormContext<ICreateJobFormSchema>();
  const { openDialog, closeDialog } = useDialog();
  const { data: categories, refetch: refetchCategories } = useCategoriesQuery()

  async function handleSubmit() {
    try {
      const isValid = await trigger(["title", "description", "code", "category"]);
      if (!isValid) throw new Error("Invalid fields");
      nextStep({});
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="mt-14">
      <h3 className="font-geist text-xl">Title & Description</h3>
      <p className="mt-2 font-geist-mono text-sm">Write and fill out the information of the job</p>

      <Label title="Job Title" className="mt-5" error={errors.title?.message}>
        <Input
          placeholder="Ex: Full Stack Web Developer"
          {...register("title")}
        />
      </Label>

      <div className="flex gap-5">
        <Label title="Category" className="mt-5 flex-1">
          <Select
            onChange={(values) => setValue("category", values[0].value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })}
            onCreateNew={() => openDialog({
              title: "Create new category",
              description: "Please fill up the form below to create a new category",
              content: <CreateCategoryForm
                onComplete={async () => {
                  await refetchCategories();
                  closeDialog();
                }}
              />
            })}
          >
            {categories?.map(c => (
              <Select.Option key={c.id} value={c.name}>{c.name}</Select.Option>
            ))}
          </Select>
        </Label>
        <Label title="Job Code" className="mt-5 flex-1">
          <Input
            placeholder="Ex: 001"
            {...register("code")}
          />
        </Label>
      </div>

      <Label title="Job Description" className="mt-5">
        <Editor
          onChange={(value) => setValue("description", value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })}
        />
      </Label>

      <div className="mt-10 flex items-center gap-10 justify-between">
        <span></span>

        <Button type="button" variant="ghost" className="w-max capitalize" onClick={handleSubmit}>
          Go to Employment Details
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}