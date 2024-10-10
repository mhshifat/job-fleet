import { PropsWithChildren } from "react";
import WebHeader from "./web-header";

export default function WebPagesLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <WebHeader />
      {children}
    </div>
  )
}