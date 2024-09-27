import { cn } from "@/utils/helpers";
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ type, className, ...restProps }: InputProps) {
  const [value, setValue] = useState("");

  function handleNumberInputChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    const regex = /^\d*\.?\d*$/;

    if (newValue === "" || regex.test(newValue)) {
      setValue(newValue);
      restProps?.onChange?.(e);
    }
  }

  function handleNumberKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "-" ||
      e.key === "e"
    ) {
      e.preventDefault();
    }
  }

  switch (type) {
    case "number":
      return (
        <div className={cn("flex items-center border border-border h-[var(--size)] rounded-md overflow-hidden transition py-2 px-3 font-medium font-geist text-sm focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_hsl(var(--primary))]")}>
          <input type={type} className="bg-transparent border-none outline-none shadow-none w-full h-full inline-flex focus-visible:border-none focus-visible:outline-none focus-visible:shadow-none placeholder:text-foreground/60 placeholder:font-medium placeholder:font-geist placeholder:text-sm" {...restProps} value={value} onChange={handleNumberInputChange} onKeyDown={handleNumberKeyDown} />
        </div>
      );
    default:
      return (
        <div className={cn("flex items-center border border-border h-[var(--size)] rounded-md overflow-hidden transition py-2 px-3 font-medium font-geist text-sm focus-within:shadow-[0_0_0_1px_white,0_0_0_3px_hsl(var(--primary))]")}>
          <input type={type} className="bg-transparent border-none outline-none shadow-none w-full h-full inline-flex focus-visible:border-none focus-visible:outline-none focus-visible:shadow-none placeholder:text-foreground/60 placeholder:font-medium placeholder:font-geist placeholder:text-sm" {...restProps} />
        </div>
      );
  }
}