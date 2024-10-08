import WebPagesLayout from "@/components/modules/web";
import { PropsWithChildren } from "react";

export default function WebLayout({ children }: PropsWithChildren) {
  return (
    <WebPagesLayout>
      {children}
    </WebPagesLayout>
  )
}