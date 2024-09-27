import Protected from "@/components/shared/protected";
import { PropsWithChildren } from "react";

export default function AuthPageLayout({ children }: PropsWithChildren) {
  return (
    <Protected>
      {children}
    </Protected>
  )
}