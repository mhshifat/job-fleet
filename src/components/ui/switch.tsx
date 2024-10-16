import { cn } from "@/utils/helpers";
import { ForwardedRef, forwardRef, InputHTMLAttributes, useEffect, useState } from "react"

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {}

function Switch({defaultChecked, ...restProps}: SwitchProps, ref: ForwardedRef<HTMLInputElement>) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (defaultChecked !== undefined) {
      setChecked(defaultChecked);
    }
  }, [])

  return (
    <div className="cursor-pointer w-[38px] h-[22px] bg-primary/10 border border-border rounded-full relative">
      <input {...restProps} type="checkbox" className="hidden" ref={ref} checked={checked} onChange={(e) => {
        setChecked(e.target.checked);
        restProps?.onChange?.(e);
      }} />
      <span className={cn("transition h-full aspect-square rounded-full flex justify-center items-center border border-border bg-white absolute", {
        "left-[calc(100%-20px)] bg-primary/50": checked
      })} />
    </div>
  )
}

export default forwardRef(Switch);