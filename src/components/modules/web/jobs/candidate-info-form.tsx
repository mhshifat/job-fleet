import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { ILoginResponse } from "@/domain/auth/auth";
import useCandidateOnboardingMutation from "@/domain/auth/use-candidate-onboarding-mutation";
import { candidateOnBoardingSchema } from "@/domain/auth/validators";

export default function CandidateInfoForm({ onSubmit }: { onSubmit: (values: ILoginResponse) => void }) {
  const candidateOnboarding = useCandidateOnboardingMutation();

  return (
    <FormHandler
      showToast={false}
      defaultValues={{
        email: "",
        password: "",
      }}
      onCreate={async (values) => {
        const authState = await candidateOnboarding.mutateAsync(values);
        onSubmit?.(authState);
      }}
      onUpdate={() => Promise.resolve()}
      onComplete={() => {}}
      schema={candidateOnBoardingSchema}
      renderSubmitBtnText={() => <>Continue</>}
    >
      {({ getError, getValue, onFocus, setValue }) => (
        <div className="flex flex-col gap-3">
          <Label title="Email" error={getError("email")}>
            <Input 
              value={getValue("email")}
              onFocus={() => onFocus("email")}
              onChange={({ target }) => setValue("email", target.value)}
              placeholder="Ex: example@example.com"
            />
          </Label>
          <Label title="Password">
            <Input 
              type="password"
              value={getValue("password")}
              onFocus={() => onFocus("password")}
              onChange={({ target }) => setValue("password", target.value)}
              placeholder="Ex: ********"
            />
          </Label>
        </div>
      )}
    </FormHandler>
  )
}