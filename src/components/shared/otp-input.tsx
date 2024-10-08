import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import Input from "../ui/input";

interface OtpInputProps {
  input: number;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function OtpInput({ input, onChange, disabled }: OtpInputProps, ref: ForwardedRef<{ reset: () => void }>) {
  const inputRefs = useRef<Record<string, { el: HTMLInputElement | null, value: string }>>({});

  useImperativeHandle(ref, () => ({
    reset: () => {
      Object.keys(inputRefs.current).forEach((_, idx) => {
        if (!inputRefs.current[idx]?.el) return;
        inputRefs.current[idx].el.value = "";
      })
    }
  }))

  return (
    <div className="flex items-center gap-5">
      {new Array(input).fill("").map((_, idx) => (
        <Input key={"OtpInput_" + idx} disabled={disabled} {...idx===0?{ autoFocus: true }:{}} ref={(el) => {
          if (!inputRefs.current) return;
          inputRefs.current[idx] = { el, value: "" }
        }} defaultValue={inputRefs.current[idx]?.value || ""} onChange={({ target }) => {
          const value = target.value;
          if (!value) return;
          if (value?.length === 6) {
            value.split("").forEach((val, idx) => {
              if (!inputRefs.current[idx].el) return;
              inputRefs.current[idx].el.value = val;
              inputRefs.current[value?.length - 1]?.el?.focus();
              onChange?.(value);
            });
            return;
          }
          inputRefs.current[idx].value = value;
          inputRefs.current[idx + 1]?.el?.focus();
          if (inputRefs.current[idx + 1] === undefined) {
            onChange?.(Object.keys(inputRefs.current).map(key => inputRefs.current[key]?.value).join(""))
          }
        }} type="text" className="text-center flex justify-center items-center" />
      ))}
    </div>
  )
}

export default forwardRef(OtpInput);