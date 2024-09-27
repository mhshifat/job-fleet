import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="max-w-[1023px] mx-auto">
      {children}
    </div>
  )
}