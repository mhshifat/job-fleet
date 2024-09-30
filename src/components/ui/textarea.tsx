import { cn } from "@/utils/helpers";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ type, className, ...restProps }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <div className={cn("flex items-center border border-border h-auto rounded-md overflow-hidden transition py-2 px-3 font-medium font-geist text-sm focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_hsl(var(--primary))]")}>
      <textarea ref={ref} className="bg-transparent border-none outline-none shadow-none w-full min-h-[100px] inline-flex focus-visible:border-none focus-visible:outline-none focus-visible:shadow-none placeholder:text-foreground/60 placeholder:font-medium placeholder:font-geist placeholder:text-sm resize-none" {...restProps} />
    </div>
  )
}

export default forwardRef(Textarea);