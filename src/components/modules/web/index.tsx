import { PropsWithChildren } from "react";
import WebHeader from "./web-header";

export default function WebPagesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <WebHeader />
      {children}
    </div>
  )
}