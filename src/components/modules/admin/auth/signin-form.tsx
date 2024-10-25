"use client";

import { useAuth } from "@/components/providers/auth";
import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import useLoginMutation from "@/domain/auth/use-login-mutation";
import { ROUTE_PATHS } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function SigninForm() {
  const router = useRouter();
  const login = useLoginMutation();
  const { updateAuthState } = useAuth();

  return (
    <>
      <FormHandler
        showToast={false}
        defaultValues={{
          email: "",
          password: "",
        }}
        onCreate={async (values) => {
          const data = await login.mutateAsync(values);
          await updateAuthState(data);
          router.push(ROUTE_PATHS.HOME);
        }}
        onUpdate={() => Promise.resolve()}
        onComplete={() => {}}
        schema={z.object({
          email: z.string().email(),
          password: z.string(),
        })}
        renderSubmitBtnText={() => <>Continue</>}
      >
        {({ getError, getValue, onFocus, setValue }) => (
          <div className="flex flex-col mt-5 gap-3">
            <Label title="Email" error={getError("email")}>
              <Input 
                value={getValue("email")}
                onFocus={() => onFocus("email")}
                onChange={({ target }) => setValue("email", target.value)}
              />
            </Label>
            <Label title="Password">
              <Input 
                type="password"
                value={getValue("password")}
                onFocus={() => onFocus("password")}
                onChange={({ target }) => setValue("password", target.value)}
              />
            </Label>
          </div>
        )}
      </FormHandler>
      <p className="text-center mt-5 text-sm font-geist font-medium text-foreground/60">Don't have an account? <Link className="font-geist-mono text-primary hover:underline underline-offset-4" href={ROUTE_PATHS.REGISTER}>Register</Link></p>
    </>
  )
}