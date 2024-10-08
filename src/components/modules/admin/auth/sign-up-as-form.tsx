import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Label from "@/components/ui/label";
import { useSteps } from "@/components/ui/step";
import { IRegisterFormSchema } from "@/domain/auth/validators";
import { cn } from "@/utils/helpers";
import { ArrowRightIcon, Building2Icon, CircleUserRoundIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function SignUpAsForm() {
  const { nextStep } = useSteps();
  const { trigger, formState: { errors }, setValue } = useFormContext<IRegisterFormSchema>();

  async function handleSubmit() {
    try {
      const isValid = await trigger([
        "signUpAs",
      ]);
      if (!isValid) throw new Error("Invalid fields");
      nextStep({});
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="flex flex-col mt-5 gap-3">
      <Label title="" error={errors.signUpAs?.message}>
        <Checkbox
          type="radio"
          className="flex flex-col gap-5"
          renderItem={({ title, value, isChecked, metadata }) => (
            <div
              className={cn(
                "border border-border w-full flex items-center py-3 px-5 rounded-md gap-5 relative before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-border before:absolute before:right-2 before:top-2",
                {
                  "before:bg-primary text-foreground border-primary": isChecked
                }
              )}
            >
              <span className="shrink-0 border border-border rounded-md aspect-square h-full flex justify-center items-center w-16">
                {value === "INDIVIDUAL" && <CircleUserRoundIcon className="size-7" />}
                {value === "ORGANIZATION" && <Building2Icon className="size-7" />}
              </span>
              <span>
                <h3 className="font-geist-mono font-semibold text-base tracking-tighter">{title}</h3>
                <p className="font-geist font-medium text-sm text-foreground/50 mt-1">{(metadata as { description: string })?.description}</p>
              </span>
            </div>
          )}
          onChange={({ item }) =>
            setValue("signUpAs", item, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        >
          <Checkbox.Item
            className="flex-1"
            title="An Individual"
            value="INDIVIDUAL"
            metadata={{
              description: "An individual account can only apply to the job posted and track apply status."
            }}
          />
          <Checkbox.Item
            className="flex-1"
            title="An Organization"
            value="ORGANIZATION"
            metadata={{
              description: "An organization account can manage jobs and requirement process."
            }}
          />
        </Checkbox>
      </Label>

      <div className="mt-3">
        <Button type="button" onClick={handleSubmit} className="capitalize mt-5">
          <span>Continue</span>
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}