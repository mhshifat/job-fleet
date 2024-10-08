import LoadingBtn from "@/components/shared/loading-btn";
import OtpInput from "@/components/shared/otp-input";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import useSendOtpMutation from "@/domain/auth/use-send-otp-mutation";
import useValidateOtpMutation from "@/domain/auth/use-validate-otp-mutation";
import { IRegisterFormSchema } from "@/domain/auth/validators";
import { ROUTE_PATHS } from "@/utils/constants";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function SignUpAccountActivation() {
  const router = useRouter();
  const sendOtp = useSendOtpMutation();
  const validateOtp = useValidateOtpMutation();
  const { getValues } = useFormContext<IRegisterFormSchema>();
  const [otp, setOtp] = useState("");
  const elRef = useRef<{ reset: () => void }>({
    reset: () => {}
  });

  const disabled = sendOtp.isPending || validateOtp.isPending;
  async function handleSubmit() {
    try {
      const values = getValues();
      
      await validateOtp.mutateAsync({
        email: values.email,
        otp
      });
      router.push(ROUTE_PATHS.LOGIN);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleSendOtp() {
    try {
      setOtp("");
      elRef.current.reset();
      const values = getValues();
      await sendOtp.mutateAsync({
        email: values.email,
      });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="flex flex-col mt-5 gap-3">
      <Label title="">
        <OtpInput
          ref={elRef}
          input={6}
          disabled={disabled}
          onChange={(value) => setOtp(value)}
        />
      </Label>

      <div className="mt-3">
        <Button type="button" disabled={!otp || disabled} onClick={handleSubmit} className="capitalize mt-5">
          <LoadingBtn loading={validateOtp.isPending}>
            <span>Continue</span>
          </LoadingBtn>
        </Button>
        <Button disabled={disabled} type="button" variant="ghost" className="capitalize mt-5" onClick={handleSendOtp}>
          <LoadingBtn loading={sendOtp.isPending} icon={false}>
            <span>Send OTP</span>
            <SendIcon className="size-4" />
          </LoadingBtn>
        </Button>
      </div>
    </div>
  )
}