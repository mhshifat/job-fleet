import { cn } from "@/utils/helpers";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <img
      src="/assets/logo.png"
      alt=""
      role="presentation"
      className={cn("h-[30px]", className)}
    />
  )
}