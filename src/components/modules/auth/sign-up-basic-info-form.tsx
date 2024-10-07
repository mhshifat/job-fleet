import LoadingBtn from "@/components/shared/loading-btn";
import Spinner from "@/components/shared/spinner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useSteps } from "@/components/ui/step";
import useSignUpMutation from "@/domain/auth/use-sign-up-mutation";
import { IRegisterFormSchema } from "@/domain/auth/validators";
import { ArrowLeftIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function SignUpBasicInfoForm() {
  const signUp = useSignUpMutation();
  const { nextStep, prevStep } = useSteps();
  const { trigger, formState: { errors }, getValues, register } = useFormContext<IRegisterFormSchema>();

  const loading = signUp.isPending;
  async function handleSubmit() {
    try {
      const isValid = await trigger([
        "organization",
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
      ]);
      if (!isValid) throw new Error("Invalid fields");
      const formValues = getValues();
      await signUp.mutateAsync(formValues)
      nextStep({});
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {getValues("signUpAs") === "ORGANIZATION" && (
        <Label title="Job Title" className="mt-5" error={errors.organization?.message}>
          <Input
            placeholder="Ex: Acme Corp"
            {...register("organization")}
          />
        </Label>
      )}

      <div className="flex gap-5">
        <Label title="First Name" className="mt-5 flex-1" error={errors.firstName?.message}>
          <Input
            placeholder="Ex: Jhon"
            {...register("firstName")}
          />
        </Label>
        <Label title="Last Name" className="mt-5 flex-1" error={errors.lastName?.message}>
          <Input
            placeholder="Ex: Doe"
            {...register("lastName")}
          />
        </Label>
      </div>

      <Label title="Email" className="mt-5" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="Ex: example@example.com"
          {...register("email")}
        />
      </Label>

      <Label title="Password" className="mt-5" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="Ex: ********"
          {...register("password")}
        />
      </Label>

      <Label title="Confirm Password" className="mt-5" error={errors.confirmPassword?.message}>
        <Input
          type="password"
          placeholder="Ex: ********"
          {...register("confirmPassword")}
        />
      </Label>

      <div className="mt-3">
        <Button type="button" disabled={loading} onClick={handleSubmit} className="capitalize mt-5">
          <LoadingBtn loading={loading}>
            <span>Continue</span>
          </LoadingBtn>
        </Button>
        <Button type="button" disabled={loading} variant="ghost" className="capitalize mt-5" onClick={() => prevStep({})}>
          <ArrowLeftIcon className="size-4" />
          <span>Back</span>
        </Button>
      </div>
    </div>
  )
}