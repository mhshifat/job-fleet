import AuthLayout from "@/components/modules/auth";
import Public from "@/components/shared/public";
import { PropsWithChildren } from "react";

export default function AuthPageLayout({ children }: PropsWithChildren) {
  return (
    <Public>
      <AuthLayout>
        {children}
      </AuthLayout>
    </Public>
  )
}