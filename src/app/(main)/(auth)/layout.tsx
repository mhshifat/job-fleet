import AuthLayout from "@/components/modules/auth";
import { PropsWithChildren } from "react";

export default function AuthPageLayout({ children }: PropsWithChildren) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}