"use client";

import { useAuth } from "@/components/providers/auth";
import FormHandler from "@/components/shared/form-handler";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import useLoginMutation from "@/domain/auth/use-login-mutation";
import { ROUTE_PATHS } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function SigninForm() {
  const router = useRouter();
  const login = useLoginMutation();
  const { updateUser } = useAuth();

  return (
    <FormHandler
      defaultValues={{
        email: "",
        password: "",
      }}
      onCreate={async (values) => {
        const data = await login.mutateAsync(values);
        await updateUser(data);
        router.push(ROUTE_PATHS.HOME);
      }}
      onUpdate={() => Promise.resolve()}
      onComplete={() => {}}
      schema={z.object({
        email: z.string().email(),
        password: z.string(),
      })}
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
  )
}