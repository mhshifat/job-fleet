import Logo from "@/components/shared/logo";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 grid grid-cols-[500px_1fr]">
      <div className="w-full px-10 py-7 flex flex-col bg-background-secondary">
        <Logo className="shrink-0 w-max" />
        <div className="flex-1 py-5 flex flex-col justify-center">
          {children}
        </div>
      </div>
      <div
        className="flex-1"
        style={{
          backgroundColor: "#DFDBE5",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23007dfa' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}